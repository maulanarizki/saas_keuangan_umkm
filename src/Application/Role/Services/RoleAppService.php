<?php

namespace Application\Role\Services;

use Domain\Role\Contracts\RoleRepositoryInterface;
use Application\Role\DTO\RoleData;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class RoleAppService
{
    public function __construct(
        private RoleRepositoryInterface $roleRepository
    ) {}

    public function getAllRoles(): Collection
    {
        return $this->roleRepository->all();
    }

    public function getRole(int $id): ?Role
    {
        return $this->roleRepository->findById($id);
    }

    public function createRole(RoleData $data): Role
    {
        return DB::transaction(function () use ($data) {
            $role = $this->roleRepository->create([
                'name' => $data->name,
                'guard_name' => 'web'
            ]);

            if (!empty($data->permissions)) {
                $this->roleRepository->syncPermissions($role, $data->permissions);
            }

            return $role;
        });
    }

    public function updateRole(int $id, RoleData $data): bool
    {
        return DB::transaction(function () use ($id, $data) {
            $role = $this->roleRepository->findById($id);
            if (!$role) return false;

            $success = $this->roleRepository->update($id, [
                'name' => $data->name,
            ]);

            if ($success) {
                $this->roleRepository->syncPermissions($role, $data->permissions);
            }

            return $success;
        });
    }

    public function deleteRole(int $id): bool
    {
        return $this->roleRepository->delete($id);
    }
}
