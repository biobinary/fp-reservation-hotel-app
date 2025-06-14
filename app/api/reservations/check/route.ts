import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface ReservationData extends RowDataPacket {
  r_id_reservasi: string;
  r_tanggal_check_in: string;
  r_tanggal_check_out: string;
  r_status: string;
  p_nama: string;
  p_email: string;
  p_no_telp: string;
  k_tipe_kamar: string;
  k_harga_per_malam: number;
  k_fasilitas: string;
  h_nama: string;
  h_alamat: string;
  pe_status_pembayaran: string;
  pe_metode_pembayaran: string;
  pe_jumlah: number;
  pe_tanggal_pembayaran: string | null;
}

export async function GET(request: NextRequest) {

    try {

    const { searchParams } = new URL(request.url);
    const reservationCode = searchParams.get('code');

    const query = `
      SELECT 
        r.r_id_reservasi,
        r.r_tanggal_check_in,
        r.r_tanggal_check_out,
        r.r_status,
        p.p_nama,
        p.p_email,
        p.p_no_telp,
        k.k_tipe_kamar,
        k.k_harga_per_malam,
        k.k_fasilitas,
        h.h_nama,
        h.h_alamat,
        pe.pe_status_pembayaran,
        pe.pe_metode_pembayaran,
        pe.pe_jumlah,
        pe.pe_tanggal_pembayaran
      FROM reservasi r
      INNER JOIN pelanggan p ON r.r_p_nik = p.p_nik
      INNER JOIN kamar k ON r.r_k_id_kamar = k.k_id_kamar
      INNER JOIN hotel h ON k.k_id_hotel = h.h_id_hotel
      LEFT JOIN pembayaran pe ON r.r_id_reservasi = pe.pe_r_id_reservasi
      WHERE r.r_id_reservasi = ?
    `;

    const [rows] = await pool.execute<ReservationData[]>(query, [reservationCode]);

    if (rows.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Kode reservasi tidak ditemukan. Pastikan kode yang Anda masukkan benar.' 
        },
        { status: 404 }
      );
    }

    const reservationData = rows[0];

    const formattedData = {
      r_id_reservasi: reservationData.r_id_reservasi,
      r_tanggal_check_in: reservationData.r_tanggal_check_in,
      r_tanggal_check_out: reservationData.r_tanggal_check_out,
      r_status: reservationData.r_status,
      pelanggan: {
        p_nama: reservationData.p_nama,
        p_email: reservationData.p_email,
        p_no_telp: reservationData.p_no_telp
      },
      kamar: {
        k_tipe_kamar: reservationData.k_tipe_kamar,
        k_harga_per_malam: parseFloat(reservationData.k_harga_per_malam.toString()),
        k_fasilitas: reservationData.k_fasilitas
      },
      hotel: {
        h_nama: reservationData.h_nama,
        h_alamat: reservationData.h_alamat
      },
      pembayaran: {
        pe_status_pembayaran: reservationData.pe_status_pembayaran || 'Pending',
        pe_metode_pembayaran: reservationData.pe_metode_pembayaran || 'N/A',
        pe_jumlah: reservationData.pe_jumlah ? parseFloat(reservationData.pe_jumlah.toString()) : 0,
        pe_tanggal_pembayaran: reservationData.pe_tanggal_pembayaran
      }
    };

    return NextResponse.json({
      success: true,
      data: formattedData
    });

  } catch (error) {
    console.error('Database error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Terjadi kesalahan server. Silakan coba lagi nanti.' 
      },
      { status: 500 }
    );
  }
}