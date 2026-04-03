import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import React from 'react';

export default function Form({ permission }: { permission?: any }) {
    const isEditing = !!permission;
    
    const { data, setData, post, put, processing, errors } = useForm({
        name: permission?.name || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(`/admin/permissions/${permission.id}`);
        } else {
            post('/admin/permissions');
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Permissions', href: '/admin/permissions' },
        { title: isEditing ? 'Edit Permission' : 'Create Permission', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit Permission' : 'Create Permission'} />

            <div className="max-w-2xl p-6 mx-auto bg-white shadow-sm sm:rounded-lg">
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Permission Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g. edit articles"
                        />
                        {errors.name && <p className="mt-1 text-xs italic text-red-500">{errors.name}</p>}
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:opacity-50"
                        >
                            {isEditing ? 'Update Permission' : 'Create Permission'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
