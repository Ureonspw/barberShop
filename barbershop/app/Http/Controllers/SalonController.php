<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Salon;
use App\Traits\RedirectBasedOnRole;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log; // Import du logger
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class SalonController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'adresse' => 'required|string|lowercase|string|max:255|unique:salons,adresse',
        ]);
    
        try {
            $salon = Salon::create([
                'nom' => $request->name,
                'adresse' => $request->adresse, 
                'id_admin' => Auth::id(),
            ]);
                        
                
            Log::info('Salon enregistré avec succès.', ['user_id' => $salon->id]);
    
            // // Ne pas connecter automatiquement
            // event(new Registered($user));
    
            return redirect()->back()->with('success', 'Salon créé avec succès !');
    
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'enregistrement du salon.', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
    
            return redirect()->back()->with('error', 'Une erreur est survenue lors de la création du salon.');
        }

    }

    /**
     * Supprimer un salon
     */
    public function destroy($id_salon): RedirectResponse
    {
        try {
            $salon = Salon::findOrFail($id_salon);
            
            // Vérifier que l'utilisateur connecté est l'admin du salon
            if ($salon->id_admin !== Auth::id()) {
                return redirect()->back()->with('error', 'Vous n\'êtes pas autorisé à supprimer ce salon.');
            }
            
            $salonName = $salon->nom;
            $salon->delete();
            
            Log::info('Salon supprimé avec succès.', ['salon_id' => $id_salon, 'salon_name' => $salonName]);
            
            return redirect()->back()->with('success', "Le salon '$salonName' a été supprimé avec succès !");
            
        } catch (\Exception $e) {
            Log::error('Erreur lors de la suppression du salon.', [
                'salon_id' => $id_salon,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            return redirect()->back()->with('error', 'Une erreur est survenue lors de la suppression du salon.');
        }
    }
}
