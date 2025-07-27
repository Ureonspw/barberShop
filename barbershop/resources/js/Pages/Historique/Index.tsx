import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaDownload, FaFilter, FaSearch, FaSort, FaSortUp, FaSortDown, FaUsers, FaCut, FaStore, FaUserTie } from 'react-icons/fa';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import styles from '@/css/historique/historique.module.css';

interface Paiement {
    id_paiement: number;
    mode_paiement: string;
    somme_paiement: number;
    statut_paiement: string;
    date_paiement: string;
    client: {
        nom: string;
        coiffeur: {
            nom: string;
        };
    };
    salon: {
        nom: string;
    };
}

interface Salon {
    id_salon: number;
    nom: string;
}

interface Coiffeur {
    id_coiffeur: number;
    nom: string;
    salon: {
        nom: string;
    };
}

// Nouvelles interfaces pour l'historique complet
interface User {
    id_user: number;
    name: string;
    email: string;
    role: string;
    salons?: Salon[];
}

interface SalonComplet {
    id_salon: number;
    nom: string;
    adresse: string;
    id_admin: number;
    admin?: User;
    coiffeurs?: CoiffeurComplet[];
    clients?: ClientComplet[];
}

interface CoiffeurComplet {
    id_coiffeur: number;
    nom: string;
    specialite: string;
    disponibilite: string;
    id_salon: number;
    salon?: SalonComplet;
    clients?: ClientComplet[];
}

interface ClientComplet {
    id_client: number;
    nom: string;
    contacts: string;
    id_salon: number;
    id_coiffeur: number;
    date_coiffure: string;
    salon?: SalonComplet;
    coiffeur?: CoiffeurComplet;
    paiements?: Paiement[];
}

interface Stats {
    total_paiements: number;
    total_montant: number;
    moyenne_montant: number;
    paiements_aujourd_hui: number;
    montant_aujourd_hui: number;
}

interface StatsParSalon {
    id: number;
    nom: string;
    nombre_paiements: number;
    montant_total: number;
}

interface StatsParMode {
    mode_paiement: string;
    nombre: number;
    montant_total: number;
    montant_moyen: number;
}

interface StatsParStatut {
    statut_paiement: string;
    nombre: number;
    montant_total: number;
}

