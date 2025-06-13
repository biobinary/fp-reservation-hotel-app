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
        COALESCE(COUNT(CASE WHEN r.r_status = 'Confirmed' THEN 1 END), 0) AS confirmedReservations
      FROM kamar k
      LEFT JOIN hotel h ON k.k_id_hotel = h.h_id_hotel
      LEFT JOIN reservasi r ON k.k_id_kamar = r.r_k_id_kamar
        AND r.r_tanggal_check_in >= CURDATE() - INTERVAL 6 MONTH
      WHERE 1=1
    `;

    const queryParams: any[] = [];

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

    if (hotel) {
      query += ' AND h.h_nama LIKE ?';
      queryParams.push(`%${hotel}%`);
    }

    if (checkIn && checkOut) {
      query += `
        AND k.k_id_kamar NOT IN (
          SELECT r_k_id_kamar
          FROM reservasi
          WHERE r_status IN ('Confirmed', 'Pending')
            AND (
              (r_tanggal_check_in < ? AND r_tanggal_check_out > ?)
              OR (r_tanggal_check_in >= ? AND r_tanggal_check_in < ?)
            )
        )
      `;
      queryParams.push(checkOut, checkIn, checkIn, checkOut);
    }

    if (rooms && !isNaN(rooms)) {
      query += ' AND k.k_jumlah_kamar >= ?';
      queryParams.push(rooms);
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
        query += ' ORDER BY k.k_jumlah_kamar DESC';
        break;
      case 'type_asc':
        query += ' ORDER BY k.k_tipe_kamar ASC';
        break;
      default:
        query += ' ORDER BY k.k_harga_per_malam ASC';
    }

    const [rows] = await pool.query<KamarData[]>(query, queryParams);

    const processedRooms = rows.map((kamar) => {
      const popularityScore =
        (kamar.confirmedReservations || 0) * 2 + (kamar.totalReservations || 0);

      return {
        ...kamar,
        images: JSON.parse(kamar.k_gambar_kamar || '[]'),
        popularityScore,
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
