<?php

namespace App\Http\Controllers\Saas;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LaunchpadController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        // Ambil bisnis yang dimiliki langsung (owner) ATAU di mana user menjadi anggota (business_users)
        $ownedBusinesses = $user->ownedBusinesses()->get();
        // businessUsers mengembalikan tabel relasi, mari muat relation business-nya
        $memberBusinesses = $user->businessUsers()->with('business')->get()->pluck('business');
        
        $businesses = $ownedBusinesses->merge($memberBusinesses)->unique('id')->values();

        return Inertia::render('Saas/Launchpad', [
            'businesses' => $businesses
        ]);
    }

    public function selectBusiness(Request $request, int $id)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Validasi kepemilikan atau keanggotaan
        $isOwner = $user->ownedBusinesses()->where('id', $id)->exists();
        $isMember = $user->businessUsers()->where('business_id', $id)->exists();

        if (!$isOwner && !$isMember) {
            abort(403, 'Unauthorized action.');
        }

        // Set session
        session(['active_business_id' => $id]);

        return redirect()->route('dashboard');
    }
}
