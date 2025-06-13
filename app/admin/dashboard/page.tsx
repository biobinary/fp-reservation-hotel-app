"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DollarSign, CreditCard, Clock, CheckCircle, XCircle, Users, LogOut, BarChart } from 'lucide-react';

interface PaymentDetails {
    pe_id_pembayaran: string;
    pe_metode_pembayaran: 'Credit Card' | 'Bank Transfer' | 'Virtual Account';
    pe_status_pembayaran: 'Pending' | 'Paid' | 'Failed';
    pe_jumlah: number;
    pe_tanggal_pembayaran: string;
    r_nama_pemesan: string;
    k_tipe_kamar: string;
    h_nama: string;
}

const StatusBadge = ({ status }: { status: 'Pending' | 'Paid' | 'Failed' }) => {
    const styles = {
        Paid: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
        Failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };
    const icons = {
        Paid: <CheckCircle size={14} />,
        Pending: <Clock size={14} />,
        Failed: <XCircle size={14} />,
    }
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
            {icons[status]}
            {status}
        </span>
    );
};


export default function AdminDashboard() {
    const [payments, setPayments] = useState<PaymentDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('/api/admin/payments');
                const data = await response.json();

                if (response.ok) {
                    setPayments(data.payments);
                } else {
                    setError(data.error || 'Gagal memuat data.');
                    if (response.status === 401) {
                        router.push('/admin/login'); // Redirect jika tidak terotorisasi
                    }
                }
            } catch (err) {
                setError('Tidak dapat terhubung ke server.');
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [router]);

    const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    const formatDate = (dateString: string) => new Date(dateString).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });

    const handleLogout = async () => {
        document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                            <BarChart className="text-white" />
                        </div>
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                <h2 className="text-3xl font-bold mb-6">Riwayat Pembayaran</h2>

                {loading && <p className="text-center">Memuat data pembayaran...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                
                {!loading && !error && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        {['ID Pembayaran', 'Pemesan', 'Hotel', 'Tipe Kamar', 'Jumlah', 'Metode', 'Status', 'Tanggal'].map(header => (
                                            <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {payments.map((p) => (
                                        <tr key={p.pe_id_pembayaran} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">{p.pe_id_pembayaran}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">{p.r_nama_pemesan}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{p.h_nama}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{p.k_tipe_kamar}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">{formatCurrency(p.pe_jumlah)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{p.pe_metode_pembayaran}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <StatusBadge status={p.pe_status_pembayaran} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(p.pe_tanggal_pembayaran)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {payments.length === 0 && <p className="text-center py-8 text-gray-500">Tidak ada data pembayaran.</p>}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}