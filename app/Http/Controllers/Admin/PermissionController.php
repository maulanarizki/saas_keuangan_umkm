<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Application\Permission\Services\PermissionAppService;
use Application\Permission\DTO\PermissionData;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function __construct(
        private PermissionAppService $permissionAppService
    ) {}

    public function index()
    {
        $permissions = $this->permissionAppService->getAllPermissions();
        
        return Inertia::render('Admin/Permissions/Index', [
            'permissions' => $permissions
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Permissions/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name',
        ]);

        $permissionData = PermissionData::fromRequest($validated);
        $this->permissionAppService->createPermission($permissionData);

        return redirect()->route('admin.permissions.index')->with('success', 'Permission created successfully.');
    }

    public function show(int $id)
    {
        $permission = $this->permissionAppService->getPermission($id);
        if (!$permission) abort(404);

        return Inertia::render('Admin/Permissions/Show', [
            'permission' => $permission
        ]);
    }

    public function edit(int $id)
    {
        $permission = $this->permissionAppService->getPermission($id);
        if (!$permission) abort(404);

        return Inertia::render('Admin/Permissions/Form', [
            'permission' => $permission
        ]);
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name,' . $id,
        ]);

        $permissionData = PermissionData::fromRequest($validated);
        $this->permissionAppService->updatePermission($id, $permissionData);

        return redirect()->route('admin.permissions.index')->with('success', 'Permission updated successfully.');
    }

    public function destroy(int $id)
    {
        $this->permissionAppService->deletePermission($id);
        return redirect()->route('admin.permissions.index')->with('success', 'Permission deleted successfully.');
    }
}
