<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Coiffeur;
use App\Models\Paiement;
use App\Models\Salon;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class HistoriqueController extends Controller
{
    public function index(Request $request)
    {
        $query = Paiement::with(['client', 'salon', 'client.coiffeur']);

        // Filtres
        $filters = $request->only(['salon', 'coiffeur', 'client', 'mode_paiement', 'statut_paiement', 'date_debut', 'date_fin', 'montant_min', 'montant_max']);

        if (!empty($filters['salon'])) {
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
        $sortBy = $request->get('sort_by', 'date_paiement');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 20);
        $paiements = $query->paginate($perPage);

        // Statistiques pour les filtres
        $stats = [
            'total_paiements' => Paiement::count(),
            'total_montant' => Paiement::sum('somme_paiement'),
            'moyenne_montant' => Paiement::avg('somme_paiement'),
            'paiements_aujourd_hui' => Paiement::whereDate('date_paiement', Carbon::today())->count(),
            'montant_aujourd_hui' => Paiement::whereDate('date_paiement', Carbon::today())->sum('somme_paiement'),
        ];

        // Données pour les filtres
        $salons = Salon::all();
        $coiffeurs = Coiffeur::with('salon')->get();
        $modesPaiement = Paiement::distinct()->pluck('mode_paiement');
        $statutsPaiement = Paiement::distinct()->pluck('statut_paiement');

        // Statistiques par salon
        $statsParSalon = Salon::withCount('paiements')
            ->withSum('paiements', 'somme_paiement')
            ->get()
            ->map(function($salon) {
                return [
                    'id' => $salon->id_salon,
                    'nom' => $salon->nom,
                    'nombre_paiements' => $salon->paiements_count,
                    'montant_total' => $salon->paiements_sum_somme_paiement ?? 0,
                ];
            });

        // Statistiques par mode de paiement
        $statsParMode = Paiement::select('mode_paiement', 
            DB::raw('COUNT(*) as nombre'),
            DB::raw('SUM(somme_paiement) as montant_total'),
            DB::raw('AVG(somme_paiement) as montant_moyen'))
            ->groupBy('mode_paiement')
            ->get();

        // Statistiques par statut
        $statsParStatut = Paiement::select('statut_paiement',
            DB::raw('COUNT(*) as nombre'),
            DB::raw('SUM(somme_paiement) as montant_total'))
            ->groupBy('statut_paiement')
            ->get();

        // Données des autres tables pour l'historique complet
        $utilisateurs = User::with('salons')->get();
        $tousSalons = Salon::with(['admin', 'coiffeurs', 'clients'])->get();
        $tousCoiffeurs = Coiffeur::with(['salon', 'clients'])->get();
        $tousClients = Client::with(['salon', 'coiffeur', 'paiements'])->get();

        return Inertia::render('Historique/Index', [
            'paiements' => $paiements,
            'filters' => $filters,
            'stats' => $stats,
            'salons' => $salons,
            'coiffeurs' => $coiffeurs,
            'modesPaiement' => $modesPaiement,
            'statutsPaiement' => $statutsPaiement,
            'statsParSalon' => $statsParSalon,
            'statsParMode' => $statsParMode,
            'statsParStatut' => $statsParStatut,
            'sortBy' => $sortBy,
            'sortOrder' => $sortOrder,
            // Nouvelles données pour l'historique complet
            'utilisateurs' => $utilisateurs,
            'tousSalons' => $tousSalons,
            'tousCoiffeurs' => $tousCoiffeurs,
            'tousClients' => $tousClients,
        ]);
    }

    public function export(Request $request)
    {
        $query = Paiement::with(['client', 'salon', 'client.coiffeur']);

        // Appliquer les mêmes filtres que dans index()
        $filters = $request->only(['salon', 'coiffeur', 'client', 'mode_paiement', 'statut_paiement', 'date_debut', 'date_fin', 'montant_min', 'montant_max']);

        if (!empty($filters['salon'])) {
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

        $paiements = $query->orderBy('date_paiement', 'desc')->get();

        $filename = 'historique_paiements_' . Carbon::now()->format('Y-m-d_H-i-s') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function() use ($paiements) {
            $file = fopen('php://output', 'w');
            
            // En-têtes CSV
            fputcsv($file, [
                'ID Paiement',
                'Client',
                'Salon',
                'Coiffeur',
                'Mode de Paiement',
                'Montant',
                'Statut',
                'Date de Paiement',
                'Date de Création'
            ]);

            // Données
            foreach ($paiements as $paiement) {
                fputcsv($file, [
                    $paiement->id_paiement,
                    $paiement->client->nom ?? 'N/A',
                    $paiement->salon->nom ?? 'N/A',
                    $paiement->client->coiffeur->nom ?? 'N/A',
                    $paiement->mode_paiement,
                    $paiement->somme_paiement,
                    $paiement->statut_paiement,
                    $paiement->date_paiement->format('d/m/Y H:i'),
                    $paiement->created_at->format('d/m/Y H:i')
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
} 