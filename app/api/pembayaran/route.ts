import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const roomId = url.searchParams.get('roomId');

  try {
    const [rows]: any = await pool.query(
      'SELECT k_harga_per_malam FROM kamar WHERE k_id_kamar = ?',
      [roomId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({ success: true, harga: rows[0].k_harga_per_malam });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

function generateId(prefix: string): string {
  return `${prefix}${Math.floor(Math.random() * 1e6).toString().padStart(6, '0')}`;
}

export async function POST(req: NextRequest) {

  try {
    const { nik, roomId, checkIn, checkOut, metode, total } = await req.json();

    const idReservasi = generateId('RSV');
    await pool.query(
      `INSERT INTO reservasi (r_id_reservasi, r_p_nik, r_k_id_kamar, r_tanggal_check_in, r_tanggal_check_out, r_status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [idReservasi, nik, roomId, checkIn, checkOut, 'Pending']
    );

    const idPembayaran = generateId('PAY');
    const tanggalPembayaran = new Date();
    await pool.query(
      `INSERT INTO pembayaran (pe_id_pembayaran, pe_r_id_reservasi, pe_metode_pembayaran, pe_status_pembayaran, pe_jumlah, pe_tanggal_pembayaran)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [idPembayaran, idReservasi, metode, 'Pending', total, tanggalPembayaran]
    );

    return NextResponse.json({ success: true, message: 'Pembayaran berhasil dilakukan!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Gagal menyimpan pembayaran' }, { status: 500 });
  }
}




