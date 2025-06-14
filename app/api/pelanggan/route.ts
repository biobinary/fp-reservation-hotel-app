import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { nik, fullName, email, phone } = await request.json();

    if (!nik || !fullName || !email || !phone) {
      return NextResponse.json({ success: false, error: 'Data tidak lengkap' }, { status: 400 });
    }

    const insertQuery = `
      INSERT INTO pelanggan (p_nik, p_nama, p_email, p_no_telp)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        p_nama = VALUES(p_nama),
        p_email = VALUES(p_email),
        p_no_telp = VALUES(p_no_telp)
    `;

    await pool.query(insertQuery, [nik, fullName, email, phone]);

    return NextResponse.json({ success: true, message: 'Pelanggan berhasil disimpan' });
  } catch (error) {
    console.error('Gagal simpan pelanggan:', error);
    return NextResponse.json({ success: false, error: 'Gagal simpan pelanggan' }, { status: 500 });
  }
}
