import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { KamarData } from '@/app/booking/page';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ success: false, error: 'Room ID is required' }, { status: 400 });
  }

  try {
    const query = `
      SELECT 
        k.*,
        h.h_nama as hotel_nama,
        h.h_alamat as hotel_alamat
      FROM kamar k
      LEFT JOIN hotel h ON k.k_id_hotel = h.h_id_hotel
      WHERE k.k_id_kamar = ?
    `;
    
    const [rows] = await pool.query<KamarData[]>(query, [id]);

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Room not found' }, { status: 404 });
    }

    const kamar = rows[0];
    const processedRoom = {
            ...kamar,
            images: (() => {
                try {
                    return JSON.parse(kamar.k_gambar_kamar || '[]');
                } catch (error) {
                    console.warn('Failed to parse room images:', error);
                    return [];
                }
            })(),
            formattedPrice: new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(kamar.k_harga_per_malam),
    };

    return NextResponse.json({
      success: true,
      room: processedRoom,
    });

  } catch (error) {
    console.error('Error fetching room details:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch room details' },
      { status: 500 }
    );
  }
}