import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const roomId = url.searchParams.get('roomId');

  try {
    const [rows]: any = await pool.query('SELECT k_harga_per_malam FROM kamar WHERE k_id_kamar = ?', [roomId]);
    if (rows.length === 0) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, harga: rows[0].k_harga_per_malam });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  try {
    const { nik, metode, total } = await request.json();
    await pool.query(
      `INSERT INTO pembayaran (bayar_nik, bayar_metode, bayar_total) VALUES (?, ?, ?)`,
      [nik, metode, total]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error pembayaran:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
