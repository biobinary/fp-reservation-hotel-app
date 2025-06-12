import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { KamarData } from '@/app/booking/page';

export async function GET(request: NextRequest) {
  
  try {

    const { searchParams } = new URL(request.url);
    const tipeKamar = searchParams.get('tipeKamar') || '';
    const sortBy = searchParams.get('sortBy') || 'price_asc';
    const minPrice = parseInt(searchParams.get('minPrice') || '0');
    const maxPrice = parseInt(searchParams.get('maxPrice') || '2000000');
    
    let query = `
      SELECT 
        k.*,
        h.h_nama as hotel_nama,
        h.h_alamat as hotel_alamat,
        COALESCE(COUNT(r.r_id_reservasi), 0) as totalReservations,
        COALESCE(COUNT(CASE WHEN r.r_status = 'Confirmed' THEN 1 END), 0) as confirmedReservations
      FROM kamar k
      LEFT JOIN hotel h ON k.k_id_hotel = h.h_id_hotel
      LEFT JOIN reservasi r ON k.k_id_kamar = r.r_k_id_kamar 
        AND r.r_tanggal_check_in >= CURDATE() - INTERVAL 6 MONTH
      WHERE 1=1
    `;
    
    const queryParams: any[] = [];
    
    if (tipeKamar) {
      query += ` AND k.k_tipe_kamar = ?`;
      queryParams.push(tipeKamar);
    }
    
    if (minPrice > 0) {
      query += ` AND k.k_harga_per_malam >= ?`;
      queryParams.push(minPrice);
    }
    
    if (maxPrice < 2000000) {
      query += ` AND k.k_harga_per_malam <= ?`;
      queryParams.push(maxPrice);
    }
    
    query += ` GROUP BY k.k_id_kamar, h.h_nama, h.h_alamat`;
    
    switch (sortBy) {
      case 'price_asc':
        query += ` ORDER BY k.k_harga_per_malam ASC`;
        break;
      case 'price_desc':
        query += ` ORDER BY k.k_harga_per_malam DESC`;
        break;
      case 'popular_desc':
        query += ` ORDER BY confirmedReservations DESC, totalReservations DESC`;
        break;
      case 'rooms_desc':
        query += ` ORDER BY k.k_jumlah_kamar DESC`;
        break;
      case 'type_asc':
        query += ` ORDER BY k.k_tipe_kamar ASC`;
        break;
      default:
        query += ` ORDER BY k.k_harga_per_malam ASC`;
    }
    
    const [rows] = await pool.query<KamarData[]>(query, queryParams);
    
    const processedRooms = rows.map(kamar => {     
      const popularityScore = (kamar.confirmedReservations || 0) * 2 + (kamar.totalReservations || 0);
      
      return {
        ...kamar,
        images: JSON.parse(kamar.k_gambar_kamar || '[]'),
        popularityScore,
        formattedPrice: new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0
        }).format(kamar.k_harga_per_malam)
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
        maxPrice
      }
    });
    
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch rooms',
        rooms: [],
        totalCount: 0
      },
      { status: 500 }
    );
  }
}
