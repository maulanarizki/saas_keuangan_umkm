<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Domain\User\Contracts\UserRepositoryInterface;
use Infrastructure\Persistence\Eloquent\EloquentUserRepository;
use Domain\Role\Contracts\RoleRepositoryInterface;
use Infrastructure\Persistence\Eloquent\EloquentRoleRepository;
use Domain\Permission\Contracts\PermissionRepositoryInterface;
use Infrastructure\Persistence\Eloquent\EloquentPermissionRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, EloquentUserRepository::class);
        $this->app->bind(RoleRepositoryInterface::class, EloquentRoleRepository::class);
        $this->app->bind(PermissionRepositoryInterface::class, EloquentPermissionRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
