<?php

namespace Application\Business\Services;

use App\Models\Business;
use App\Models\BusinessUser;
use App\Models\Account;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;

class BusinessAppService
{
    /**
     * Create a new business and seed default accounts.
     */
    public function createBusiness(User $owner, string $name, ?string $type = null): Business
    {
        return DB::transaction(function () use ($owner, $name, $type) {
            // 1. Buat Bisnis
            $business = Business::create([
                'owner_id' => $owner->id,
                'name' => $name,
                'type' => $type,
            ]);

            // 2. Hubungkan owner sebagai business_user dan berikan role khusus jika ada (misal Super Admin toko)
            // Untuk sekarang, kita asumsikan tidak ada spesifik role atau ambil role administrator
            $role = Role::where('name', 'administrator')->first();
            if ($role) {
                BusinessUser::create([
                    'business_id' => $business->id,
                    'user_id' => $owner->id,
                    'role_id' => $role->id,
                ]);
            }

            // 3. Auto-seed Chart of Accounts default UMKM
            $defaultAccounts = [
                ['code' => '101', 'name' => 'Kas', 'type' => 'asset'],
                ['code' => '401', 'name' => 'Pendapatan Penjualan', 'type' => 'revenue'],
                ['code' => '501', 'name' => 'Beban Operasional', 'type' => 'expense'],
                ['code' => '201', 'name' => 'Hutang', 'type' => 'liability'],
                ['code' => '301', 'name' => 'Modal', 'type' => 'equity'],
            ];

            foreach ($defaultAccounts as $acc) {
                Account::create([
                    'business_id' => $business->id,
                    'code' => $acc['code'],
                    'name' => $acc['name'],
                    'type' => $acc['type'],
                ]);
            }

            return $business;
        });
    }
}
