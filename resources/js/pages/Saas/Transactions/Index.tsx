import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';

export default function Index({ transactions }: any) {
    const { active_business } = usePage().props as any;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(val);
    };

    return (
        <div className="p-6">
            <Head title={`Transaksi - ${active_business?.name}`} />
            
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Riwayat Transaksi</h1>
                    <p className="text-gray-500 text-sm mt-1">Daftar semua pemasukan dan pengeluaran {active_business?.name}</p>
                </div>
                <Link
                    href="/transactions/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors"
                >
                    + Catat Transaksi
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs tracking-wider">
                            <th className="p-4 font-semibold">Tanggal</th>
                            <th className="p-4 font-semibold">Tipe</th>
                            <th className="p-4 font-semibold">Kategori</th>
                            <th className="p-4 font-semibold">Deskripsi</th>
                            <th className="p-4 font-semibold text-right">Nominal</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {transactions.data.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500">
                                    Belum ada transaksi tercatat.
                                </td>
                            </tr>
                        ) : (
                            transactions.data.map((trx: any) => (
                                <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-sm text-gray-700">{trx.date}</td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${trx.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {trx.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-700">{trx.category?.name || '-'}</td>
                                    <td className="p-4 text-sm text-gray-500 truncate max-w-xs">{trx.description || '-'}</td>
                                    <td className={`p-4 text-sm font-bold text-right ${trx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                        {trx.type === 'income' ? '+' : '-'}{formatCurrency(trx.amount)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                
                {/* Pagination Simple Placeholder */}
                {transactions.links && transactions.links.length > 3 && (
                    <div className="p-4 border-t border-gray-200 flex justify-center gap-1">
                        {transactions.links.map((link: any, i: number) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 rounded text-sm ${link.active ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'} ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
