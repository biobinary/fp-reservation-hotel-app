import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { jwtVerify } from 'jose';
import { RowDataPacket } from 'mysql2';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-super-secret-key');

interface PaymentDetails extends RowDataPacket {
    pe_id_pembayaran: string;
    pe_metode_pembayaran: 'Credit Card' | 'Bank Transfer' | 'Virtual Account';
    pe_status_pembayaran: 'Pending' | 'Paid' | 'Failed';
    pe_jumlah: number;
    pe_tanggal_pembayaran: string;
    r_nama_pemesan: string;
    k_tipe_kamar: string;
    h_nama: string;
}

async function verifyAuth(request: NextRequest) {
    const sessionCookie = request.cookies.get('admin_session')?.value;
    if (!sessionCookie) {
        throw new Error('No session cookie');
    }
    
    try {
        await jwtVerify(sessionCookie, JWT_SECRET);
    } catch (err) {
        throw new Error('Invalid session');
    }
}

export async function GET(request: NextRequest) {
    try {
        await verifyAuth(request);
    } catch (err) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const query = `
            SELECT 
                p.pe_id_pembayaran,
                p.pe_metode_pembayaran,
                p.pe_status_pembayaran,
                p.pe_jumlah,
                p.pe_tanggal_pembayaran,
                pl.p_nama AS r_nama_pemesan,
                k.k_tipe_kamar,
                h.h_nama
            FROM pembayaran p
            JOIN reservasi r ON p.pe_r_id_reservasi = r.r_id_reservasi
            JOIN pelanggan pl ON r.r_p_nik = pl.p_nik
            JOIN kamar k ON r.r_k_id_kamar = k.k_id_kamar
            JOIN hotel h ON k.k_id_hotel = h.h_id_hotel
            ORDER BY p.pe_tanggal_pembayaran DESC;
        `;

        const [payments] = await pool.query<PaymentDetails[]>(query);
        const [totalResult] = await pool.query<any[]>("SELECT hitung_total_pendapatan() AS totalPendapatan;");
        const totalIncome = totalResult[0].totalPendapatan;

        return NextResponse.json({ success: true, payments, totalIncome });

    } catch (error) {
        console.error('Failed to fetch payments:', error);
        return NextResponse.json({ success: false, error: 'Gagal mengambil data pembayaran' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        await verifyAuth(request);
    } catch (err) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { paymentId, status } = await request.json();

        if (!paymentId || !status) {
            return NextResponse.json({ success: false, error: 'ID pembayaran dan status diperlukan' }, { status: 400 });
        }

        if (!['Pending', 'Paid', 'Failed'].includes(status)) {
            return NextResponse.json({ success: false, error: 'Status tidak valid' }, { status: 400 });
        }

        const updateQuery = `
            UPDATE pembayaran 
            SET pe_status_pembayaran = ?
            WHERE pe_id_pembayaran = ?
        `;

        const [result] = await pool.query(updateQuery, [status, paymentId]);

        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ success: false, error: 'Pembayaran tidak ditemukan' }, { status: 404 });
        }

        const reservationStatus = status == 'Paid' ? 'Confirmed' : (status == 'Failed' ? 'Cancelled' : 'Pending');
        const updateQueryReservation = `
            UPDATE reservasi r
            JOIN pembayaran p ON r.r_id_reservasi = p.pe_r_id_reservasi
            SET r.r_status = ?
            WHERE p.pe_id_pembayaran = ?
        `;

        await pool.query(updateQueryReservation, [reservationStatus, paymentId]);
        return NextResponse.json({ success: true, message: 'Status pembayaran berhasil diperbarui' });

    } catch (error) {
        console.error('Failed to update payment status:', error);
        return NextResponse.json({ success: false, error: 'Gagal memperbarui status pembayaran' }, { status: 500 });
    }
}