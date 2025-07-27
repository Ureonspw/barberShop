import Classes from "../../../css/popup/popupuser.module.css";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

export default function PopupForm({ onClose, title }: { onClose: () => void; title: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'caissier',
        password_confirmation: '',
    });

    const { props } = usePage();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const flash = props.flash as { success?: string; error?: string };
        if (flash?.success) {
            setSuccessMessage(flash.success);
            setTimeout(() => {
                setSuccessMessage(null);
                onClose(); // ferme automatiquement après succès
            }, 2500);
        }
        if (flash?.error) {
            setErrorMessage(flash.error);
            setTimeout(() => setErrorMessage(null), 3000);
        }
    }, [props.flash, onClose]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('ajoututilisateur'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className={Classes.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={Classes.popup}>
                <h2>👤 {title}</h2>

                {successMessage && (
                    <div className="mb-4 text-green-400">
                        ✅ {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="mb-4 text-red-400">
                        ❌ {errorMessage}
                    </div>
                )}

                <form onSubmit={submit}>
                    <InputLabel htmlFor="name" value="Nom d'utilisateur" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className={Classes.input}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder="Entrez le nom d'utilisateur"
                    />
                    <InputError message={errors.name} className={Classes.error} />

                    <InputLabel htmlFor="email" value="Adresse email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={Classes.input}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        placeholder="Entrez l'adresse email"
                    />
                    <InputError message={errors.email} className={Classes.error} />

                    <InputLabel htmlFor="role" value="Rôle utilisateur" />
                    <select
                        id="role"
                        name="role"
                        className={Classes.select}
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                    >
                        <option value="caissier">💰 Caissier</option>
                        <option value="admin">👑 Administrateur</option>
                    </select>
                    <InputError message={errors.role} className={Classes.error} />

                    <InputLabel htmlFor="password" value="Mot de passe" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={Classes.input}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        placeholder="Entrez le mot de passe"
                    />
                    <InputError message={errors.password} className={Classes.error} />

                    <InputLabel htmlFor="password_confirmation" value="Confirmation du mot de passe" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className={Classes.input}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                        placeholder="Confirmez le mot de passe"
                    />
                    <InputError message={errors.password_confirmation} className={Classes.error} />

                    <div className={Classes.btns}>
                        <button 
                            type="submit" 
                            className={Classes.validateBtn} 
                            disabled={processing}
                        >
                            {processing ? "⏳ Enregistrement..." : "💾 Enregistrer"}
                        </button>
                        <button 
                            type="button" 
                            className={Classes.cancelBtn} 
                            onClick={onClose}
                        >
                            ❌ Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
