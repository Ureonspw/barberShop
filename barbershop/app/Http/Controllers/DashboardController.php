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

class DashboardController extends Controller
{
    public function index()
    {
        // Statistiques générales
        $stats = [
            'totalClients' => Client::count(),
            'totalSalons' => Salon::count(),
            'totalCoiffeurs' => Coiffeur::count(),
            'totalPaiements' => Paiement::count(),
        ];

        // Calculer les clients actifs vs nouveaux
        $now = Carbon::now();
        $thirtyDaysAgo = $now->copy()->subDays(30);
        $sevenDaysAgo = $now->copy()->subDays(7);

        // Nouveaux clients (créés dans les 7 derniers jours)
        $newClients = Client::where('created_at', '>=', $sevenDaysAgo)->count();
        
        // Clients actifs (ont fait des paiements dans les 30 derniers jours)
        $activeClients = Client::whereHas('paiements', function($query) use ($thirtyDaysAgo) {
            $query->where('created_at', '>=', $thirtyDaysAgo);
        })->count();

        $stats['newClients'] = $newClients;
        $stats['activeClients'] = $activeClients;

        // Paiements par période avec des données plus réalistes
        $stats['paiementsJour'] = Paiement::whereDate('created_at', $now->toDateString())->count();
        $stats['paiementsSemaine'] = Paiement::whereBetween('created_at', [
            $now->startOfWeek(),
            $now->endOfWeek()
        ])->count();
        $stats['paiementsMois'] = Paiement::whereMonth('created_at', $now->month)
            ->whereYear('created_at', $now->year)
            ->count();
        $stats['paiementsAnnee'] = Paiement::whereYear('created_at', $now->year)->count();

        // Données pour les graphiques par salon
        $chartData = $this->getChartDataBySalon();

        // Activités récentes
        $recentActivities = $this->getRecentActivities();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'chartData' => $chartData,
            'recentActivities' => $recentActivities
        ]);
    }

    private function getChartDataBySalon()
    {
        $now = Carbon::now();
        $salons = Salon::all();
        
        // Données pour les 24 dernières heures par salon
        $hourlyData = [];
        for ($i = 0; $i < 24; $i++) {
            $hour = Carbon::createFromTime($i, 0, 0);
            $hourlyData[] = [
                'hour' => $hour->format('H:i'),
                'salons' => $salons->map(function($salon) use ($hour, $now) {
                    $thirtyDaysAgo = $now->copy()->subDays(30);
                    $sevenDaysAgo = $now->copy()->subDays(7);
                    
                    return [
                        'salonName' => $salon->nom,
                        'activeClients' => Client::where('id_salon', $salon->id_salon)
                            ->whereHas('paiements', function($query) use ($hour, $thirtyDaysAgo) {
                                $query->whereRaw('HOUR(created_at) = ?', [$hour->hour])
                                    ->where('created_at', '>=', $thirtyDaysAgo);
                            })->count(),
                        'newClients' => Client::where('id_salon', $salon->id_salon)
                            ->whereRaw('HOUR(created_at) = ?', [$hour->hour])
                            ->where('created_at', '>=', $sevenDaysAgo)
                            ->count(),
                        'paiements' => Paiement::where('id_salon', $salon->id_salon)
                            ->whereRaw('HOUR(created_at) = ?', [$hour->hour])
                            ->count()
                    ];
                })->toArray()
            ];
        }

        // Données pour les 7 derniers jours par salon
        $dailyData = [];
        for ($i = 0; $i < 7; $i++) {
            $day = $now->copy()->subDays(6 - $i);
            $dailyData[] = [
                'day' => $day->format('D'),
                'salons' => $salons->map(function($salon) use ($day, $now) {
                    $thirtyDaysAgo = $now->copy()->subDays(30);
                    $sevenDaysAgo = $now->copy()->subDays(7);
                    
                    return [
                        'salonName' => $salon->nom,
                        'activeClients' => Client::where('id_salon', $salon->id_salon)
                            ->whereHas('paiements', function($query) use ($day, $thirtyDaysAgo) {
                                $query->whereDate('created_at', $day->toDateString())
                                    ->where('created_at', '>=', $thirtyDaysAgo);
                            })->count(),
                        'newClients' => Client::where('id_salon', $salon->id_salon)
                            ->whereDate('created_at', $day->toDateString())
                            ->where('created_at', '>=', $sevenDaysAgo)
                            ->count(),
                        'paiements' => Paiement::where('id_salon', $salon->id_salon)
                            ->whereDate('created_at', $day->toDateString())
                            ->count()
                    ];
                })->toArray()
            ];
        }

        // Données pour les 30 derniers jours par salon
        $monthlyData = [];
        for ($i = 0; $i < 30; $i++) {
            $day = $now->copy()->subDays(29 - $i);
            $monthlyData[] = [
                'day' => $day->format('d'),
                'salons' => $salons->map(function($salon) use ($day, $now) {
                    $thirtyDaysAgo = $now->copy()->subDays(30);
                    $sevenDaysAgo = $now->copy()->subDays(7);
                    
                    return [
                        'salonName' => $salon->nom,
                        'activeClients' => Client::where('id_salon', $salon->id_salon)
                            ->whereHas('paiements', function($query) use ($day, $thirtyDaysAgo) {
                                $query->whereDate('created_at', $day->toDateString())
                                    ->where('created_at', '>=', $thirtyDaysAgo);
                            })->count(),
                        'newClients' => Client::where('id_salon', $salon->id_salon)
                            ->whereDate('created_at', $day->toDateString())
                            ->where('created_at', '>=', $sevenDaysAgo)
                            ->count(),
                        'paiements' => Paiement::where('id_salon', $salon->id_salon)
                            ->whereDate('created_at', $day->toDateString())
                            ->count()
                    ];
                })->toArray()
            ];
        }

        // Données pour les 12 derniers mois par salon
        $yearlyData = [];
        for ($i = 0; $i < 12; $i++) {
            $month = $now->copy()->subMonths(11 - $i);
            $yearlyData[] = [
                'month' => $month->format('M'),
                'salons' => $salons->map(function($salon) use ($month, $now) {
                    $thirtyDaysAgo = $now->copy()->subDays(30);
                    $sevenDaysAgo = $now->copy()->subDays(7);
                    
                    return [
                        'salonName' => $salon->nom,
                        'activeClients' => Client::where('id_salon', $salon->id_salon)
                            ->whereHas('paiements', function($query) use ($month, $thirtyDaysAgo) {
                                $query->whereMonth('created_at', $month->month)
                                    ->whereYear('created_at', $month->year)
                                    ->where('created_at', '>=', $thirtyDaysAgo);
                            })->count(),
                        'newClients' => Client::where('id_salon', $salon->id_salon)
                            ->whereMonth('created_at', $month->month)
                            ->whereYear('created_at', $month->year)
                            ->where('created_at', '>=', $sevenDaysAgo)
                            ->count(),
                        'paiements' => Paiement::where('id_salon', $salon->id_salon)
                            ->whereMonth('created_at', $month->month)
                            ->whereYear('created_at', $month->year)
                            ->count()
                    ];
                })->toArray()
            ];
        }

        return [
            'hourly' => $hourlyData,
            'daily' => $dailyData,
            'monthly' => $monthlyData,
            'yearly' => $yearlyData
        ];
    }

    private function getRecentActivities()
    {
        $activities = [];
        $now = Carbon::now();
        $sevenDaysAgo = $now->copy()->subDays(7);

        // Derniers clients avec distinction nouveau/actif
        $recentClients = Client::with(['salon', 'coiffeur'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        foreach ($recentClients as $client) {
            $isNewClient = $client->created_at >= $sevenDaysAgo;
            $activities[] = [
                'id' => 'client_' . $client->id_client,
                'type' => 'client',
                'text' => $isNewClient ? "Nouveau client: {$client->nom}" : "Client fidèle: {$client->nom}",
                'time' => $client->created_at->diffForHumans(),
                'amount' => null,
                'icon' => $isNewClient ? 'FaUserPlus' : 'FaUsers',
                'color' => $isNewClient ? '#800000' : '#563737'
            ];
        }

        // Derniers paiements
        $recentPaiements = Paiement::with(['client', 'salon'])
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        foreach ($recentPaiements as $paiement) {
            $activities[] = [
                'id' => 'paiement_' . $paiement->id_paiement,
                'type' => 'paiement',
                'text' => "Paiement {$paiement->mode_paiement} - {$paiement->client->nom}",
                'time' => $paiement->created_at->diffForHumans(),
                'amount' => $paiement->somme_paiement,
                'icon' => 'FaCreditCard',
                'color' => '#C58522'
            ];
        }

        // Derniers salons
        $recentSalons = Salon::orderBy('created_at', 'desc')
            ->limit(2)
            ->get();

        foreach ($recentSalons as $salon) {
            $activities[] = [
                'id' => 'salon_' . $salon->id_salon,
                'type' => 'salon',
                'text' => "Nouveau salon: {$salon->nom}",
                'time' => $salon->created_at->diffForHumans(),
                'amount' => null,
                'icon' => 'FaBuilding',
                'color' => '#563737'
            ];
        }

        // Derniers coiffeurs
        $recentCoiffeurs = Coiffeur::with('salon')
            ->orderBy('created_at', 'desc')
            ->limit(2)
            ->get();

        foreach ($recentCoiffeurs as $coiffeur) {
            $activities[] = [
                'id' => 'coiffeur_' . $coiffeur->id_coiffeur,
                'type' => 'coiffeur',
                'text' => "Nouveau coiffeur: {$coiffeur->nom} - {$coiffeur->salon->nom}",
                'time' => $coiffeur->created_at->diffForHumans(),
                'amount' => null,
                'icon' => 'FaUserTie',
                'color' => '#800000'
            ];
        }

        // Trier par date et prendre les 6 plus récents
        usort($activities, function($a, $b) {
            return strtotime($a['time']) - strtotime($b['time']);
        });

        return array_slice($activities, 0, 6);
    }
} 