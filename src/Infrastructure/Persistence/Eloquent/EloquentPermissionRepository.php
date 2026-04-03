<?php

namespace Infrastructure\Persistence\Eloquent;

use Domain\Permission\Contracts\PermissionRepositoryInterface;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Eloquent\Collection;

class EloquentPermissionRepository implements PermissionRepositoryInterface
{
    public function all(): Collection
    {
        return Permission::all();
    }

    public function findById(int $id): ?Permission
    {
        return Permission::find($id);
    }

    public function create(array $data): Permission
    {
        return Permission::create($data);
    }

    public function update(int $id, array $data): bool
    {
        $permission = $this->findById($id);
        if ($permission) {
            return $permission->update($data);
        }
        return false;
    }

    public function delete(int $id): bool
    {
        $permission = $this->findById($id);
        if ($permission) {
            return $permission->delete();
        }
        return false;
    }
}
