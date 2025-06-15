import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { KamarData } from '@/app/booking/page';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const tipeKamar = searchParams.get('tipeKamar') || '';
    const sortBy = searchParams.get('sortBy') || 'price_asc';
    const minPrice = parseInt(searchParams.get('minPrice') || '0', 10);
    const maxPrice = parseInt(searchParams.get('maxPrice') || '2000000', 10);
    const checkIn = searchParams.get('checkIn') || '';
    const checkOut = searchParams.get('checkOut') || '';
    const guests = parseInt(searchParams.get('guests') || '1', 10);
    const rooms = parseInt(searchParams.get('rooms') || '1', 10);
    const hotel = searchParams.get('hotel') || '';

    let query = `
      SELECT 
        k.*,
        h.h_nama AS hotel_nama,
        h.h_alamat AS hotel_alamat,
        COALESCE(COUNT(r.r_id_reservasi), 0) AS totalReservations,
        COALESCE(COUNT(CASE WHEN r.r_status = 'Confirmed' THEN 1 END), 0) AS confirmedReservations,
        ${checkIn && checkOut ? 
          `CekKetersediaanKamar(k.k_id_kamar, '${checkIn}', '${checkOut}') AS availability_status,` : 
          'k.k_jumlah_kamar AS availability_status,'
        }
        ${checkIn && checkOut ? 
          `CASE 
            WHEN CekKetersediaanKamar(k.k_id_kamar, '${checkIn}', '${checkOut}') = 1 THEN 
              k.k_jumlah_kamar - COALESCE((
                SELECT COUNT(*) 
                FROM reservasi r2 
                WHERE r2.r_k_id_kamar = k.k_id_kamar 
                AND r2.r_status IN ('Confirmed', 'Pending')
                AND (
                  (r2.r_tanggal_check_in <= '${checkOut}' AND r2.r_tanggal_check_out > '${checkIn}')
                  OR (r2.r_tanggal_check_in < '${checkOut}' AND r2.r_tanggal_check_out >= '${checkIn}')
                )
              ), 0)
            ELSE 0 
          END AS available_rooms` :
          'k.k_jumlah_kamar AS available_rooms'
        }
      FROM kamar k
      LEFT JOIN hotel h ON k.k_id_hotel = h.h_id_hotel
      LEFT JOIN reservasi r ON k.k_id_kamar = r.r_k_id_kamar
        AND r.r_tanggal_check_in >= CURDATE() - INTERVAL 6 MONTH
      WHERE 1=1
    `;

    const queryParams: any[] = [];

    if (hotel) {
      query += ' AND h.h_nama = ?';
      queryParams.push(hotel);
    }

    if (tipeKamar) {
      query += ' AND k.k_tipe_kamar = ?';
      queryParams.push(tipeKamar);
    }

    if (minPrice > 0) {
      query += ' AND k.k_harga_per_malam >= ?';
      queryParams.push(minPrice);
    }

    if (maxPrice < 2000000) {
      query += ' AND k.k_harga_per_malam <= ?';
      queryParams.push(maxPrice);
    }

    if (checkIn && checkOut) {
      query += ` AND CekKetersediaanKamar(k.k_id_kamar, '${checkIn}', '${checkOut}') = 1`;
    }

    if (!isNaN(rooms) && rooms > 0) {
      if (checkIn && checkOut) {
        query += `
          AND (k.k_jumlah_kamar - COALESCE((
            SELECT COUNT(*) 
            FROM reservasi r3 
            WHERE r3.r_k_id_kamar = k.k_id_kamar 
            AND r3.r_status IN ('Confirmed', 'Pending')
            AND (
              (r3.r_tanggal_check_in <= '${checkOut}' AND r3.r_tanggal_check_out > '${checkIn}')
              OR (r3.r_tanggal_check_in < '${checkOut}' AND r3.r_tanggal_check_out >= '${checkIn}')
            )
          ), 0)) >= ?
        `;
        queryParams.push(rooms);
      } else {
        query += ' AND k.k_jumlah_kamar >= ?';
        queryParams.push(rooms);
      }
    }

    query += ' GROUP BY k.k_id_kamar, h.h_nama, h.h_alamat';

    switch (sortBy) {
      case 'price_asc':
        query += ' ORDER BY k.k_harga_per_malam ASC';
        break;
      case 'price_desc':
        query += ' ORDER BY k.k_harga_per_malam DESC';
        break;
      case 'popular_desc':
        query += ' ORDER BY confirmedReservations DESC, totalReservations DESC';
        break;
      case 'rooms_desc':
        query += ' ORDER BY available_rooms DESC';
        break;
      case 'type_asc':
        query += ' ORDER BY k.k_tipe_kamar ASC';
        break;
      default:
        query += ' ORDER BY k.k_harga_per_malam ASC';
    }

    const [rows] = await pool.query<(KamarData & { 
      availability_status: number; 
      available_rooms: number; 
    })[]>(query, queryParams);

    const processedRooms = rows.map((kamar) => {
      const popularityScore =
        (kamar.confirmedReservations || 0) * 2 + (kamar.totalReservations || 0);

      return {
        ...kamar,
        images: JSON.parse(kamar.k_gambar_kamar || '[]'),
        popularityScore,
        availableRooms: kamar.available_rooms,
        availabilityStatus: kamar.availability_status,
        formattedPrice: new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(kamar.k_harga_per_malam),
      };
    });

    return NextResponse.json({
      success: true,
      rooms: processedRooms,
      totalCount: processedRooms.length,
      filters: {
        tipeKamar,
        sortBy,
        minPrice,
        maxPrice,
        checkIn,
        checkOut,
        guests,
        rooms,
        hotel,
      },
    });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch rooms',
        rooms: [],
        totalCount: 0,
      },
      { status: 500 }
    );
  }
}