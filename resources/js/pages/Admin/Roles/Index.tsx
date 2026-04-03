import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';

interface Role {
    id: number;
    name: string;
    permissions: Array<{ id: number; name: string }>;
}

export default function Index({ roles }: { roles: Role[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Role Management', href: '/admin/roles' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role Management" />

            <div className="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="flex justify-between mb-6">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Roles & Permissions</h2>
                    <Link href="/admin/roles/create" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                        Add New Role
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Role Name</th>
                                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Permissions</th>
                                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map(role => (
                                <tr key={role.id}>
                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">{role.name}</td>
                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <div className="flex flex-wrap gap-1">
                                            {role.permissions.map(p => (
                                                <span key={p.id} className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                                                    {p.name}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <div className="flex gap-3">
                                            <Link href={`/admin/roles/${role.id}`} className="text-green-600 hover:text-green-900">Lihat</Link>
                                            <Link href={`/admin/roles/${role.id}/edit`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                                            <button 
                                                onClick={() => {
                                                    if(confirm('Are you sure you want to delete this role?')) {
                                                        router.delete(`/admin/roles/${role.id}`);
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
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
