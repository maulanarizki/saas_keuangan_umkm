import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';

export default function Show({ permission }: { permission: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Permissions', href: '/admin/permissions' },
        { title: 'View Permission', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="View Permission" />

            <div className="max-w-3xl p-6 mx-auto bg-white shadow-sm sm:rounded-lg">
                <div className="flex justify-between mb-6">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Permission Details</h2>
                    <Link href="/admin/permissions" className="px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300">
                        Back to List
                    </Link>
                </div>

                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Permission Information</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">ID / Key</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{permission.id}</dd>
                            </div>
                            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Permission Name</dt>
                                <dd className="mt-1 text-sm font-bold text-gray-900 sm:col-span-2 sm:mt-0">{permission.name}</dd>
                            </div>
                            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Guard</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{permission.guard_name}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
