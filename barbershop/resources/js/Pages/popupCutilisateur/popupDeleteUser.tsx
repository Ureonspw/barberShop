import PopupDeleteSearch from './popupDeleteSearch';
import { usePage } from '@inertiajs/react';
import { FaUser } from 'react-icons/fa';

type User = {
    id_user: number;
    name: string;
    email: string;
    role: string;
};

export default function PopupDeleteUser({ onClose }: { onClose: () => void }) {
    const { users } = usePage().props as unknown as { users: User[] };

    return (
        <PopupDeleteSearch
            onClose={onClose}
            title="Supprimer un utilisateur"
            items={users || []}
            searchPlaceholder="Rechercher un utilisateur..."
            deleteRoute="supprimerutilisateur"
            icon={<FaUser className="inline mr-2" />}
            displayField="name"
            idField="id_user"
        />
    );
} 