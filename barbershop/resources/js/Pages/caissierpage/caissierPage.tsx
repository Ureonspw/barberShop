import Classes from "../../../css/caissierapge/caissierpage.module.css"
import AuthenticatedCaissier from "@/Layouts/AuthenticatedLayoutcaissier"
import { Link, router } from '@inertiajs/react'
import { 
    FaCreditCard, 
    FaHistory, 
    FaUser, 
    FaPhone, 
    FaMoneyBillWave, 
    FaStore, 
    FaCut, 
    FaSearch,
    FaCheckCircle,
    FaExclamationTriangle,
    FaChartLine,
    FaCalendarDay,
    FaCalendarWeek,
    FaCalendarAlt,
    FaUsers,
    FaTrophy,
    FaArrowRight,
    FaFilter
} from 'react-icons/fa'
import { MdPayment, MdAttachMoney, MdTrendingUp } from 'react-icons/md'

interface Salon {
    id_salon: number
    nom: string
    adresse: string
    coiffeurs: Coiffeur[]
}

interface Coiffeur {
    id_coiffeur: number
    nom: string
    specialite: string
    id_salon: number
}

interface Paiement {
    id_paiement: number
    mode_paiement: string
    somme_paiement: number
    statut_paiement: string
    date_paiement: string
    client: {
        id_client: number
        nom: string
        contacts: string
        coiffeur: {
            id_coiffeur: number
            nom: string
        }
    }
    salon: {
        id_salon: number
        nom: string
    }
}

interface TopCoiffeur {
    id_coiffeur: number
    total_clients: number
    coiffeur: {
        id_coiffeur: number
        nom: string
        specialite: string
    }
}

interface Stats {
    aujourdhui: {
        paiements: number
        montant: number
        clients: number
    }
    semaine: {
        paiements: number
        montant: number
    }
    mois: {
        paiements: number
        montant: number
    }
}

interface Props {
    stats: Stats
    recentPaiements: Paiement[]
    topCoiffeurs: TopCoiffeur[]
    salons: Salon[]
    selectedSalonId: number | null
}

