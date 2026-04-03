<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Application\User\Services\UserAppService;
use Application\User\DTO\UserData;
use Application\Role\Services\RoleAppService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(
        private UserAppService $userAppService,
        private RoleAppService $roleAppService
    ) {}

    public function index(Request $request)
    {
        $users = $this->userAppService->getPaginatedUsers(
            10, 
            $request->query('search', ''),
            $request->query('role', '')
        );
        $roles = $this->roleAppService->getAllRoles();
        
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'availableRoles' => $roles,
            'filters' => $request->only(['search', 'role'])
        ]);
    }

    public function create()
    {
        $roles = $this->roleAppService->getAllRoles();
        return Inertia::render('Admin/Users/Form', [
            'roles' => $roles
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'roles' => 'array'
        ]);

        $userData = UserData::fromRequest($validated);
        $this->userAppService->createUser($userData);

        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

    public function show(int $id)
    {
        $user = $this->userAppService->getUser($id);
        if (!$user) abort(404);

        $user->load('roles');

        return Inertia::render('Admin/Users/Show', [
            'user' => $user
        ]);
    }

    public function edit(int $id)
    {
        $user = $this->userAppService->getUser($id);
        if (!$user) abort(404);

        // Load roles to match spatie relation
        $user->load('roles');
        $userRoles = $user->roles->pluck('name')->toArray();
        $user->roles_list = $userRoles; // Add convenient property for the frontend

        $roles = $this->roleAppService->getAllRoles();

        return Inertia::render('Admin/Users/Form', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $id,
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed',
            'roles' => 'array'
        ]);

        $userData = UserData::fromRequest($validated);
        $this->userAppService->updateUser($id, $userData);

        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(int $id)
    {
        $this->userAppService->deleteUser($id);
        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }
}
