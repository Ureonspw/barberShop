import Classes from "../../../css/caissierapge/caissierpage.module.css"
import AuthenticatedCaissier from "@/Layouts/AuthenticatedLayoutcaissier"
import { useForm } from '@inertiajs/react'
import { useState, useEffect } from 'react'
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
    FaArrowLeft
} from 'react-icons/fa'
import { MdPayment, MdAttachMoney } from 'react-icons/md'
import { Link } from '@inertiajs/react'

interface Salon {
    id_salon: number
    nom: string
    adresse: string
}

interface Coiffeur {
    id_coiffeur: number
    nom: string
    specialite: string
    id_salon: number
}

interface Client {
    id_client: number
    nom: string
    contacts: string
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

interface Props {
    salons: Salon[]
    coiffeurs: Coiffeur[]
    clients: Client[]
    recentPaiements: Paiement[]
}

export default function PaiementPage({ salons, coiffeurs, clients, recentPaiements }: Props) {
    const [selectedSalon, setSelectedSalon] = useState<number | ''>('')
    const [filteredCoiffeurs, setFilteredCoiffeurs] = useState<Coiffeur[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredClients, setFilteredClients] = useState<Client[]>([])

    const { data, setData, post, processing, errors, reset } = useForm({
        nom_client: '',
        contacts_client: '',
        montant: '',
        mode_paiement: '',
        id_salon: '',
        id_coiffeur: '',
    })

    // Filtrer les coiffeurs quand un salon est sélectionné
    useEffect(() => {
        if (selectedSalon) {
            const coiffeursDuSalon = coiffeurs.filter(coiffeur => coiffeur.id_salon === selectedSalon)
            setFilteredCoiffeurs(coiffeursDuSalon)
        } else {
            setFilteredCoiffeurs([])
        }
    }, [selectedSalon, coiffeurs])

    // Filtrer les clients existants
    useEffect(() => {
        if (searchTerm && selectedSalon) {
            const clientsFiltres = clients.filter(client => 
                client.id_salon === selectedSalon &&
                client.nom.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredClients(clientsFiltres)
        } else {
            setFilteredClients([])
        }
    }, [searchTerm, selectedSalon, clients])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('caissier.paiement'), {
            onSuccess: () => {
                reset()
                setSelectedSalon('')
                setSearchTerm('')
            }
        })
    }

    const selectClient = (client: Client) => {
        setData({
            ...data,
            nom_client: client.nom,
            contacts_client: client.contacts || '',
        })
        setSearchTerm('')
        setFilteredClients([])
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

    const formatMontant = (montant: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF'
        }).format(montant)
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

