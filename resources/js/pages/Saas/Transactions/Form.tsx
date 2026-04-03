import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Form({ categories }: any) {
    const { active_business } = usePage().props as any;
    
    // Default form ke hari ini
    const today = new Date().toISOString().split('T')[0];

    const { data, setData, post, processing, errors } = useForm({
        type: 'income',
        amount: '',
        category_id: '',
        date: today,
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/transactions');
    };

    const filteredCategories = categories.filter((c: any) => c.type === data.type);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Head title={`Catat Transaksi - ${active_business?.name}`} />
            
            <div className="mb-8">
                <Link href="/transactions" className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-block">
                    ← Kembali ke Riwayat
                </Link>
                <h1 className="text-3xl font-bold text-gray-800">Catat Transaksi Baru</h1>
                <p className="text-gray-500 mt-2">Sistem akan meng-generate jurnal akuntansi (Debit & Kredit) secara otomatis.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                {/* Tipe Transaksi */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Tipe Transaksi</label>
                    <div className="flex gap-4">
                        <label className={`flex-1 cursor-pointer border-2 rounded-xl p-4 text-center transition-all ${data.type === 'income' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-200'}`}>
                            <input type="radio" name="type" value="income" checked={data.type === 'income'} onChange={(e) => setData('type', e.target.value)} className="hidden" />
                            <span className={`block font-bold text-lg ${data.type === 'income' ? 'text-green-700' : 'text-gray-500'}`}>Pemasukan</span>
                        </label>
                        <label className={`flex-1 cursor-pointer border-2 rounded-xl p-4 text-center transition-all ${data.type === 'expense' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-200'}`}>
                            <input type="radio" name="type" value="expense" checked={data.type === 'expense'} onChange={(e) => setData('type', e.target.value)} className="hidden" />
                            <span className={`block font-bold text-lg ${data.type === 'expense' ? 'text-red-700' : 'text-gray-500'}`}>Pengeluaran</span>
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Nominal */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nominal (Rp)</label>
                        <input 
                            type="number" 
                            min="1"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Contoh: 150000"
                            required
                        />
                        {errors.amount && <span className="text-red-500 text-xs mt-1 block">{errors.amount}</span>}
                    </div>

                    {/* Tanggal */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Transaksi</label>
                        <input 
                            type="date" 
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            required
                        />
                        {errors.date && <span className="text-red-500 text-xs mt-1 block">{errors.date}</span>}
                    </div>
                </div>

                {/* Kategori */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                    <select 
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                        required
                    >
                        <option value="" disabled>-- Pilih Kategori --</option>
                        {filteredCategories.map((c: any) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {errors.category_id && <span className="text-red-500 text-xs mt-1 block">{errors.category_id}</span>}
                </div>

                {/* Deskripsi */}
                <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Catatan Kelengkapan (Opsional)</label>
                    <textarea 
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[100px]"
                        placeholder="Detail tentang kelengkapan transaksi..."
                    ></textarea>
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all ${processing ? 'opacity-70 cursor-wait' : 'transform hover:-translate-y-1'}`}
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Pemasukan/Pengeluaran'}
                    </button>
                </div>
            </form>
        </div>
    );
}
