import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';

export default function Show({ role }: { role: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Roles', href: '/admin/roles' },
        { title: 'View Role', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="View Role" />

            <div className="max-w-3xl p-6 mx-auto bg-white shadow-sm sm:rounded-lg">
                <div className="flex justify-between mb-6">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Role Details</h2>
                    <Link href="/admin/roles" className="px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300">
                        Back to List
                    </Link>
                </div>

                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Role Information</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Role Name</dt>
                                <dd className="mt-1 text-sm font-bold text-gray-900 sm:col-span-2 sm:mt-0">{role.name}</dd>
                            </div>
                            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Assigned Permissions</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <div className="flex flex-wrap gap-2">
                                        {role.permissions && role.permissions.length > 0 ? role.permissions.map((p: any) => (
                                            <span key={p.id} className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">
                                                {p.name}
                                            </span>
                                        )) : <span className="text-gray-400 italic">No permissions assigned</span>}
                                    </div>
                                </dd>
                            </div>
                            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Guard</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{role.guard_name}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
