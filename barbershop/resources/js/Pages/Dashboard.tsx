import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import styles from '../../css/dashboard/dashboard.module.css';
import { 
    FaUsers, 
    FaStore, 
    FaCut, 
    FaMoneyBillWave,
    FaUserPlus,
    FaCreditCard,
    FaBuilding,
    FaUserTie,
    FaChartLine,
    FaCalendarAlt,
    FaClock,
    FaArrowUp
} from 'react-icons/fa';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface StatData {
    totalClients: number;
    totalSalons: number;
    totalCoiffeurs: number;
    totalPaiements: number;
    newClients: number;
    activeClients: number;
    paiementsJour: number;
    paiementsSemaine: number;
    paiementsMois: number;
    paiementsAnnee: number;
}

interface ChartDataPoint {
    hour?: string;
    day?: string;
    month?: string;
    salons: Array<{
        salonName: string;
        activeClients: number;
        newClients: number;
        paiements: number;
    }>;
}

interface ChartData {
    hourly: ChartDataPoint[];
    daily: ChartDataPoint[];
    monthly: ChartDataPoint[];
    yearly: ChartDataPoint[];
}

interface ActivityItem {
    id: string;
    type: 'client' | 'paiement' | 'salon' | 'coiffeur';
    text: string;
    time: string;
    amount?: number;
    icon: string;
    color: string;
}

interface DashboardProps {
    stats: StatData;
    chartData: ChartData;
    recentActivities: ActivityItem[];
}

