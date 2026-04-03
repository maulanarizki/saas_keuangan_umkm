<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\SerializableClosure\Exceptions\PhpVersionNotSupportedException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class ActiveBusinessMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $businessId = session('active_business_id');

        if (!$businessId) {
            // Jika belum milih bisnis, arahkan ke halaman pilih bisnis
            // (Note: abaikan jika sedang berada di halaman pemilihan bisnis)
            if (!$request->routeIs('business.select') && !$request->routeIs('business.set')) {
                return redirect()->route('business.select')->with('error', 'Silakan pilih usaha terlebih dahulu.');
            }
            return $next($request);
        }

        // Cek apakah user punya akses ke bisnis ini lewat business_users
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if ($user) {
            $hasAccess = $user->businessUsers()->where('business_id', $businessId)->exists();
            if (!$hasAccess && !$user->ownedBusinesses()->where('id', $businessId)->exists()) {
                 // Jika bukan member dan bukan owner
                 session()->forget('active_business_id');
                 return redirect()->route('business.select')->with('error', 'Anda tidak memiliki akses ke usaha tersebut.');
            }
        }

        return $next($request);
    }
}
