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

    // Transformer les utilisateurs pour correspondre à l'interface Item
    const transformedUsers = (users || []).map(user => ({
        id: user.id_user,
        name: user.name,
        id_user: user.id_user,
        email: user.email,
        role: user.role
    }));

    return (
        <PopupDeleteSearch
            onClose={onClose}
            title="Supprimer un utilisateur"
            items={transformedUsers}
            searchPlaceholder="Rechercher un utilisateur..."
            deleteRoute="supprimerutilisateur"
            icon={<FaUser className="inline mr-2" />}
            displayField="name"
            idField="id_user"
        />
    );
} 