import { Head, Link, router } from '@inertiajs/react';
import React from 'react';

export default function Launchpad({ businesses, auth }: any) {
    const handleSelectBusiness = (id: number) => {
        router.post(`/launchpad/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Pemilihan Usaha | Launchpad" />
            
            <div className="flex flex-col items-center justify-center pt-20">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Selamat Datang, {auth.user.name}</h1>
                    <p className="text-gray-600">Silakan pilih usaha mana yang ingin Anda akses hari ini.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-6">
                    {businesses.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                            <p className="text-gray-500 mb-4">Anda belum memiliki atau terdaftar pada usaha manapun.</p>
                            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                                + Buat Toko Baru
                            </button>
                        </div>
                    ) : (
                        businesses.map((biz: any) => (
                            <div 
                                key={biz.id} 
                                onClick={() => handleSelectBusiness(biz.id)}
                                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col items-center group transform hover:-translate-y-1"
                            >
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl text-blue-600 font-bold">{biz.name.charAt(0)}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">{biz.name}</h3>
                                <p className="text-sm text-gray-500 mt-2 uppercase tracking-wider font-semibold">{biz.type || 'Usaha Umum'}</p>
                                
                                <div className="mt-6 w-full text-center">
                                    <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors w-full">
                                        Buka Toko ➔
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
