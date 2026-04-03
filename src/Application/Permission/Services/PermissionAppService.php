<?php

namespace Application\Permission\Services;

use Domain\Permission\Contracts\PermissionRepositoryInterface;
use Application\Permission\DTO\PermissionData;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Eloquent\Collection;

class PermissionAppService
{
    public function __construct(
        private PermissionRepositoryInterface $permissionRepository
    ) {}

    public function getAllPermissions(): Collection
    {
        return $this->permissionRepository->all();
    }

    public function getPermission(int $id): ?Permission
    {
        return $this->permissionRepository->findById($id);
    }

    public function createPermission(PermissionData $data): Permission
    {
        return $this->permissionRepository->create([
            'name' => $data->name,
            'guard_name' => 'web'
        ]);
    }

    public function updatePermission(int $id, PermissionData $data): bool
    {
        return $this->permissionRepository->update($id, [
            'name' => $data->name,
        ]);
    }

    public function deletePermission(int $id): bool
    {
        return $this->permissionRepository->delete($id);
    }
}
