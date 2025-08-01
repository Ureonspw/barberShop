<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!Auth::check()) {
            return redirect('login');
        }

        $user = Auth::user();
        
        if ($user->role !== $role) {
            // Rediriger vers la page appropriée selon le rôle
            if ($user->role === 'caissier') {
                return redirect()->route('caissier');
            } elseif ($user->role === 'admin') {
                return redirect()->route('dashboard');
            } else {
                return redirect()->route('dashboard');
            }
        }

        return $next($request);
    }
} 