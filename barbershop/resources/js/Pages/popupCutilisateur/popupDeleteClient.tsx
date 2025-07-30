import PopupDeleteSearch from './popupDeleteSearch';
import { usePage } from '@inertiajs/react';
import { FaUsers } from 'react-icons/fa';

type Client = {
    id_client: number;
    nom: string;
    contacts: string;
    id_salon: number;
    id_coiffeur: number;
    date_coiffure: string;
};

export default function PopupDeleteClient({ onClose }: { onClose: () => void }) {
    const { clients } = usePage().props as unknown as { clients: Client[] };

    // Transformer les clients pour correspondre à l'interface Item
    const transformedClients = (clients || []).map(client => ({
        id: client.id_client,
        name: client.nom,
        ...client
    }));

    return (
        <PopupDeleteSearch
            onClose={onClose}
            title="Supprimer un client"
            items={transformedClients}
            searchPlaceholder="Rechercher un client..."
            deleteRoute="supprimerclient"
            icon={<FaUsers className="inline mr-2" />}
            displayField="nom"
            idField="id_client"
        />
    );
} 