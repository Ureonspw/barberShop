<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Salon;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; // Import du logger

class ClientController extends Controller
{
    //

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'contacts' => 'string|max:255',
            'id_salon' => 'required|integer|exists:salons,id_salon',
            'id_coiffeur'=>'required|integer|exists:coiffeurs,id_coiffeur',
        ]);
        
    
        try {
            $client = Client::create([
                'nom' => $request->nom,
                'contacts' => $request->contacts,
                'id_salon' => $request->id_salon,
                'id_coiffeur' => $request->id_coiffeur,
                'date_coiffure' => now()
            ]);
            
                        
                 
            Log::info('Client ajouté avec succès.', ['user_id' => $client->id_client]);
    
            // // Ne pas connecter automatiquement
            // event(new Registered($user));
    
            return redirect()->back()->with('success', 'Client Ajouter avec succès !');
    
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'enregistrement du Client.', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
    
            return redirect()->back()->with('error', 'Une erreur est survenue lors de l\'enregistrement du client.');
        }

    }

    /**
     * Supprimer un client
     */
    public function destroy($id_client): RedirectResponse
    {
        try {
            $client = Client::findOrFail($id_client);
            
            // Vérifier que l'utilisateur connecté est l'admin du salon du client
            $salon = Salon::find($client->id_salon);
            if (!$salon || $salon->id_admin !== Auth::id()) {
                return redirect()->back()->with('error', 'Vous n\'êtes pas autorisé à supprimer ce client.');
            }
            
            $clientName = $client->nom;
            $client->delete();
            
            Log::info('Client supprimé avec succès.', ['client_id' => $id_client, 'client_name' => $clientName]);
            
            return redirect()->back()->with('success', "Le client '$clientName' a été supprimé avec succès !");
            
        } catch (\Exception $e) {
            Log::error('Erreur lors de la suppression du client.', [
                'client_id' => $id_client,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            return redirect()->back()->with('error', 'Une erreur est survenue lors de la suppression du client.');
        }
    }

} 
