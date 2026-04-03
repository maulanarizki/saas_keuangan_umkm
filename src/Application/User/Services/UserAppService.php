<?php

namespace Application\User\Services;

use Domain\User\Contracts\UserRepositoryInterface;
use Application\User\DTO\UserData;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserAppService
{
    public function __construct(
        private UserRepositoryInterface $userRepository
    ) {}

    public function getPaginatedUsers(int $perPage = 15, string $search = '', string $role = ''): LengthAwarePaginator
    {
        return $this->userRepository->paginate($perPage, $search, $role);
    }

    public function getUser(int $id): ?User
    {
        return $this->userRepository->findById($id);
    }

    public function createUser(UserData $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = $this->userRepository->create([
                'name' => $data->name,
                'username' => $data->username,
                'email' => $data->email,
                'password' => Hash::make($data->password),
            ]);

            if (!empty($data->roles)) {
                $this->userRepository->syncRoles($user, $data->roles);
            }

            return $user;
        });
    }

    public function updateUser(int $id, UserData $data): bool
    {
        return DB::transaction(function () use ($id, $data) {
            $user = $this->userRepository->findById($id);
            if (!$user) return false;

            $updateData = [
                'name' => $data->name,
                'username' => $data->username,
                'email' => $data->email,
            ];

            if ($data->password) {
                $updateData['password'] = Hash::make($data->password);
            }

            $success = $this->userRepository->update($id, $updateData);

            if ($success) {
                $this->userRepository->syncRoles($user, $data->roles);
            }

            return $success;
        });
    }

    public function deleteUser(int $id): bool
    {
        return $this->userRepository->delete($id);
    }
}
