import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';

interface Permission {
    id: number;
    name: string;
}

export default function Index({ permissions }: { permissions: Permission[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Permissions', href: '/admin/permissions' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissions" />

            <div className="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="flex justify-between mb-6">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Permissions</h2>
                    <Link href="/admin/permissions/create" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                        Add New Permission
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">ID</th>
                                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Permission Name</th>
                                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permissions.map(permission => (
                                <tr key={permission.id}>
                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">{permission.id}</td>
                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">{permission.name}</td>
                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <div className="flex gap-3">
                                            <Link href={`/admin/permissions/${permission.id}`} className="text-green-600 hover:text-green-900">Lihat</Link>
                                            <Link href={`/admin/permissions/${permission.id}/edit`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                                            <button 
                                                onClick={() => {
                                                    if(confirm('Are you sure you want to delete this permission?')) {
                                                        router.delete(`/admin/permissions/${permission.id}`);
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {permissions.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-5 py-5 text-center text-sm bg-white border-b border-gray-200">
                                        No permissions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
