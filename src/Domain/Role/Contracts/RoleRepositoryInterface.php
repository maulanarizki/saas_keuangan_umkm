<?php

namespace Domain\Role\Contracts;

use Spatie\Permission\Models\Role;
use Illuminate\Database\Eloquent\Collection;

interface RoleRepositoryInterface
{
    public function all(): Collection;
    public function findById(int $id): ?Role;
    public function create(array $data): Role;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
    public function syncPermissions(Role $role, array $permissions): void;
}