export default function CaissierPage({ stats, recentPaiements, topCoiffeurs, salons, selectedSalonId }: Props) {
    const formatMontant = (montant: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF'
        }).format(montant)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getModePaiementIcon = (mode: string) => {
        switch (mode) {
            case 'especes':
                return <MdAttachMoney />
            case 'carte':
                return <FaCreditCard />
            case 'cheque':
                return <MdPayment />
            default:
                return <FaCreditCard />
        }
    }

    const handleSalonFilter = (salonId: string) => {
        if (salonId) {
            router.get(route('caissier'), { salon_id: salonId }, {
                preserveState: true,
                preserveScroll: true,
            })
        } else {
            router.get(route('caissier'), {}, {
                preserveState: true,
                preserveScroll: true,
            })
        }
    }

    const getSelectedSalonName = () => {
        if (!selectedSalonId) return "Tous les salons"
        const salon = salons.find(s => s.id_salon === selectedSalonId)
        return salon ? salon.nom : "Tous les salons"
    }

    const fonctionnalites = [
        {
            titre: "Nouveau Paiement",
            description: "Traiter un nouveau paiement pour un client",
            icone: <FaCreditCard />,
            lien: route('caissier.paiement.page'),
            couleur: "#ffaa2a"
        },
        {
            titre: "Historique",
            description: "Consulter l'historique des paiements",
            icone: <FaHistory />,
            lien: route('caissier.historique'),
            couleur: "#28a745"
        },
        // {
        //     titre: "Gestion Clients",
        //     description: "Rechercher et gérer les clients",
        //     icone: <FaUsers />,
        //     lien: "#",
        //     couleur: "#17a2b8"
        // },
        // {
        //     titre: "Statistiques",
        //     description: "Voir les statistiques détaillées",
        //     icone: <FaChartLine />,
        //     lien: "#",
        //     couleur: "#6f42c1"
        // }
    ]

    return (
        <AuthenticatedCaissier>
            <div className={Classes.caissierPage}>
                <div className={Classes.container}>
                    {/* Header */}
                    <div className={Classes.header}>
                        <h1>Tableau de Bord - Caissier</h1>
                        <p>Bienvenue ! Gérez vos paiements et suivez vos performances</p>
                    </div>

                    {/* Filtre par salon */}
                    <div className={Classes.filterSection}>
                        <div className={Classes.filterCard}>
                            <div className={Classes.filterHeader}>
                                <FaFilter />
                                <h3>Filtrer par Salon</h3>
                            </div>
                            <div className={Classes.filterContent}>
                                <select
                                    className={Classes.filterSelect}
                                    value={selectedSalonId || ''}
                                    onChange={(e) => handleSalonFilter(e.target.value)}
                                >
                                    <option value="">Tous les salons</option>
                                    {salons.map(salon => (
                                        <option key={salon.id_salon} value={salon.id_salon}>
                                            {salon.nom} - {salon.adresse}
                                        </option>
                                    ))}
                                </select>
                                <div className={Classes.filterInfo}>
                                    <FaStore />
                                    <span>Statistiques pour : <strong>{getSelectedSalonName()}</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statistiques principales */}
                    <div className={Classes.statsGrid}>
                        <div className={Classes.statCard}>
                            <div className={Classes.statIcon}>
                                <FaCalendarDay />
                            </div>
                            <div className={Classes.statContent}>
                                <div className={Classes.statValue}>{stats.aujourdhui.paiements}</div>
                                <div className={Classes.statLabel}>Paiements Aujourd'hui</div>
                            </div>
                        </div>

                        <div className={Classes.statCard}>
                            <div className={Classes.statIcon}>
                                <FaMoneyBillWave />
                            </div>
                            <div className={Classes.statContent}>
                                <div className={Classes.statValue}>{formatMontant(stats.aujourdhui.montant)}</div>
                                <div className={Classes.statLabel}>Chiffre d'Affaires</div>
                            </div>
                        </div>

                        <div className={Classes.statCard}>
                            <div className={Classes.statIcon}>
                                <FaUsers />
                            </div>
                            <div className={Classes.statContent}>
                                <div className={Classes.statValue}>{stats.aujourdhui.clients}</div>
                                <div className={Classes.statLabel}>Nouveaux Clients</div>
                            </div>
                        </div>

                        <div className={Classes.statCard}>
                            <div className={Classes.statIcon}>
                                <MdTrendingUp />
                            </div>
                            <div className={Classes.statContent}>
                                <div className={Classes.statValue}>{formatMontant(stats.semaine.montant)}</div>
                                <div className={Classes.statLabel}>CA de la Semaine</div>
                            </div>
                        </div>
                    </div>

                    {/* Fonctionnalités principales */}
                    <div className={Classes.fonctionnalitesSection}>
                        <h2 className={Classes.sectionTitle}>
                            <FaCreditCard />
                            Fonctionnalités Principales
                        </h2>
                        
                        <div className={Classes.fonctionnalitesGrid}>
                            {fonctionnalites.map((fonctionnalite, index) => (
                                <Link 
                                    key={index} 
                                    href={fonctionnalite.lien}
                                    className={Classes.fonctionnaliteCard}
                                    style={{ '--couleur': fonctionnalite.couleur } as React.CSSProperties}
                                >
                                    <div className={Classes.fonctionnaliteIcon}>
                                        {fonctionnalite.icone}
                                    </div>
                                    <div className={Classes.fonctionnaliteContent}>
                                        <h3>{fonctionnalite.titre}</h3>
                                        <p>{fonctionnalite.description}</p>
                                    </div>
                                    <div className={Classes.fonctionnaliteArrow}>
                                        <FaArrowRight />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contenu en deux colonnes */}
                    <div className={Classes.content}>
                        {/* Derniers paiements */}
                        <div className={Classes.historiqueSection}>
                            <h2 className={Classes.historiqueTitle}>
                                <FaHistory />
                                Derniers Paiements
                            </h2>
                            
                            {recentPaiements.length > 0 ? (
                                recentPaiements.map(paiement => (
                                    <div key={paiement.id_paiement} className={Classes.paiementCard}>
                                        <div className={Classes.paiementHeader}>
                                            <span className={Classes.clientName}>
                                                <FaUser style={{ marginRight: '5px' }} />
                                                {paiement.client.nom}
                                            </span>
                                            <span className={Classes.montant}>
                                                {formatMontant(paiement.somme_paiement)}
                                            </span>
                                        </div>
                                        
                                        <div className={Classes.paiementDetails}>
                                            <div>
                                                <FaCut style={{ marginRight: '5px' }} />
                                                <strong>Coiffeur:</strong> {paiement.client.coiffeur.nom}
                                            </div>
                                            <div>
                                                <FaStore style={{ marginRight: '5px' }} />
                                                <strong>Salon:</strong> {paiement.salon.nom}
                                            </div>
                                            <div>
                                                <FaHistory style={{ marginRight: '5px' }} />
                                                <strong>Date:</strong> {formatDate(paiement.date_paiement)}
                                            </div>
                                            <div>
                                                <span className={`${Classes.modePaiement} ${Classes.modePaiement[paiement.mode_paiement as keyof typeof Classes.modePaiement]}`}>
                                                    {getModePaiementIcon(paiement.mode_paiement)}
                                                    {paiement.mode_paiement}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={Classes.emptyState}>
                                    <FaHistory size={64} />
                                    <p>Aucun paiement récent</p>
                                </div>
                            )}
                        </div>

                        {/* Top coiffeurs et salons */}
                        <div className={Classes.historiqueSection}>
                            <h2 className={Classes.historiqueTitle}>
                                <FaTrophy />
                                Top Coiffeurs du Jour
                            </h2>
                            
                            {topCoiffeurs.length > 0 ? (
                                <div className={Classes.topCoiffeursList}>
                                    {topCoiffeurs.map((topCoiffeur, index) => (
                                        <div key={topCoiffeur.id_coiffeur} className={Classes.topCoiffeurCard}>
                                            <div className={Classes.topCoiffeurRank}>
                                                #{index + 1}
                                            </div>
                                            <div className={Classes.topCoiffeurInfo}>
                                                <h4>{topCoiffeur.coiffeur.nom}</h4>
                                                <p>{topCoiffeur.coiffeur.specialite}</p>
                                            </div>
                                            <div className={Classes.topCoiffeurStats}>
                                                <span className={Classes.topCoiffeurClients}>
                                                    {topCoiffeur.total_clients} clients
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={Classes.emptyState}>
                                    <FaCut size={64} />
                                    <p>Aucun coiffeur actif aujourd'hui</p>
                                </div>
                            )}

                            <div className={Classes.salonsSection}>
                                <h3 className={Classes.salonsTitle}>
                                    <FaStore />
                                    Salons Disponibles
                                </h3>
                                <div className={Classes.salonsList}>
                                    {salons.map(salon => (
                                        <div key={salon.id_salon} className={Classes.salonCard}>
                                            <h4>{salon.nom}</h4>
                                            <p>{salon.adresse}</p>
                                            <span className={Classes.salonCoiffeurs}>
                                                {salon.coiffeurs.length} coiffeur(s)
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedCaissier>
    )
}