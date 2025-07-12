<?php

namespace App\Traits;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

trait RedirectBasedOnRole
{
    /**
     * Rediriger l'utilisateur selon son rôle
     */
    protected function redirectBasedOnRole(string $suffix = ''): RedirectResponse
    {
        $user = Auth::user();
        
        if ($user->role === 'caissier') {
            return redirect()->intended(route('caissier', absolute: false) . $suffix);
        } elseif ($user->role === 'admin') {
            return redirect()->intended(route('dashboard', absolute: false) . $suffix);
        } else {
            // Par défaut, rediriger vers le dashboard
            return redirect()->intended(route('dashboard', absolute: false) . $suffix);
        }
    }
} 