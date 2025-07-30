import Classes from "../../../css/caissierapge/caissierpage.module.css"
import AuthenticatedCaissier from "@/Layouts/AuthenticatedLayoutcaissier"
import { Link, router } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import { 
    FaHistory, 
    FaUser, 
    FaStore, 
    FaCut, 
    FaMoneyBillWave, 
    FaCreditCard,
    FaSearch,
    FaFilter,
    FaDownload,
    FaArrowLeft,
    FaCalendarAlt,
    FaSort,
    FaSortUp,
    FaSortDown
} from 'react-icons/fa'
import { MdPayment, MdAttachMoney } from 'react-icons/md'

interface Paiement {
    id_paiement: number
    mode_paiement: string
    somme_paiement: number
    statut_paiement: string
    date_paiement: string
    created_at: string
    client: {
        id_client: number
        nom: string
        contacts: string
        coiffeur: {
            id_coiffeur: number
            nom: string
            specialite: string
        }
    }
    salon: {
        id_salon: number
        nom: string
        adresse: string
    }
}

interface Salon {
    id_salon: number
    nom: string
    adresse: string
}

interface Coiffeur {
    id_coiffeur: number
    nom: string
    specialite: string
}

interface Stats {
    total_paiements: number
    total_montant: number
    moyenne_montant: number
    paiements_aujourdhui: number
    montant_aujourdhui: number
}

interface Props {
    paiements: {
        data: Paiement[]
        current_page: number
        last_page: number
        per_page: number
        total: number
        links: any[]
    }
    stats: Stats
    salons: Salon[]
    coiffeurs: Coiffeur[]
    modesPaiement: string[]
    statutsPaiement: string[]
    filters: any
    selectedSalonId: number | null
}

