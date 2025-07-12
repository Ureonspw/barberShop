<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\RedirectBasedOnRole;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log; // Import du logger
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class Adduser extends Controller
{
    use RedirectBasedOnRole;

    /**
     * Display the registration view.
     */
    // public function create(): Response
    // {
    //     Log::info('Affichage du formulaire d\'inscription.');
    //     return Inertia::render('Auth/Register');
    // }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        Log::info('Tentative d\'enregistrement d\'un utilisateur.', [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ]);
    
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|string|in:admin,caissier',
        ]);
    
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
            ]);
    
            Log::info('Utilisateur enregistré avec succès.', ['user_id' => $user->id]);
    
            // Ne pas connecter automatiquement
            event(new Registered($user));
    
            return redirect()->back()->with('success', 'Utilisateur créé avec succès !');
    
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'enregistrement de l\'utilisateur.', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
    
            return redirect()->back()->with('error', 'Une erreur est survenue lors de la création de l\'utilisateur.');
        }
    }
    
}
