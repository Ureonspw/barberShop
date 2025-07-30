import PopupDeleteSearch from './popupDeleteSearch';
import { usePage } from '@inertiajs/react';
import { GiScissors } from 'react-icons/gi';

type Coiffeur = {
    id_coiffeur: number;
    nom: string;
    specialite: string;
    disponibilite: string;
    id_salon: number;
};

export default function PopupDeleteCoiffeur({ onClose }: { onClose: () => void }) {
    const { coiffeurs } = usePage().props as unknown as { coiffeurs: Coiffeur[] };

    // Transformer les coiffeurs pour correspondre à l'interface Item
    const transformedCoiffeurs = (coiffeurs || []).map(coiffeur => ({
        id: coiffeur.id_coiffeur,
        name: coiffeur.nom,
        ...coiffeur
    }));

    return (
        <PopupDeleteSearch
            onClose={onClose}
            title="Supprimer un coiffeur"
            items={transformedCoiffeurs}
            searchPlaceholder="Rechercher un coiffeur..."
            deleteRoute="supprimercoiffeur"
            icon={<GiScissors className="inline mr-2" />}
            displayField="nom"
            idField="id_coiffeur"
        />
    );
} 