<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Coiffeur;
use App\Models\Paiement;
use App\Models\Salon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class CaissierController extends Controller
{
    /**
     * Display the caissier home page.
     */
    public function index(Request $request): Response
    {
        // Récupérer le filtre salon
        $selectedSalonId = $request->get('salon_id');
        
        // Statistiques du jour
        $aujourdhui = Carbon::today();
        $paiementsQuery = Paiement::whereDate('created_at', $aujourdhui);
        $clientsQuery = Client::whereDate('created_at', $aujourdhui);
        
        // Appliquer le filtre salon si sélectionné
        if ($selectedSalonId) {
            $paiementsQuery->where('id_salon', $selectedSalonId);
            $clientsQuery->where('id_salon', $selectedSalonId);
        }
        
        $paiementsAujourdhui = $paiementsQuery->count();
        $montantAujourdhui = $paiementsQuery->sum('somme_paiement');
        $clientsAujourdhui = $clientsQuery->count();

        // Statistiques de la semaine
        $debutSemaine = Carbon::now()->startOfWeek();
        $finSemaine = Carbon::now()->endOfWeek();
        $paiementsSemaineQuery = Paiement::whereBetween('created_at', [$debutSemaine, $finSemaine]);
        
        if ($selectedSalonId) {
            $paiementsSemaineQuery->where('id_salon', $selectedSalonId);
        }
        
        $paiementsSemaine = $paiementsSemaineQuery->count();
        $montantSemaine = $paiementsSemaineQuery->sum('somme_paiement');

        // Statistiques du mois
        $debutMois = Carbon::now()->startOfMonth();
        $finMois = Carbon::now()->endOfMonth();
        $paiementsMoisQuery = Paiement::whereBetween('created_at', [$debutMois, $finMois]);
        
        if ($selectedSalonId) {
            $paiementsMoisQuery->where('id_salon', $selectedSalonId);
        }
        
        $paiementsMois = $paiementsMoisQuery->count();
        $montantMois = $paiementsMoisQuery->sum('somme_paiement');

        // Derniers paiements
        $recentPaiementsQuery = Paiement::with(['client', 'salon', 'client.coiffeur'])
            ->orderBy('created_at', 'desc');
            
        if ($selectedSalonId) {
            $recentPaiementsQuery->where('id_salon', $selectedSalonId);
        }
        
        $recentPaiements = $recentPaiementsQuery->limit(5)->get();

        // Top coiffeurs du jour
        $topCoiffeursQuery = Client::with('coiffeur')
            ->whereDate('created_at', $aujourdhui)
            ->selectRaw('id_coiffeur, COUNT(*) as total_clients')
            ->groupBy('id_coiffeur')
            ->orderBy('total_clients', 'desc');
            
        if ($selectedSalonId) {
            $topCoiffeursQuery->where('id_salon', $selectedSalonId);
        }
        
        $topCoiffeurs = $topCoiffeursQuery->limit(3)->get();

        // Salons avec leurs coiffeurs
        $salons = Salon::with('coiffeurs')->get();

        return Inertia::render('caissierpage/caissierPage', [
            'stats' => [
                'aujourdhui' => [
                    'paiements' => $paiementsAujourdhui,
                    'montant' => $montantAujourdhui,
                    'clients' => $clientsAujourdhui,
                ],
                'semaine' => [
                    'paiements' => $paiementsSemaine,
                    'montant' => $montantSemaine,
                ],
                'mois' => [
                    'paiements' => $paiementsMois,
                    'montant' => $montantMois,
                ],
            ],
            'recentPaiements' => $recentPaiements,
            'topCoiffeurs' => $topCoiffeurs,
            'salons' => $salons,
            'selectedSalonId' => $selectedSalonId,
        ]);
    }

    /**
     * Display the caissier payment page.
     */
    public function paiement(): Response
    {
        $salons = Salon::select('id_salon', 'nom', 'adresse')->get();
        $coiffeurs = Coiffeur::select('id_coiffeur', 'nom', 'specialite', 'id_salon')->get();
        $clients = Client::select('id_client', 'nom', 'contacts', 'id_salon')->get();
        
        // Récupérer les derniers paiements pour l'historique
        $recentPaiements = Paiement::with(['client', 'salon', 'client.coiffeur'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('caissierpage/paiementPage', [
            'salons' => $salons,
            'coiffeurs' => $coiffeurs,
            'clients' => $clients,
            'recentPaiements' => $recentPaiements,
        ]);
    }

    /**
     * Traiter un nouveau paiement
     */
    public function processPaiement(Request $request)
    {
        $request->validate([
            'nom_client' => 'required|string|max:255',
            'contacts_client' => 'nullable|string|max:255',
            'montant' => 'required|numeric|min:0',
            'mode_paiement' => 'required|string|in:especes,carte,cheque',
            'id_salon' => 'required|integer|exists:salons,id_salon',
            'id_coiffeur' => 'required|integer|exists:coiffeurs,id_coiffeur',
        ]);

        try {
            // Vérifier si le client existe déjà dans ce salon
            $client = Client::where('nom', $request->nom_client)
                ->where('id_salon', $request->id_salon)
                ->first();

            if (!$client) {
                // Créer un nouveau client
                $client = Client::create([
                    'nom' => $request->nom_client,
                    'contacts' => $request->contacts_client,
                    'id_salon' => $request->id_salon,
                    'id_coiffeur' => $request->id_coiffeur,
                    'date_coiffure' => now(),
                ]);
            } else {
                // Mettre à jour le coiffeur si différent
                $client->update([
                    'id_coiffeur' => $request->id_coiffeur,
                    'date_coiffure' => now(),
                ]);
            }

            // Créer le paiement
            $paiement = Paiement::create([
                'mode_paiement' => $request->mode_paiement,
                'somme_paiement' => $request->montant,
                'statut_paiement' => 'paye',
                'id_client' => $client->id_client,
                'id_salon' => $request->id_salon,
                'date_paiement' => now(),
            ]);

            Log::info('Paiement traité avec succès', [
                'client_id' => $client->id_client,
                'paiement_id' => $paiement->id_paiement,
                'montant' => $request->montant,
            ]);

            return redirect()->back()->with('success', 'Paiement traité avec succès !');

        } catch (\Exception $e) {
            Log::error('Erreur lors du traitement du paiement', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', 'Une erreur est survenue lors du traitement du paiement.');
        }
    }
} 