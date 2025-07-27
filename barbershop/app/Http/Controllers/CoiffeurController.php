<?php

namespace App\Http\Controllers;

use App\Models\Coiffeur;
use App\Models\Salon;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; // Import du logger

class CoiffeurController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'specialite' => 'required|string|max:255',
            'disponibilite' => 'required|string|max:255',
            'id_salon' => 'required|integer|exists:salons,id_salon',
        ]);
        
    
        try {
            $salon = Coiffeur::create([
                'nom' => $request->name,
                'specialite' => $request->specialite, 
                'id_salon' => $request->id_salon,
                'disponibilite' => $request->disponibilite,

            ]);
                        
                
            Log::info('Coiffeur enregistré avec succès.', ['user_id' => $salon->id]);
    
            // // Ne pas connecter automatiquement
            // event(new Registered($user));
    
            return redirect()->back()->with('success', 'Coiffeur créé avec succès !');
    
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'enregistrement du Coiffeur.', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
    
            return redirect()->back()->with('error', 'Une erreur est survenue lors de la création du Coiffeur.');
        }

    }

    /**
     * Supprimer un coiffeur
     */
    public function destroy($id_coiffeur): RedirectResponse
    {
        try {
            $coiffeur = Coiffeur::findOrFail($id_coiffeur);
            
            // Vérifier que l'utilisateur connecté est l'admin du salon du coiffeur
            $salon = Salon::find($coiffeur->id_salon);
            if (!$salon || $salon->id_admin !== Auth::id()) {
                return redirect()->back()->with('error', 'Vous n\'êtes pas autorisé à supprimer ce coiffeur.');
            }
            
            $coiffeurName = $coiffeur->nom;
            $coiffeur->delete();
            
            Log::info('Coiffeur supprimé avec succès.', ['coiffeur_id' => $id_coiffeur, 'coiffeur_name' => $coiffeurName]);
            
            return redirect()->back()->with('success', "Le coiffeur '$coiffeurName' a été supprimé avec succès !");
            
        } catch (\Exception $e) {
            Log::error('Erreur lors de la suppression du coiffeur.', [
                'coiffeur_id' => $id_coiffeur,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            return redirect()->back()->with('error', 'Une erreur est survenue lors de la suppression du coiffeur.');
        }
    }

}
 