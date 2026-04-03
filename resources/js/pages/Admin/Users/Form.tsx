import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import React from 'react';

interface Role {
    name: string;
    id: number;
}

export default function Form({ user, roles }: { user?: any, roles: Role[] }) {
    const isEditing = !!user;
    
    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name || '',
        username: user?.username || '',
        email: user?.email || '',
        password: '',
        password_confirmation: '',
        roles: user?.roles_list || [] as string[]
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(`/admin/users/${user.id}`);
        } else {
            post('/admin/users');
        }
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (e.target.checked) {
            setData('roles', [...data.roles, value]);
        } else {
            setData('roles', data.roles.filter((r: string) => r !== value));
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Users', href: '/admin/users' },
        { title: isEditing ? 'Edit User' : 'Create User', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit User' : 'Create User'} />

            <div className="max-w-2xl p-6 mx-auto bg-white shadow-sm sm:rounded-lg">
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="mt-1 text-xs italic text-red-500">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Username</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                        />
                        {errors.username && <p className="mt-1 text-xs italic text-red-500">{errors.username}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <p className="mt-1 text-xs italic text-red-500">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && <p className="mt-1 text-xs italic text-red-500">{errors.password}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Assign Roles</label>
                        <div className="flex flex-col gap-2">
                            {roles.map(role => (
                                <label key={role.id} className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        value={role.name}
                                        checked={data.roles.includes(role.name)}
                                        onChange={handleRoleChange}
                                        className="w-5 h-5 text-blue-600 form-checkbox"
                                    />
                                    <span className="ml-2 text-gray-700">{role.name}</span>
                                </label>
                            ))}
                        </div>
                        {errors.roles && <p className="mt-1 text-xs italic text-red-500">{errors.roles}</p>}
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:opacity-50"
                        >
                            {isEditing ? 'Update User' : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
