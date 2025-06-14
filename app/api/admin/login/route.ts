import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email dan password harus diisi' }, { status: 400 });
    }

    const [adminRows]: any = await pool.query(
      'SELECT a_id_admin, a_nama, a_email, a_password FROM admin WHERE a_email = ?',
      [email]
    );

    if (adminRows.length === 0) {
      return NextResponse.json({ success: false, error: 'Email atau password salah' }, { status: 401 });
    }

    const admin = adminRows[0];

    if (password !== admin.a_password) {
      return NextResponse.json({ success: false, error: 'Email atau password salah' }, { status: 401 });
    }

    const token = sign(
      {
        id: admin.a_id_admin,
        name: admin.a_nama,
        email: admin.a_email,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const serializedCookie = serialize('admin_session', token, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60,
      path: '/',
    });

    return new NextResponse(
      JSON.stringify({ success: true, message: 'Login berhasil' }),
      {
        status: 200,
        headers: { 'Set-Cookie': serializedCookie },
      }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
