import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import React from 'react';

interface Permission {
    id: number;
    name: string;
}

export default function Form({ role, permissions }: { role?: any, permissions: Permission[] }) {
    const isEditing = !!role;
    
    const { data, setData, post, put, processing, errors } = useForm({
        name: role?.name || '',
        permissions: role?.permissions_list || [] as string[]
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(`/admin/roles/${role.id}`);
        } else {
            post('/admin/roles');
        }
    };

    const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (e.target.checked) {
            setData('permissions', [...data.permissions, value]);
        } else {
            setData('permissions', data.permissions.filter((p: string) => p !== value));
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Roles', href: '/admin/roles' },
        { title: isEditing ? 'Edit Role' : 'Create Role', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit Role' : 'Create Role'} />

            <div className="max-w-2xl p-6 mx-auto bg-white shadow-sm sm:rounded-lg">
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Role Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g. Administrator"
                        />
                        {errors.name && <p className="mt-1 text-xs italic text-red-500">{errors.name}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Assign Permissions</label>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {permissions.map(permission => (
                                <label key={permission.id} className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        value={permission.name}
                                        checked={data.permissions.includes(permission.name)}
                                        onChange={handlePermissionChange}
                                        className="w-5 h-5 text-blue-600 form-checkbox"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{permission.name}</span>
                                </label>
                            ))}
                        </div>
                        {errors.permissions && <p className="mt-1 text-xs italic text-red-500">{errors.permissions}</p>}
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:opacity-50"
                        >
                            {isEditing ? 'Update Role' : 'Create Role'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
