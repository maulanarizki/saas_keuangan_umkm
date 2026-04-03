import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { useState, useEffect, useRef } from 'react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    roles: Array<{ id: number; name: string }>;
}

export default function Index({ users, availableRoles, filters }: { 
    users: { data: User[], links: PaginationLink[], current_page: number, per_page: number, from: number }, 
    availableRoles: Array<{ id: number; name: string }>,
    filters: { search?: string, role?: string } 
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'User Management', href: '/admin/users' },
    ];

    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');

    useEffect(() => {
        setSearch(filters.search || '');
        setRole(filters.role || '');
    }, [filters]);

    // Debounce search
    useEffect(() => {
        if (search === (filters.search || '') && role === (filters.role || '')) {
            return;
        }

        const timeout = setTimeout(() => {
            router.get('/admin/users', { search, role }, { preserveState: true, replace: true, preserveScroll: true });
        }, 300);
        return () => clearTimeout(timeout);
    }, [search, role, filters]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />

            <div className="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="flex flex-col items-center justify-between mb-6 sm:flex-row">
                    <h2 className="mb-4 text-xl font-semibold leading-tight text-gray-800 sm:mb-0">Users</h2>
                    <Link href="/admin/users/create" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                        Add New User
                    </Link>
                </div>

                <div className="flex flex-col gap-4 mb-4 sm:flex-row">
                    <div className="flex-1 w-full sm:w-1/2 md:w-1/3">
                        <input
                            type="text"
                            placeholder="Search by name, username or email..."
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full sm:w-1/4">
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">All Roles</option>
                            {availableRoles.map(r => (
                                <option key={r.id} value={r.name}>{r.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">No</th>
                                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Name</th>
                                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Username</th>
                                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Email</th>
                                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Roles</th>
                                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((user, index) => (
                                <tr key={user.id}>
                                    <td className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
                                        {users.from + index}
                                    </td>
                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">{user.name}</td>
                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">{user.username}</td>
                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">{user.email}</td>
                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        {user.roles.map(r => r.name).join(', ')}
                                    </td>
                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <div className="flex gap-3">
                                            <Link href={`/admin/users/${user.id}`} className="text-green-600 hover:text-green-900">Lihat</Link>
                                            <Link href={`/admin/users/${user.id}/edit`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                                            <button 
                                                onClick={() => {
                                                    if(confirm('Are you sure you want to delete this user?')) {
                                                        router.delete(`/admin/users/${user.id}`);
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
                            {users.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {users.links.length > 3 && (
                    <div className="flex justify-end mt-4">
                        <div className="flex items-center gap-1">
                            {users.links.map((link, k) => (
                                <Link
                                    key={k}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 text-sm border rounded ${
                                        link.active ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 hover:bg-gray-50'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
