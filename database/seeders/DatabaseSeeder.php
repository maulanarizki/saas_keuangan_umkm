<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Application\Business\Services\BusinessAppService;
use Application\Transaction\Services\TransactionAppService;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Setup Roles
        $adminRole = Role::firstOrCreate(['name' => 'administrator']);
        $staffRole = Role::firstOrCreate(['name' => 'staff']);

        // 2. Setup Default User
        $user = User::firstOrCreate([
            'email' => 'admin@demo.com'
        ], [
            'name' => 'Admin Demo',
            'username' => 'admin',
            'password' => bcrypt('password'),
        ]);
        
        $user->assignRole($adminRole);

        // 3. Create Business using Service (This will Auto-Seed Chart of Accounts)
        $businessService = new BusinessAppService();
        $business = $businessService->createBusiness($user, 'Toko Maju Jaya', 'warung');

        // 4. Setup Categories for the Business
        $salesCategory = Category::create([
            'business_id' => $business->id,
            'name' => 'Penjualan Barang',
            'type' => 'income'
        ]);

        $electricityCategory = Category::create([
            'business_id' => $business->id,
            'name' => 'Bayar Listrik',
            'type' => 'expense'
        ]);

        // 5. Create Transactions using Service (This will Auto-Journal)
        $transactionService = new TransactionAppService();
        
        // Income Transaction 1
        $transactionService->createTransaction([
            'category_id' => $salesCategory->id,
            'type' => 'income',
            'amount' => 150000.00,
            'description' => 'Penjualan Beras 10kg',
            'date' => now()->subDays(2)->format('Y-m-d')
        ], $business->id, $user->id);

        // Income Transaction 2
        $transactionService->createTransaction([
            'category_id' => $salesCategory->id,
            'type' => 'income',
            'amount' => 50000.00,
            'description' => 'Penjualan Minyak Goreng',
            'date' => now()->subDays(1)->format('Y-m-d')
        ], $business->id, $user->id);

        // Expense Transaction
        $transactionService->createTransaction([
            'category_id' => $electricityCategory->id,
            'type' => 'expense',
            'amount' => 75000.00,
            'description' => 'Pembayaran Listrik Bulanan',
            'date' => now()->format('Y-m-d')
        ], $business->id, $user->id);
    }
}
