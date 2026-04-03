<?php

namespace Domain\Permission\Contracts;

use Spatie\Permission\Models\Permission;
use Illuminate\Database\Eloquent\Collection;

interface PermissionRepositoryInterface
{
    public function all(): Collection;
    public function findById(int $id): ?Permission;
    public function create(array $data): Permission;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
}
