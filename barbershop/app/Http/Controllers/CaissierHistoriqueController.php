<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Coiffeur;
use App\Models\Paiement;
use App\Models\Salon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class CaissierHistoriqueController extends Controller
{
    public function index(Request $request)
    {
        // Récupérer le filtre salon
        $selectedSalonId = $request->get('salon_id');
        
        $query = Paiement::with(['client', 'salon', 'client.coiffeur']);

        // Filtres
        $filters = $request->only(['salon', 'coiffeur', 'client', 'mode_paiement', 'statut_paiement', 'date_debut', 'date_fin', 'montant_min', 'montant_max']);

        // Filtre par salon (priorité au filtre URL)
        if ($selectedSalonId) {
            $query->where('id_salon', $selectedSalonId);
        } elseif (!empty($filters['salon'])) {
            $query->where('id_salon', $filters['salon']);
        }

        if (!empty($filters['coiffeur'])) {
            $query->whereHas('client', function($q) use ($filters) {
                $q->where('id_coiffeur', $filters['coiffeur']);
            });
        }

        if (!empty($filters['client'])) {
            $query->whereHas('client', function($q) use ($filters) {
                $q->where('nom', 'like', '%' . $filters['client'] . '%');
            });
        }

        if (!empty($filters['mode_paiement'])) {
            $query->where('mode_paiement', $filters['mode_paiement']);
        }

        if (!empty($filters['statut_paiement'])) {
            $query->where('statut_paiement', $filters['statut_paiement']);
        }

        if (!empty($filters['date_debut'])) {
            $query->whereDate('date_paiement', '>=', $filters['date_debut']);
        }

        if (!empty($filters['date_fin'])) {
            $query->whereDate('date_paiement', '<=', $filters['date_fin']);
        }

        if (!empty($filters['montant_min'])) {
            $query->where('somme_paiement', '>=', $filters['montant_min']);
        }

        if (!empty($filters['montant_max'])) {
            $query->where('somme_paiement', '<=', $filters['montant_max']);
        }

        // Tri
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $paiements = $query->paginate(20);

        // Statistiques pour l'historique
        $stats = [
            'total_paiements' => $query->count(),
            'total_montant' => $query->sum('somme_paiement'),
            'moyenne_montant' => $query->avg('somme_paiement'),
            'paiements_aujourdhui' => $query->whereDate('created_at', Carbon::today())->count(),
            'montant_aujourdhui' => $query->whereDate('created_at', Carbon::today())->sum('somme_paiement'),
        ];

        // Données pour les filtres
        $salons = Salon::select('id_salon', 'nom', 'adresse')->get();
        $coiffeurs = Coiffeur::select('id_coiffeur', 'nom', 'specialite')->get();
        
        // Modes de paiement disponibles
        $modesPaiement = Paiement::distinct()->pluck('mode_paiement')->filter()->values();
        $statutsPaiement = Paiement::distinct()->pluck('statut_paiement')->filter()->values();

        return Inertia::render('caissierpage/historiquePage', [
            'paiements' => $paiements,
            'stats' => $stats,
            'salons' => $salons,
            'coiffeurs' => $coiffeurs,
            'modesPaiement' => $modesPaiement,
            'statutsPaiement' => $statutsPaiement,
            'filters' => $filters,
            'selectedSalonId' => $selectedSalonId,
        ]);
    }

    /**
     * Exporter l'historique en CSV
     */
    public function export(Request $request)
    {
        $selectedSalonId = $request->get('salon_id');
        
        $query = Paiement::with(['client', 'salon', 'client.coiffeur']);

        // Appliquer les mêmes filtres que pour l'affichage
        if ($selectedSalonId) {
            $query->where('id_salon', $selectedSalonId);
        }

        $paiements = $query->orderBy('created_at', 'desc')->get();

        $filename = 'historique_caissier_' . Carbon::now()->format('Y-m-d_H-i-s') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function() use ($paiements) {
            $file = fopen('php://output', 'w');
            
            // En-têtes CSV
            fputcsv($file, [
                'Date',
                'Client',
                'Coiffeur',
                'Salon',
                'Montant',
                'Mode de Paiement',
                'Statut',
                'Contacts'
            ]);

            // Données
            foreach ($paiements as $paiement) {
                fputcsv($file, [
                    $paiement->date_paiement,
                    $paiement->client->nom,
                    $paiement->client->coiffeur->nom,
                    $paiement->salon->nom,
                    $paiement->somme_paiement,
                    $paiement->mode_paiement,
                    $paiement->statut_paiement,
                    $paiement->client->contacts
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
} 