<?php

namespace App\Http\Controllers\Saas;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;
use App\Models\Category;
use Application\Transaction\Services\TransactionAppService;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    protected TransactionAppService $transactionService;

    public function __construct(TransactionAppService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    public function index()
    {
        $businessId = session('active_business_id');
        
        $transactions = Transaction::with(['category', 'creator'])
            ->where('business_id', $businessId)
            ->latest('date')
            ->latest('id')
            ->paginate(10);

        return Inertia::render('Saas/Transactions/Index', [
            'transactions' => $transactions,
        ]);
    }

    public function create()
    {
        $businessId = session('active_business_id');
        
        $categories = Category::where('business_id', $businessId)->get();

        return Inertia::render('Saas/Transactions/Form', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:1',
            'category_id' => 'required|exists:categories,id',
            'date' => 'required|date',
            'description' => 'nullable|string|max:255',
        ]);

        $businessId = session('active_business_id');

        $this->transactionService->createTransaction($validated, $businessId, Auth::id());

        return redirect()->route('transactions.index')->with('success', 'Transaksi berhasil disimpan dan jurnal otomatis terbuat.');
    }
}
