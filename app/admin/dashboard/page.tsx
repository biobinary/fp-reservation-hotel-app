"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
    DollarSign, 
    CreditCard, 
    Clock, 
    CheckCircle, 
    XCircle, 
    Users, 
    LogOut, 
    BarChart,
    TrendingUp,
    Calendar,
    Filter,
    Search,
    Edit3,
    Save,
    X,
    RefreshCw,
    Hotel,
    Bed
} from 'lucide-react';

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
        Paid: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg',
        Pending: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg',
        Failed: 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg',
    };
    const icons = {
        Paid: <CheckCircle size={14} />,
        Pending: <Clock size={14} />,
        Failed: <XCircle size={14} />,
    }
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${styles[status]} transform hover:scale-105 transition-all duration-200`}>
            {icons[status]}
            {status}
        </span>
    );
};

const StatusEditor = ({ 
    currentStatus, 
    onUpdate, 
    isUpdating, 
    onCancel 
}: { 
    currentStatus: 'Pending' | 'Paid' | 'Failed';
    onUpdate: (status: 'Pending' | 'Paid' | 'Failed') => void;
    isUpdating: boolean;
    onCancel: () => void;
}) => {
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);
    
    return (
        <div className="flex items-center gap-2">
            <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as 'Pending' | 'Paid' | 'Failed')}
                className="px-3 py-1 rounded-lg text-xs font-medium border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isUpdating}
            >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Failed">Failed</option>
            </select>
            <button
                onClick={() => onUpdate(selectedStatus)}
                disabled={isUpdating || selectedStatus === currentStatus}
                className="p-1 text-green-600 hover:text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Simpan"
            >
                {isUpdating ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
            </button>
            <button
                onClick={onCancel}
                disabled={isUpdating}
                className="p-1 text-gray-600 hover:text-gray-700 disabled:opacity-50"
                title="Batal"
            >
                <X size={14} />
            </button>
        </div>
    );
};

export default function AdminDashboard() {
    const [payments, setPayments] = useState<PaymentDetails[]>([]);
    const [filteredPayments, setFilteredPayments] = useState<PaymentDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [editingPayment, setEditingPayment] = useState<string | null>(null);
    const [updatingPayment, setUpdatingPayment] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchPayments();
    }, [router]);

    useEffect(() => {
        filterPayments();
    }, [payments, searchTerm, statusFilter]);

    const fetchPayments = async () => {
        try {
            const response = await fetch('/api/admin/payments');
            const data = await response.json();

            if (response.ok) {
                setPayments(data.payments);
            } else {
                setError(data.error || 'Gagal memuat data.');
                if (response.status === 401) {
                    router.push('/admin/login');
                }
            }
        } catch (err) {
            setError('Tidak dapat terhubung ke server.');
        } finally {
            setLoading(false);
        }
    };

    const filterPayments = () => {
        let filtered = payments;

        if (searchTerm) {
            filtered = filtered.filter(payment => 
                payment.r_nama_pemesan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.h_nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.pe_id_pembayaran.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(payment => payment.pe_status_pembayaran === statusFilter);
        }

        setFilteredPayments(filtered);
    };

    const updatePaymentStatus = async (paymentId: string, status: 'Pending' | 'Paid' | 'Failed') => {
        setUpdatingPayment(paymentId);
        try {
            const response = await fetch('/api/admin/payments', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paymentId, status }),
            });

            const data = await response.json();

            if (response.ok) {
                setPayments(prev => 
                    prev.map(payment => 
                        payment.pe_id_pembayaran === paymentId 
                            ? { ...payment, pe_status_pembayaran: status }
                            : payment
                    )
                );
                setEditingPayment(null);
            } else {
                setError(data.error || 'Gagal memperbarui status');
            }
        } catch (err) {
            setError('Gagal memperbarui status pembayaran');
        } finally {
            setUpdatingPayment(null);
        }
    };

    const getStats = () => {
        const total = payments.length;
        const paid = payments.filter(p => p.pe_status_pembayaran === 'Paid').length;
        const pending = payments.filter(p => p.pe_status_pembayaran === 'Pending').length;
        const failed = payments.filter(p => p.pe_status_pembayaran === 'Failed').length;
        const totalAmount = payments.reduce((sum, p) => sum + p.pe_jumlah, 0);
        const paidAmount = payments.filter(p => p.pe_status_pembayaran === 'Paid').reduce((sum, p) => sum + p.pe_jumlah, 0);

        return { total, paid, pending, failed, totalAmount, paidAmount };
    };

    const stats = getStats();

    const formatCurrency = (amount: number) => 
        new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR', 
            minimumFractionDigits: 0 
        }).format(amount);

    const formatDate = (dateString: string) => 
        new Date(dateString).toLocaleString('id-ID', { 
            dateStyle: 'long', 
            timeStyle: 'short' 
        });

    const handleLogout = async () => {
        document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 text-gray-900 dark:text-gray-100">
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                            <BarChart className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Admin Dashboard
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Kelola pembayaran hotel</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-rose-500 rounded-xl hover:from-red-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pembayaran</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                                <DollarSign className="text-white" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Berhasil</p>
                                <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                                <CheckCircle className="text-white" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                                <Clock className="text-white" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pendapatan</p>
                                <p className="text-xl font-bold text-purple-600">{formatCurrency(stats.paidAmount)}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                <TrendingUp className="text-white" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Cari berdasarkan nama, hotel, atau ID pembayaran..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-10 pr-8 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                                <option value="all">Semua Status</option>
                                <option value="Paid">Paid</option>
                                <option value="Pending">Pending</option>
                                <option value="Failed">Failed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <Calendar className="text-blue-600" />
                            Riwayat Pembayaran
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Menampilkan {filteredPayments.length} dari {payments.length} pembayaran
                        </p>
                    </div>

                    {loading && (
                        <div className="p-12 text-center">
                            <RefreshCw className="animate-spin mx-auto mb-4 text-blue-600" size={32} />
                            <p className="text-gray-600 dark:text-gray-400">Memuat data pembayaran...</p>
                        </div>
                    )}

                    {error && (
                        <div className="p-8 text-center">
                            <XCircle className="mx-auto mb-4 text-red-500" size={32} />
                            <p className="text-red-500 font-medium">{error}</p>
                        </div>
                    )}
                    
                    {!loading && !error && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50/50 dark:bg-gray-700/50">
                                    <tr>
                                        {[
                                            { key: 'id', label: 'ID Pembayaran', icon: <CreditCard size={16} /> },
                                            { key: 'customer', label: 'Pemesan', icon: <Users size={16} /> },
                                            { key: 'hotel', label: 'Hotel', icon: <Hotel size={16} /> },
                                            { key: 'room', label: 'Tipe Kamar', icon: <Bed size={16} /> },
                                            { key: 'amount', label: 'Jumlah', icon: <DollarSign size={16} /> },
                                            { key: 'method', label: 'Metode', icon: <CreditCard size={16} /> },
                                            { key: 'status', label: 'Status', icon: <CheckCircle size={16} /> },
                                            { key: 'date', label: 'Tanggal', icon: <Calendar size={16} /> },
                                            { key: 'actions', label: 'Aksi', icon: <Edit3 size={16} /> }
                                        ].map(header => (
                                            <th key={header.key} scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    {header.icon}
                                                    {header.label}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredPayments.map((payment) => (
                                        <tr key={payment.pe_id_pembayaran} className="hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg m-1">
                                                {payment.pe_id_pembayaran}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                                                {payment.r_nama_pemesan}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                {payment.h_nama}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-lg text-xs font-medium">
                                                    {payment.k_tipe_kamar}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600 dark:text-green-400">
                                                {formatCurrency(payment.pe_jumlah)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-lg text-xs font-medium">
                                                    {payment.pe_metode_pembayaran}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {editingPayment === payment.pe_id_pembayaran ? (
                                                    <StatusEditor
                                                        currentStatus={payment.pe_status_pembayaran}
                                                        onUpdate={(status) => updatePaymentStatus(payment.pe_id_pembayaran, status)}
                                                        isUpdating={updatingPayment === payment.pe_id_pembayaran}
                                                        onCancel={() => setEditingPayment(null)}
                                                    />
                                                ) : (
                                                    <StatusBadge status={payment.pe_status_pembayaran} />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                {formatDate(payment.pe_tanggal_pembayaran)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {editingPayment !== payment.pe_id_pembayaran && (
                                                    <button
                                                        onClick={() => setEditingPayment(payment.pe_id_pembayaran)}
                                                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                                                        title="Edit Status"
                                                    >
                                                        <Edit3 size={16} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredPayments.length === 0 && (
                                <div className="p-12 text-center">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <DollarSign className="text-gray-400" size={32} />
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                                        {searchTerm || statusFilter !== 'all' ? 'Tidak ada pembayaran yang sesuai dengan filter' : 'Tidak ada data pembayaran'}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}