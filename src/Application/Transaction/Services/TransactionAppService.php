<?php

namespace Application\Transaction\Services;

use App\Models\Transaction;
use App\Models\JournalEntry;
use App\Models\JournalLine;
use App\Models\Account;
use Illuminate\Support\Facades\DB;

class TransactionAppService
{
    /**
     * Create a new transaction and generate journal entries automatically.
     */
    public function createTransaction(array $data, int $businessId, int $userId): Transaction
    {
        return DB::transaction(function () use ($data, $businessId, $userId) {
            // 1. Simpan tabel transaksi
            $transaction = Transaction::create([
                'business_id' => $businessId,
                'category_id' => $data['category_id'] ?? null,
                'type' => $data['type'], // 'income' atau 'expense'
                'amount' => $data['amount'],
                'description' => $data['description'] ?? '',
                'date' => $data['date'],
                'created_by' => $userId,
            ]);

            // 2. Simpan tabel journal_entries
            $journalEntry = JournalEntry::create([
                'business_id' => $businessId,
                'date' => $data['date'],
                'description' => $data['description'] ?? 'Auto Journal for Trans #' . $transaction->id,
                'transaction_id' => $transaction->id,
                'created_by' => $userId,
            ]);

            // 3. Mapping Akun (Auto-Journal) UMKM Simpel
            $kasAccount = Account::where('business_id', $businessId)->where('type', 'asset')->first();
            
            if ($data['type'] === 'income') {
                $revenueAccount = Account::where('business_id', $businessId)->where('type', 'revenue')->first();
                
                // Debit Kas
                if ($kasAccount) {
                    JournalLine::create([
                        'journal_entry_id' => $journalEntry->id,
                        'account_id' => $kasAccount->id,
                        'debit' => $data['amount'],
                        'credit' => 0,
                    ]);
                }

                // Kredit Pendapatan
                if ($revenueAccount) {
                    JournalLine::create([
                        'journal_entry_id' => $journalEntry->id,
                        'account_id' => $revenueAccount->id,
                        'debit' => 0,
                        'credit' => $data['amount'],
                    ]);
                }
            } else if ($data['type'] === 'expense') {
                $expenseAccount = Account::where('business_id', $businessId)->where('type', 'expense')->first();
                
                // Debit Beban
                if ($expenseAccount) {
                    JournalLine::create([
                        'journal_entry_id' => $journalEntry->id,
                        'account_id' => $expenseAccount->id,
                        'debit' => $data['amount'],
                        'credit' => 0,
                    ]);
                }

                // Kredit Kas
                if ($kasAccount) {
                    JournalLine::create([
                        'journal_entry_id' => $journalEntry->id,
                        'account_id' => $kasAccount->id,
                        'debit' => 0,
                        'credit' => $data['amount'],
                    ]);
                }
            }

            return $transaction;
        });
    }
}
