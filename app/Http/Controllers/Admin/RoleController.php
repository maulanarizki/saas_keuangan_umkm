<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Application\Role\Services\RoleAppService;
use Application\Role\DTO\RoleData;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function __construct(
        private RoleAppService $roleAppService
    ) {}

    public function index()
    {
        $roles = $this->roleAppService->getAllRoles();
        
        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles
        ]);
    }

    public function create()
    {
        $permissions = Permission::all();
        return Inertia::render('Admin/Roles/Form', [
            'permissions' => $permissions
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'array'
        ]);

        $roleData = RoleData::fromRequest($validated);
        $this->roleAppService->createRole($roleData);

        return redirect()->route('admin.roles.index')->with('success', 'Role created successfully.');
    }

    public function show(int $id)
    {
        $role = $this->roleAppService->getRole($id);
        if (!$role) abort(404);

        $role->load('permissions');

        return Inertia::render('Admin/Roles/Show', [
            'role' => $role
        ]);
    }

    public function edit(int $id)
    {
        $role = $this->roleAppService->getRole($id);
        if (!$role) abort(404);

        $role->load('permissions');
        $rolePermissions = $role->permissions->pluck('name')->toArray();
        $role->permissions_list = $rolePermissions; // For frontend

        $permissions = Permission::all();

        return Inertia::render('Admin/Roles/Form', [
            'role' => $role,
            'permissions' => $permissions
        ]);
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $id,
            'permissions' => 'array'
        ]);

        $roleData = RoleData::fromRequest($validated);
        $this->roleAppService->updateRole($id, $roleData);

        return redirect()->route('admin.roles.index')->with('success', 'Role updated successfully.');
    }

    public function destroy(int $id)
    {
        $this->roleAppService->deleteRole($id);
        return redirect()->route('admin.roles.index')->with('success', 'Role deleted successfully.');
    }
}