    return (
        <AuthenticatedCaissier>
            <div className={Classes.caissierPage}>
                <div className={Classes.container}>
                    {/* Header avec bouton retour */}
                    <div className={Classes.header}>
                        <div className={Classes.headerTop}>
                            <Link href={route('caissier')} className={Classes.backButton}>
                                <FaArrowLeft />
                                Retour au tableau de bord
                            </Link>
                        </div>
                        <h1>Nouveau Paiement</h1>
                        <p>Traitez un nouveau paiement pour un client</p>
                    </div>

                    {/* Messages de succès/erreur */}
                    {Object.keys(errors).length > 0 && (
                        <div className={Classes.errorMessage}>
                            <FaExclamationTriangle style={{ marginRight: '8px' }} />
                            {Object.values(errors).map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </div>
                    )}

                    {/* Contenu principal */}
                    <div className={Classes.content}>
                        {/* Formulaire de paiement */}
                        <div className={Classes.paiementForm}>
                            <h2 className={Classes.formTitle}>
                                <FaCreditCard />
                                Formulaire de Paiement
                            </h2>
                            
                            <form onSubmit={handleSubmit}>
                                {/* Sélection du salon */}
                                <div className={Classes.formGroup}>
                                    <label className={Classes.formLabel}>
                                        <FaStore style={{ marginRight: '5px' }} />
                                        Salon *
                                    </label>
                                    <select
                                        className={Classes.formSelect}
                                        value={selectedSalon}
                                        onChange={(e) => {
                                            setSelectedSalon(Number(e.target.value))
                                            setData('id_salon', e.target.value)
                                        }}
                                        required
                                    >
                                        <option value="">Sélectionnez un salon</option>
                                        {salons.map(salon => (
                                            <option key={salon.id_salon} value={salon.id_salon}>
                                                {salon.nom} - {salon.adresse}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sélection du coiffeur */}
                                <div className={Classes.formGroup}>
                                    <label className={Classes.formLabel}>
                                        <FaCut style={{ marginRight: '5px' }} />
                                        Coiffeur *
                                    </label>
                                    <select
                                        className={Classes.formSelect}
                                        value={data.id_coiffeur}
                                        onChange={(e) => setData('id_coiffeur', e.target.value)}
                                        required
                                        disabled={!selectedSalon}
                                    >
                                        <option value="">Sélectionnez un coiffeur</option>
                                        {filteredCoiffeurs.map(coiffeur => (
                                            <option key={coiffeur.id_coiffeur} value={coiffeur.id_coiffeur}>
                                                {coiffeur.nom} - {coiffeur.specialite}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Recherche de client existant */}
                                <div className={Classes.formGroup}>
                                    <label className={Classes.formLabel}>
                                        <FaSearch style={{ marginRight: '5px' }} />
                                        Rechercher un client existant
                                    </label>
                                    <input
                                        type="text"
                                        className={Classes.formInput}
                                        placeholder="Nom du client..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        disabled={!selectedSalon}
                                    />
                                    
                                    {/* Liste des clients trouvés */}
                                    {filteredClients.length > 0 && (
                                        <div className={Classes.clientSearchResults}>
                                            {filteredClients.map(client => (
                                                <div
                                                    key={client.id_client}
                                                    onClick={() => selectClient(client)}
                                                    className={Classes.clientSearchItem}
                                                >
                                                    <FaUser style={{ marginRight: '5px' }} />
                                                    <strong>{client.nom}</strong>
                                                    {client.contacts && (
                                                        <>
                                                            <FaPhone style={{ marginLeft: '10px', marginRight: '5px' }} />
                                                            {client.contacts}
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Informations du client */}
                                <div className={Classes.formGroup}>
                                    <label className={Classes.formLabel}>
                                        <FaUser style={{ marginRight: '5px' }} />
                                        Nom du client *
                                    </label>
                                    <input
                                        type="text"
                                        className={Classes.formInput}
                                        value={data.nom_client}
                                        onChange={(e) => setData('nom_client', e.target.value)}
                                        placeholder="Nom complet du client"
                                        required
                                    />
                                </div>

                                <div className={Classes.formGroup}>
                                    <label className={Classes.formLabel}>
                                        <FaPhone style={{ marginRight: '5px' }} />
                                        Contacts (optionnel)
                                    </label>
                                    <input
                                        type="text"
                                        className={Classes.formInput}
                                        value={data.contacts_client}
                                        onChange={(e) => setData('contacts_client', e.target.value)}
                                        placeholder="Téléphone ou email"
                                    />
                                </div>

                                <div className={Classes.formGroup}>
                                    <label className={Classes.formLabel}>
                                        <FaMoneyBillWave style={{ marginRight: '5px' }} />
                                        Montant (FCFA) *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className={Classes.formInput}
                                        value={data.montant}
                                        onChange={(e) => setData('montant', e.target.value)}
                                        placeholder="0.00"
                                        required
                                    />
                                </div>

                                <div className={Classes.formGroup}>
                                    <label className={Classes.formLabel}>
                                        <FaCreditCard style={{ marginRight: '5px' }} />
                                        Mode de paiement *
                                    </label>
                                    <select
                                        className={Classes.formSelect}
                                        value={data.mode_paiement}
                                        onChange={(e) => setData('mode_paiement', e.target.value)}
                                        required
                                    >
                                        <option value="">Sélectionnez le mode de paiement</option>
                                        <option value="especes">Espèces</option>
                                        <option value="carte">Carte bancaire</option>
                                        <option value="cheque">Chèque</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className={Classes.submitButton}
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <FaCheckCircle />
                                            Traitement...
                                        </>
                                    ) : (
                                        <>
                                            <FaCreditCard />
                                            Traiter le paiement
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Historique des paiements */}
                        <div className={Classes.historiqueSection}>
                            <h2 className={Classes.historiqueTitle}>
                                <FaHistory />
                                Paiements Récents
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
                    </div>
                </div>
            </div>
        </AuthenticatedCaissier>
    )
} 