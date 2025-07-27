// src/Components/PopupFormcoiffeur.tsx
import Classes from "../../../css/popup/popupuser.module.css";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

type Salon = {
    id_salon: number;
    nom: string;
};

export default function PopupFormcoiffeur({ onClose, title }: { onClose: () => void; title: string }) {
    const { salons } = usePage().props as unknown as { salons: Salon[] };

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        id_salon: '',
        specialite: '',
        disponibilite: '',
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
        post(route('ajoutcoiffeur'), {
            onFinish: () => reset('name', 'id_salon', 'specialite'),
        });
    };

    return (
        <div className={Classes.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={Classes.popup}>
                <h2>✂️ {title}</h2>

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
                    <InputLabel htmlFor="name" value="Nom du Coiffeur" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className={Classes.input}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder="Entrez le nom du coiffeur"
                    />
                    <InputError message={errors.name} className={Classes.error} />

                    <InputLabel htmlFor="id_salon" value="Salon" />
                    <select
                        id="id_salon"
                        name="id_salon"
                        value={data.id_salon}
                        onChange={(e) => setData('id_salon', e.target.value)}
                        className={Classes.select}
                        required
                    >
                        <option value="">🏪 Sélectionnez un salon</option>
                        {salons.map((salon) => (
                            <option key={salon.id_salon} value={salon.id_salon}>
                                {salon.nom}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.id_salon} className={Classes.error} />

                    <InputLabel htmlFor="disponibilite" value="Disponibilité" />
                    <select
                        id="disponibilite"
                        name="disponibilite"
                        value={data.disponibilite}
                        onChange={(e) => setData('disponibilite', e.target.value)}
                        className={Classes.select}
                        required
                    >
                        <option value="">📅 Sélectionnez la disponibilité</option>
                        <option value="jours ouvrables">🕒 Lundi ~ Vendredi</option>
                        <option value="Semaine">📆 Tous les jours</option>
                        <option value="Hebdo">📞 En cas de besoin</option>
                    </select>
                    <InputError message={errors.disponibilite} className={Classes.error} />

                    <InputLabel htmlFor="specialite" value="Spécialité" />
                    <TextInput
                        id="specialite"
                        name="specialite"
                        value={data.specialite}
                        className={Classes.input}
                        onChange={(e) => setData('specialite', e.target.value)}
                        required
                        placeholder="Ex: Tresse, Coupe, Dégradé, Coloration..."
                    />
                    <InputError message={errors.specialite} className={Classes.error} />

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
                            onClick={onClose} 
                            className={Classes.cancelBtn}
                        >
                            ❌ Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