interface HistoriqueProps {
    paiements: {
        data: Paiement[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: any;
    stats: Stats;
    salons: Salon[];
    coiffeurs: Coiffeur[];
    modesPaiement: string[];
    statutsPaiement: string[];
    statsParSalon: StatsParSalon[];
    statsParMode: StatsParMode[];
    statsParStatut: StatsParStatut[];
    sortBy: string;
    sortOrder: string;
    // Nouvelles données pour l'historique complet
    utilisateurs: User[];
    tousSalons: SalonComplet[];
    tousCoiffeurs: CoiffeurComplet[];
    tousClients: ClientComplet[];
}

export default function HistoriqueIndex({
    paiements,
    filters,
    stats,
    salons,
    coiffeurs,
    modesPaiement,
    statutsPaiement,
    statsParSalon,
    statsParMode,
    statsParStatut,
    sortBy,
    sortOrder,
    utilisateurs,
    tousSalons,
    tousCoiffeurs,
    tousClients,
}: HistoriqueProps) {
    const [localFilters, setLocalFilters] = useState(filters);
    const [showFilters, setShowFilters] = useState(false);
    const [showStats, setShowStats] = useState(true);
    const [activeTab, setActiveTab] = useState('paiements');

    const applyFilters = () => {
        router.get(route('historique'), localFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setLocalFilters({});
        router.get(route('historique'), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSort = (column: string) => {
        const newOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
        router.get(route('historique'), { ...localFilters, sort_by: column, sort_order: newOrder }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const exportData = () => {
        const params = new URLSearchParams(localFilters);
        window.open(`${route('historique.export')}?${params.toString()}`, '_blank');
    };

    const getSortIcon = (column: string) => {
        if (sortBy !== column) return <FaSort className="text-gray-400" />;
        return sortOrder === 'asc' ? <FaSortUp className="text-blue-600" /> : <FaSortDown className="text-blue-600" />;
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: fr });
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-red-100 text-red-800';
            case 'caissier': return 'bg-blue-100 text-blue-800';
            case 'coiffeur': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Historique Complet
                </h2>
            }
        >
            <Head title="Historique" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Statistiques générales */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Statistiques Générales</h3>
                                <button
                                    onClick={() => setShowStats(!showStats)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    {showStats ? 'Masquer' : 'Afficher'}
                                </button>
                            </div>
                            
                            {showStats && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="text-sm font-medium text-blue-600">Total Paiements</div>
                                        <div className="text-2xl font-bold text-blue-900">{stats.total_paiements}</div>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <div className="text-sm font-medium text-green-600">Montant Total</div>
                                        <div className="text-2xl font-bold text-green-900">{formatCurrency(stats.total_montant)}</div>
                                    </div>
                                    <div className="bg-yellow-50 p-4 rounded-lg">
                                        <div className="text-sm font-medium text-yellow-600">Moyenne</div>
                                        <div className="text-2xl font-bold text-yellow-900">{formatCurrency(stats.moyenne_montant)}</div>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <div className="text-sm font-medium text-purple-600">Aujourd'hui</div>
                                        <div className="text-2xl font-bold text-purple-900">{stats.paiements_aujourd_hui}</div>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-lg">
                                        <div className="text-sm font-medium text-red-600">Montant Aujourd'hui</div>
                                        <div className="text-2xl font-bold text-red-900">{formatCurrency(stats.montant_aujourd_hui)}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Onglets de navigation */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8 px-6">
                                <button
                                    onClick={() => setActiveTab('paiements')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === 'paiements'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Paiements
                                </button>
                                <button
                                    onClick={() => setActiveTab('utilisateurs')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === 'utilisateurs'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <FaUsers className="inline mr-2" />
                                    Utilisateurs
                                </button>
                                <button
                                    onClick={() => setActiveTab('salons')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === 'salons'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <FaStore className="inline mr-2" />
                                    Salons
                                </button>
                                <button
                                    onClick={() => setActiveTab('coiffeurs')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === 'coiffeurs'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <FaCut className="inline mr-2" />
                                    Coiffeurs
                                </button>
                                <button
                                    onClick={() => setActiveTab('clients')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === 'clients'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <FaUserTie className="inline mr-2" />
                                    Clients
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Contenu des onglets */}
                    {activeTab === 'paiements' && (
                        <>
                            {/* Filtres */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setShowFilters(!showFilters)}
                                                className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                                            >
                                                <FaFilter className="mr-2" />
                                                {showFilters ? 'Masquer' : 'Afficher'} Filtres
                                            </button>
                                            <button
                                                onClick={exportData}
                                                className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                            >
                                                <FaDownload className="mr-2" />
                                                Exporter
                                            </button>
                                        </div>
                                    </div>

                                    {showFilters && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Salon</label>
                                                <select
                                                    value={localFilters.salon || ''}
                                                    onChange={(e) => setLocalFilters({ ...localFilters, salon: e.target.value })}
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                >
                                                    <option value="">Tous les salons</option>
                                                    {salons.map((salon) => (
                                                        <option key={salon.id_salon} value={salon.id_salon}>
                                                            {salon.nom}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Coiffeur</label>
                                                <select
                                                    value={localFilters.coiffeur || ''}
                                                    onChange={(e) => setLocalFilters({ ...localFilters, coiffeur: e.target.value })}
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                >
                                                    <option value="">Tous les coiffeurs</option>
                                                    {coiffeurs.map((coiffeur) => (
                                                        <option key={coiffeur.id_coiffeur} value={coiffeur.id_coiffeur}>
                                                            {coiffeur.nom} - {coiffeur.salon.nom}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Mode de Paiement</label>
                                                <select
                                                    value={localFilters.mode_paiement || ''}
                                                    onChange={(e) => setLocalFilters({ ...localFilters, mode_paiement: e.target.value })}
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                >
                                                    <option value="">Tous les modes</option>
                                                    {modesPaiement.map((mode) => (
                                                        <option key={mode} value={mode}>
                                                            {mode}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                                                <select
                                                    value={localFilters.statut_paiement || ''}
                                                    onChange={(e) => setLocalFilters({ ...localFilters, statut_paiement: e.target.value })}
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                >
                                                    <option value="">Tous les statuts</option>
                                                    {statutsPaiement.map((statut) => (
                                                        <option key={statut} value={statut}>
                                                            {statut}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                                                <input
                                                    type="text"
                                                    value={localFilters.client || ''}
                                                    onChange={(e) => setLocalFilters({ ...localFilters, client: e.target.value })}
                                                    placeholder="Rechercher un client..."
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                                                <input
                                                    type="date"
                                                    value={localFilters.date_debut || ''}
                                                    onChange={(e) => setLocalFilters({ ...localFilters, date_debut: e.target.value })}
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                                                <input
                                                    type="date"
                                                    value={localFilters.date_fin || ''}
                                                    onChange={(e) => setLocalFilters({ ...localFilters, date_fin: e.target.value })}
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Montant min</label>
                                                <input
                                                    type="number"
                                                    value={localFilters.montant_min || ''}
                                                    onChange={(e) => setLocalFilters({ ...localFilters, montant_min: e.target.value })}
                                                    placeholder="0"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Montant max</label>
                                                <input
                                                    type="number"
                                                    value={localFilters.montant_max || ''}
                                                    onChange={(e) => setLocalFilters({ ...localFilters, montant_max: e.target.value })}
                                                    placeholder="1000"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {showFilters && (
                                        <div className="flex justify-end space-x-2 mt-4">
                                            <button
                                                onClick={clearFilters}
                                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                            >
                                                Effacer
                                            </button>
                                            <button
                                                onClick={applyFilters}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            >
                                                Appliquer
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tableau des paiements */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Paiements ({paiements.total} résultats)
                                        </h3>
                                        <div className="text-sm text-gray-500">
                                            Page {paiements.current_page} sur {paiements.last_page}
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('id_paiement')}>
                                                        <div className="flex items-center">
                                                            ID {getSortIcon('id_paiement')}
                                                        </div>
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('client.nom')}>
                                                        <div className="flex items-center">
                                                            Client {getSortIcon('client.nom')}
                                                        </div>
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('salon.nom')}>
                                                        <div className="flex items-center">
                                                            Salon {getSortIcon('salon.nom')}
                                                        </div>
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                                        <div className="flex items-center">
                                                            Coiffeur
                                                        </div>
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('mode_paiement')}>
                                                        <div className="flex items-center">
                                                            Mode {getSortIcon('mode_paiement')}
                                                        </div>
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('somme_paiement')}>
                                                        <div className="flex items-center">
                                                            Montant {getSortIcon('somme_paiement')}
                                                        </div>
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('statut_paiement')}>
                                                        <div className="flex items-center">
                                                            Statut {getSortIcon('statut_paiement')}
                                                        </div>
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('date_paiement')}>
                                                        <div className="flex items-center">
                                                            Date {getSortIcon('date_paiement')}
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {paiements.data.map((paiement) => (
                                                    <tr key={paiement.id_paiement} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            #{paiement.id_paiement}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {paiement.client.nom}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {paiement.salon.nom}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {paiement.client.coiffeur?.nom || 'N/A'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                                paiement.mode_paiement === 'espèce' ? 'bg-green-100 text-green-800' :
                                                                paiement.mode_paiement === 'carte' ? 'bg-blue-100 text-blue-800' :
                                                                paiement.mode_paiement === 'chèque' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-purple-100 text-purple-800'
                                                            }`}>
                                                                {paiement.mode_paiement}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {formatCurrency(paiement.somme_paiement)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                                paiement.statut_paiement === 'validé' ? 'bg-green-100 text-green-800' :
                                                                paiement.statut_paiement === 'en attente' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'
                                                            }`}>
                                                                {paiement.statut_paiement}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {formatDate(paiement.date_paiement)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {paiements.last_page > 1 && (
                                        <div className="flex items-center justify-between mt-6">
                                            <div className="text-sm text-gray-700">
                                                Affichage de {((paiements.current_page - 1) * paiements.per_page) + 1} à {Math.min(paiements.current_page * paiements.per_page, paiements.total)} sur {paiements.total} résultats
                                            </div>
                                            <div className="flex space-x-2">
                                                {paiements.current_page > 1 && (
                                                    <Link
                                                        href={route('historique', { ...localFilters, page: paiements.current_page - 1 })}
                                                        className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Précédent
                                                    </Link>
                                                )}
                                                {paiements.current_page < paiements.last_page && (
                                                    <Link
                                                        href={route('historique', { ...localFilters, page: paiements.current_page + 1 })}
                                                        className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Suivant
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Onglet Utilisateurs */}
                    {activeTab === 'utilisateurs' && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Utilisateurs ({utilisateurs.length} utilisateurs)
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salons gérés</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {utilisateurs.map((user) => (
                                                <tr key={user.id_user} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        #{user.id_user}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {user.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {user.email}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {user.salons?.length || 0} salon(s)
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Onglet Salons */}
                    {activeTab === 'salons' && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Salons ({tousSalons.length} salons)
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Administrateur</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coiffeurs</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clients</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {tousSalons.map((salon) => (
                                                <tr key={salon.id_salon} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        #{salon.id_salon}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {salon.nom}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {salon.adresse}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {salon.admin?.name || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {salon.coiffeurs?.length || 0} coiffeur(s)
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {salon.clients?.length || 0} client(s)
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Onglet Coiffeurs */}
                    {activeTab === 'coiffeurs' && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Coiffeurs ({tousCoiffeurs.length} coiffeurs)
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spécialité</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disponibilité</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salon</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clients</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {tousCoiffeurs.map((coiffeur) => (
                                                <tr key={coiffeur.id_coiffeur} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        #{coiffeur.id_coiffeur}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {coiffeur.nom}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {coiffeur.specialite}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                            coiffeur.disponibilite === 'disponible' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {coiffeur.disponibilite}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {coiffeur.salon?.nom || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {coiffeur.clients?.length || 0} client(s)
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Onglet Clients */}
                    {activeTab === 'clients' && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Clients ({tousClients.length} clients)
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacts</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salon</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coiffeur</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de coiffure</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paiements</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {tousClients.map((client) => (
                                                <tr key={client.id_client} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        #{client.id_client}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {client.nom}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {client.contacts}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {client.salon?.nom || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {client.coiffeur?.nom || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {client.date_coiffure ? formatDate(client.date_coiffure) : 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {client.paiements?.length || 0} paiement(s)
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 