export default function HistoriquePage({ 
    paiements, 
    stats, 
    salons, 
    coiffeurs, 
    modesPaiement, 
    statutsPaiement, 
    filters, 
    selectedSalonId 
}: Props) {
    const [localFilters, setLocalFilters] = useState({
        salon: filters.salon || '',
        coiffeur: filters.coiffeur || '',
        client: filters.client || '',
        mode_paiement: filters.mode_paiement || '',
        statut_paiement: filters.statut_paiement || '',
        date_debut: filters.date_debut || '',
        date_fin: filters.date_fin || '',
        montant_min: filters.montant_min || '',
        montant_max: filters.montant_max || '',
    })

    const [sortBy, setSortBy] = useState('created_at')
    const [sortOrder, setSortOrder] = useState('desc')

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

    const applyFilters = () => {
        const params = { ...localFilters, sort_by: sortBy, sort_order: sortOrder }
        if (selectedSalonId) {
            params.salon_id = selectedSalonId
        }
        router.get(route('caissier.historique'), params, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    const clearFilters = () => {
        setLocalFilters({
            salon: '',
            coiffeur: '',
            client: '',
            mode_paiement: '',
            statut_paiement: '',
            date_debut: '',
            date_fin: '',
            montant_min: '',
            montant_max: '',
        })
        setSortBy('created_at')
        setSortOrder('desc')
        
        const params = selectedSalonId ? { salon_id: selectedSalonId } : {}
        router.get(route('caissier.historique'), params, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(column)
            setSortOrder('desc')
        }
        applyFilters()
    }

    const getSortIcon = (column: string) => {
        if (sortBy !== column) return <FaSort />
        return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />
    }

    return (
        <AuthenticatedCaissier>
            <div className={Classes.caissierPage}>
                <div className={Classes.container}>
                    {/* Header */}
                    <div className={Classes.header}>
                        <div className={Classes.headerTop}>
                            <Link href={route('caissier')} className={Classes.backButton}>
                                <FaArrowLeft />
                                Retour au tableau de bord
                            </Link>
                        </div>
                        <h1>Historique des Paiements</h1>
                        <p>Consultez et filtrez l'historique complet des paiements</p>
                    </div>

                    {/* Statistiques */}
                    <div className={Classes.statsGrid}>
                        <div className={Classes.statCard}>
                            <div className={Classes.statIcon}>
                                <FaHistory />
                            </div>
                            <div className={Classes.statContent}>
                                <div className={Classes.statValue}>{stats.total_paiements}</div>
                                <div className={Classes.statLabel}>Total Paiements</div>
                            </div>
                        </div>

                        <div className={Classes.statCard}>
                            <div className={Classes.statIcon}>
                                <FaMoneyBillWave />
                            </div>
                            <div className={Classes.statContent}>
                                <div className={Classes.statValue}>{formatMontant(stats.total_montant)}</div>
                                <div className={Classes.statLabel}>Montant Total</div>
                            </div>
                        </div>

                        <div className={Classes.statCard}>
                            <div className={Classes.statIcon}>
                                <FaCreditCard />
                            </div>
                            <div className={Classes.statContent}>
                                <div className={Classes.statValue}>{formatMontant(stats.moyenne_montant)}</div>
                                <div className={Classes.statLabel}>Moyenne</div>
                            </div>
                        </div>

                        <div className={Classes.statCard}>
                            <div className={Classes.statIcon}>
                                <FaCalendarAlt />
                            </div>
                            <div className={Classes.statContent}>
                                <div className={Classes.statValue}>{stats.paiements_aujourdhui}</div>
                                <div className={Classes.statLabel}>Aujourd'hui</div>
                            </div>
                        </div>
                    </div>

                    {/* Filtres */}
                    <div className={Classes.filterSection}>
                        <div className={Classes.filterCard}>
                            <div className={Classes.filterHeader}>
                                <FaFilter />
                                <h3>Filtres de Recherche</h3>
                            </div>
                            
                            <div className={Classes.filtersGrid}>
                                <div className={Classes.filterGroup}>
                                    <label>Salon</label>
                                    <select
                                        value={localFilters.salon}
                                        onChange={(e) => setLocalFilters({...localFilters, salon: e.target.value})}
                                        className={Classes.filterSelect}
                                    >
                                        <option value="">Tous les salons</option>
                                        {salons.map(salon => (
                                            <option key={salon.id_salon} value={salon.id_salon}>
                                                {salon.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className={Classes.filterGroup}>
                                    <label>Coiffeur</label>
                                    <select
                                        value={localFilters.coiffeur}
                                        onChange={(e) => setLocalFilters({...localFilters, coiffeur: e.target.value})}
                                        className={Classes.filterSelect}
                                    >
                                        <option value="">Tous les coiffeurs</option>
                                        {coiffeurs.map(coiffeur => (
                                            <option key={coiffeur.id_coiffeur} value={coiffeur.id_coiffeur}>
                                                {coiffeur.nom} - {coiffeur.specialite}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className={Classes.filterGroup}>
                                    <label>Client</label>
                                    <input
                                        type="text"
                                        value={localFilters.client}
                                        onChange={(e) => setLocalFilters({...localFilters, client: e.target.value})}
                                        placeholder="Nom du client..."
                                        className={Classes.filterInput}
                                    />
                                </div>

                                <div className={Classes.filterGroup}>
                                    <label>Mode de Paiement</label>
                                    <select
                                        value={localFilters.mode_paiement}
                                        onChange={(e) => setLocalFilters({...localFilters, mode_paiement: e.target.value})}
                                        className={Classes.filterSelect}
                                    >
                                        <option value="">Tous les modes</option>
                                        {modesPaiement.map(mode => (
                                            <option key={mode} value={mode}>
                                                {mode}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className={Classes.filterGroup}>
                                    <label>Date de début</label>
                                    <input
                                        type="date"
                                        value={localFilters.date_debut}
                                        onChange={(e) => setLocalFilters({...localFilters, date_debut: e.target.value})}
                                        className={Classes.filterInput}
                                    />
                                </div>

                                <div className={Classes.filterGroup}>
                                    <label>Date de fin</label>
                                    <input
                                        type="date"
                                        value={localFilters.date_fin}
                                        onChange={(e) => setLocalFilters({...localFilters, date_fin: e.target.value})}
                                        className={Classes.filterInput}
                                    />
                                </div>

                                <div className={Classes.filterGroup}>
                                    <label>Montant min (FCFA)</label>
                                    <input
                                        type="number"
                                        value={localFilters.montant_min}
                                        onChange={(e) => setLocalFilters({...localFilters, montant_min: e.target.value})}
                                        placeholder="0"
                                        className={Classes.filterInput}
                                    />
                                </div>

                                <div className={Classes.filterGroup}>
                                    <label>Montant max (FCFA)</label>
                                    <input
                                        type="number"
                                        value={localFilters.montant_max}
                                        onChange={(e) => setLocalFilters({...localFilters, montant_max: e.target.value})}
                                        placeholder="1000"
                                        className={Classes.filterInput}
                                    />
                                </div>
                            </div>

                            <div className={Classes.filterActions}>
                                <button onClick={applyFilters} className={Classes.applyButton}>
                                    <FaSearch />
                                    Appliquer les filtres
                                </button>
                                <button onClick={clearFilters} className={Classes.clearButton}>
                                    Effacer les filtres
                                </button>
                                <Link href={route('caissier.historique.export')} className={Classes.exportButton}>
                                    <FaDownload />
                                    Exporter CSV
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Tableau des paiements */}
                    <div className={Classes.historiqueSection}>
                        <h2 className={Classes.historiqueTitle}>
                            <FaHistory />
                            Liste des Paiements ({paiements.total} résultats)
                        </h2>

                        {paiements.data.length > 0 ? (
                            <div className={Classes.tableContainer}>
                                <table className={Classes.historiqueTable}>
                                    <thead>
                                        <tr>
                                            <th onClick={() => handleSort('date_paiement')} className={Classes.sortableHeader}>
                                                Date {getSortIcon('date_paiement')}
                                            </th>
                                            <th>Client</th>
                                            <th>Coiffeur</th>
                                            <th>Salon</th>
                                            <th onClick={() => handleSort('somme_paiement')} className={Classes.sortableHeader}>
                                                Montant {getSortIcon('somme_paiement')}
                                            </th>
                                            <th>Mode</th>
                                            <th>Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paiements.data.map(paiement => (
                                            <tr key={paiement.id_paiement} className={Classes.tableRow}>
                                                <td>{formatDate(paiement.date_paiement)}</td>
                                                <td>
                                                    <div className={Classes.clientInfo}>
                                                        <FaUser />
                                                        <span>{paiement.client.nom}</span>
                                                        {paiement.client.contacts && (
                                                            <small>{paiement.client.contacts}</small>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={Classes.coiffeurInfo}>
                                                        <FaCut />
                                                        <span>{paiement.client.coiffeur.nom}</span>
                                                        <small>{paiement.client.coiffeur.specialite}</small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={Classes.salonInfo}>
                                                        <FaStore />
                                                        <span>{paiement.salon.nom}</span>
                                                        <small>{paiement.salon.adresse}</small>
                                                    </div>
                                                </td>
                                                <td className={Classes.montantCell}>
                                                    {formatMontant(paiement.somme_paiement)}
                                                </td>
                                                <td>
                                                    <span className={`${Classes.modePaiement} ${Classes.modePaiement[paiement.mode_paiement as keyof typeof Classes.modePaiement]}`}>
                                                        {getModePaiementIcon(paiement.mode_paiement)}
                                                        {paiement.mode_paiement}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`${Classes.statutPaiement} ${Classes.statutPaiement[paiement.statut_paiement as keyof typeof Classes.statutPaiement]}`}>
                                                        {paiement.statut_paiement}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className={Classes.emptyState}>
                                <FaHistory size={64} />
                                <p>Aucun paiement trouvé avec ces critères</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {paiements.last_page > 1 && (
                            <div className={Classes.pagination}>
                                {paiements.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`${Classes.paginationLink} ${link.active ? Classes.activePage : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedCaissier>
    )
} 