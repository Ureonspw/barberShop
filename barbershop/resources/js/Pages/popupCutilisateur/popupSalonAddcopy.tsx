// src/Components/PopupForm.tsx
import Classes from "../../../css/popup/popupuser.module.css";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

export default function PopupFormSalon({ onClose, title }: { onClose: () => void; title: string }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        adresse: '',
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
        post(route('ajoutsalon'), {
            onFinish: () => reset('name', 'adresse'),
        });
    };

    return (
        <div className={Classes.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={Classes.popup}>
                <h2>🏪 {title}</h2>
                
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
                    <InputLabel htmlFor="name" value="Nom du Salon" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className={Classes.input}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder="Entrez le nom du salon"
                    />
                    <InputError message={errors.name} className={Classes.error} />

                    <InputLabel htmlFor="adresse" value="Adresse du Salon" />
                    <TextInput
                        id="adresse"
                        type="text"
                        name="adresse"
                        value={data.adresse}
                        className={Classes.input}
                        onChange={(e) => setData('adresse', e.target.value)}
                        required
                        placeholder="Entrez l'adresse du salon"
                    />
                    <InputError message={errors.adresse} className={Classes.error} />

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