export default function Dashboard({ stats, chartData, recentActivities }: DashboardProps) {
    const [timeFilter, setTimeFilter] = useState<'jour' | 'semaine' | 'mois' | 'annee'>('jour');

    // Fonction pour obtenir les données de graphique selon le filtre
    const getChartDataByFilter = (filter: string) => {
        switch (filter) {
            case 'jour':
                return {
                    labels: chartData.hourly.map(item => item.hour || ''),
                    salons: chartData.hourly.map(item => item.salons)
                };
            case 'semaine':
                return {
                    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                    salons: chartData.daily.map(item => item.salons)
                };
            case 'mois':
                return {
                    labels: Array.from({length: 30}, (_, i) => (i + 1).toString()),
                    salons: chartData.monthly.map(item => item.salons)
                };
            case 'annee':
                return {
                    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
                    salons: chartData.yearly.map(item => item.salons)
                };
            default:
                return {
                    labels: chartData.hourly.map(item => item.hour || ''),
                    salons: chartData.hourly.map(item => item.salons)
                };
        }
    };

    const [currentChartData, setCurrentChartData] = useState(getChartDataByFilter('jour'));

    // Mettre à jour les données quand le filtre change
    useEffect(() => {
        setCurrentChartData(getChartDataByFilter(timeFilter));
    }, [timeFilter, chartData]);

    const getPaiementsByFilter = () => {
        switch (timeFilter) {
            case 'jour':
                return stats.paiementsJour;
            case 'semaine':
                return stats.paiementsSemaine;
            case 'mois':
                return stats.paiementsMois;
            case 'annee':
                return stats.paiementsAnnee;
            default:
                return stats.paiementsJour;
        }
    };

    // Fonction pour obtenir l'icône à partir du nom
    const getIconComponent = (iconName: string) => {
        const iconMap: { [key: string]: any } = {
            'FaUserPlus': FaUserPlus,
            'FaCreditCard': FaCreditCard,
            'FaBuilding': FaBuilding,
            'FaUserTie': FaUserTie,
            'FaUsers': FaUsers,
            'FaMoneyBillWave': FaMoneyBillWave
        };
        return iconMap[iconName] || FaUsers;
    };

    // Configuration des graphiques Chart.js pour les clients par salon
    const clientsChartData = {
        labels: currentChartData.labels,
        datasets: currentChartData.salons[0]?.map((salon, salonIndex) => ({
            label: `Clients Actifs - ${salon.salonName}`,
            data: currentChartData.salons.map((timeSlot, timeIndex) => 
                timeSlot[salonIndex]?.activeClients || 0
            ),
            borderColor: salonIndex === 0 ? '#800000' : 
                        salonIndex === 1 ? '#C58522' : 
                        salonIndex === 2 ? '#563737' : 
                        salonIndex === 3 ? '#4A90E2' : '#9B59B6',
            backgroundColor: salonIndex === 0 ? 'rgba(128, 0, 0, 0.1)' : 
                           salonIndex === 1 ? 'rgba(197, 133, 34, 0.1)' : 
                           salonIndex === 2 ? 'rgba(86, 55, 55, 0.1)' : 
                           salonIndex === 3 ? 'rgba(74, 144, 226, 0.1)' : 'rgba(155, 89, 182, 0.1)',
                borderWidth: 3,
            fill: false,
                tension: 0.4,
            pointBackgroundColor: salonIndex === 0 ? '#800000' : 
                                salonIndex === 1 ? '#C58522' : 
                                salonIndex === 2 ? '#563737' : 
                                salonIndex === 3 ? '#4A90E2' : '#9B59B6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
        })) || []
    };

    // Configuration des graphiques Chart.js pour les paiements par salon
    const paiementsChartData = {
        labels: currentChartData.labels,
        datasets: currentChartData.salons[0]?.map((salon, salonIndex) => ({
            label: `Paiements - ${salon.salonName}`,
            data: currentChartData.salons.map((timeSlot, timeIndex) => 
                timeSlot[salonIndex]?.paiements || 0
            ),
            borderColor: salonIndex === 0 ? '#C58522' : 
                        salonIndex === 1 ? '#800000' : 
                        salonIndex === 2 ? '#563737' : 
                        salonIndex === 3 ? '#4A90E2' : '#9B59B6',
            backgroundColor: salonIndex === 0 ? 'rgba(197, 133, 34, 0.1)' : 
                           salonIndex === 1 ? 'rgba(128, 0, 0, 0.1)' : 
                           salonIndex === 2 ? 'rgba(86, 55, 55, 0.1)' : 
                           salonIndex === 3 ? 'rgba(74, 144, 226, 0.1)' : 'rgba(155, 89, 182, 0.1)',
                borderWidth: 3,
            fill: false,
                tension: 0.4,
            pointBackgroundColor: salonIndex === 0 ? '#C58522' : 
                                salonIndex === 1 ? '#800000' : 
                                salonIndex === 2 ? '#563737' : 
                                salonIndex === 3 ? '#4A90E2' : '#9B59B6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
        })) || []
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12,
                        weight: 'bold' as const
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#563737',
                bodyColor: '#563737',
                borderColor: '#C58522',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true,
                titleFont: {
                    size: 14,
                    weight: 'bold' as const
                },
                bodyFont: {
                    size: 12
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(197, 133, 34, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    color: '#563737',
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(197, 133, 34, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    color: '#563737',
                    font: {
                        size: 11
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index' as const
        },
        elements: {
            point: {
                hoverBackgroundColor: '#C58522',
                hoverBorderColor: '#fff',
                hoverBorderWidth: 3
            }
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            
            <div className={styles.dashboardContainer}>
                {/* Header avec titre et sélecteur de période */}
                <div className={styles.dashboardHeader}>
                    <h1 className={styles.dashboardTitle}>Dashboard Analytics</h1>
                    <div className={styles.dateSelector}>
                        <button
                            className={`${styles.dateButton} ${timeFilter === 'jour' ? styles.active : ''}`}
                            onClick={() => setTimeFilter('jour')}
                        >
                            <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
                            Jour
                        </button>
                        <button
                            className={`${styles.dateButton} ${timeFilter === 'semaine' ? styles.active : ''}`}
                            onClick={() => setTimeFilter('semaine')}
                        >
                            <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
                            Semaine
                        </button>
                        <button
                            className={`${styles.dateButton} ${timeFilter === 'mois' ? styles.active : ''}`}
                            onClick={() => setTimeFilter('mois')}
                        >
                            <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
                            Mois
                        </button>
                        <button
                            className={`${styles.dateButton} ${timeFilter === 'annee' ? styles.active : ''}`}
                            onClick={() => setTimeFilter('annee')}
                        >
                            <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
                            Année
                        </button>
                    </div>
                </div>

                {/* Cartes de statistiques */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <h3 className={styles.statTitle}>TOTAL CLIENTS</h3>
                            <div className={styles.statIcon}>
                                <FaUsers />
                            </div>
                        </div>
                        <div className={styles.statValue}>{stats.totalClients.toLocaleString()}</div>
                        <div className={styles.statChange}>
                            <FaArrowUp style={{ fontSize: '0.75rem' }} />
                            +{stats.newClients} nouveaux ce mois
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <h3 className={styles.statTitle}>CLIENTS ACTIFS</h3>
                            <div className={styles.statIcon}>
                                <FaUserPlus />
                            </div>
                        </div>
                        <div className={styles.statValue}>{stats.activeClients.toLocaleString()}</div>
                        <div className={styles.statChange}>
                            <FaArrowUp style={{ fontSize: '0.75rem' }} />
                            Avec paiements récents
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <h3 className={styles.statTitle}>SALONS</h3>
                            <div className={styles.statIcon}>
                                <FaStore />
                            </div>
                        </div>
                        <div className={styles.statValue}>{stats.totalSalons}</div>
                        <div className={styles.statChange}>
                            <FaArrowUp style={{ fontSize: '0.75rem' }} />
                            +1 ce mois
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <h3 className={styles.statTitle}>COIFFEURS</h3>
                            <div className={styles.statIcon}>
                                <FaCut />
                            </div>
                        </div>
                        <div className={styles.statValue}>{stats.totalCoiffeurs}</div>
                        <div className={styles.statChange}>
                            <FaArrowUp style={{ fontSize: '0.75rem' }} />
                            +3 ce mois
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <h3 className={styles.statTitle}>PAIEMENTS ({timeFilter.toUpperCase()})</h3>
                            <div className={styles.statIcon}>
                                <FaMoneyBillWave />
                            </div>
                        </div>
                        <div className={styles.statValue}>{getPaiementsByFilter().toLocaleString()}</div>
                        <div className={styles.statChange}>
                            <FaArrowUp style={{ fontSize: '0.75rem' }} />
                            +{Math.floor(getPaiementsByFilter() * 0.15)} vs période précédente
                        </div>
                    </div>
                </div>

                {/* Graphiques */}
                <div className={styles.chartContainer}>
                    <h2 className={styles.chartTitle}>Statistiques Détaillées</h2>
                    <div className={styles.chartGrid}>
                        {/* Graphique en courbe pour les clients actifs par salon */}
                        <div className={styles.lineChartContainer}>
                            <div className={styles.lineChart}>
                                <div className={styles.lineChartCanvas}>
                                    <Line data={clientsChartData} options={chartOptions} />
                                </div>
                            </div>
                            <div className={styles.chartDescription}>
                                <h3>Clients Actifs par Salon</h3>
                                <p>Clients ayant effectué des paiements dans les 30 derniers jours</p>
                            </div>
                        </div>

                        {/* Graphique en courbe pour les paiements par salon */}
                        <div className={styles.lineChartContainer}>
                            <div className={styles.lineChart}>
                                <div className={styles.lineChartCanvas}>
                                    <Line data={paiementsChartData} options={chartOptions} />
                                </div>
                            </div>
                            <div className={styles.chartDescription}>
                                <h3>Paiements par Salon</h3>
                                <p>Nombre total de paiements créés à la période sélectionnée</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activités récentes */}
                <div className={styles.recentActivity}>
                    <h2 className={styles.activityTitle}>Activités Récentes</h2>
                    <div className={styles.activityList}>
                        {recentActivities.map((activity) => {
                            const IconComponent = getIconComponent(activity.icon);
                            return (
                                <div key={activity.id} className={styles.activityItem}>
                                    <div className={styles.activityIcon} style={{ background: `linear-gradient(135deg, ${activity.color} 0%, ${activity.color}dd 100%)` }}>
                                        <IconComponent />
                                    </div>
                                    <div className={styles.activityContent}>
                                        <div className={styles.activityText}>
                                            {activity.text}
                                            {activity.amount && (
                                                <span className={styles.activityAmount}> +{activity.amount}€</span>
                                            )}
                                        </div>
                                        <div className={styles.activityTime}>
                                            <FaClock style={{ marginRight: '0.25rem', fontSize: '0.7rem' }} />
                                            {activity.time}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
