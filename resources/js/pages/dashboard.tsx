import { Head, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function Dashboard({ stats }: any) {
    const { active_business } = usePage().props as any;

    if (!active_business) return null;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(val);
    };

    return (
        <>
            <Head title={`Dashboard - ${active_business.name}`} />
            
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Ringkasan Keuangan: {active_business.name}</h1>
                    <p className="text-gray-500">Pantau performa bisnis Anda secara real-time berdasarkan pencatatan otomatis.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center transform hover:-translate-y-1 transition duration-300">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Pendapatan</p>
                        <h2 className="text-3xl font-bold text-green-600">{formatCurrency(stats?.income || 0)}</h2>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center transform hover:-translate-y-1 transition duration-300">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Pengeluaran</p>
                        <h2 className="text-3xl font-bold text-red-600">{formatCurrency(stats?.expense || 0)}</h2>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl shadow-md text-white flex flex-col justify-center transform hover:-translate-y-1 transition duration-300">
                        <p className="text-sm font-medium text-blue-100 uppercase tracking-wider mb-2">Saldo Bersih (Laba/Rugi)</p>
                        <h2 className="text-3xl font-bold">{formatCurrency(stats?.balance || 0)}</h2>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[40vh] flex flex-col items-center justify-center">
                    <div className="text-center max-w-md">
                        <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📊</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Grafik & Laporan Segera Hadir</h3>
                        <p className="text-gray-500">Pusat laporan komprehensif, neraca, dan arus kas sedang disiapkan untuk rilis selanjutnya.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
