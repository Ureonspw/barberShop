import PopupDeleteSearch from './popupDeleteSearch';
import { usePage } from '@inertiajs/react';
import { FaStore } from 'react-icons/fa';

type Salon = {
    id_salon: number;
    nom: string;
    adresse: string;
    id_admin: number;
};

export default function PopupDeleteSalon({ onClose }: { onClose: () => void }) {
    const { salons } = usePage().props as unknown as { salons: Salon[] };

    return (
        <PopupDeleteSearch
            onClose={onClose}
            title="Supprimer un salon"
            items={salons || []}
            searchPlaceholder="Rechercher un salon..."
            deleteRoute="supprimersalon"
            icon={<FaStore className="inline mr-2" />}
            displayField="nom"
            idField="id_salon"
        />
    );
} 