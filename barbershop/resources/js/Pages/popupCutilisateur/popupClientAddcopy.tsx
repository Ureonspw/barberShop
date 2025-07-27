// src/Components/PopupForm.tsx
import Classes from "../../../css/popup/popupuser.module.css";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

type Salon = {
    id_salon: number;
    nom: string;
};
type Coiffeur = {
    id_coiffeur: number;
    nom: string;
};

export default function PopupFormClient({
    onClose,
    title,
}: {
    onClose: () => void;
    title: string;
}) {
    const { salons, coiffeurs } = usePage().props as unknown as {
        salons: Salon[];
        coiffeurs: Coiffeur[];
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        nom: "",
        contacts: "",
        id_salon: "",
        id_coiffeur: "",
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
        post(route("ajoutclient"), {
            onFinish: () => reset("nom", "contacts"),
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
                    <InputLabel htmlFor="nom" value="Nom du Client" />
                    <TextInput
                        id="nom"
                        name="nom"
                        type="text"
                        placeholder="Entrez le nom du client"
                        value={data.nom}
                        onChange={(e) => setData("nom", e.target.value)}
                        className={Classes.input}
                        required
                    />
                    <InputError
                        message={errors.nom}
                        className={Classes.error}
                    />

                    <InputLabel htmlFor="contacts" value="Contact du Client" />
                    <TextInput
                        id="contacts"
                        name="contacts"
                        type="text"
                        placeholder="Entrez le contact du client"
                        value={data.contacts}
                        onChange={(e) => setData("contacts", e.target.value)}
                        className={Classes.input}
                        required
                    />
                    <InputError
                        message={errors.contacts}
                        className={Classes.error}
                    />

                    <InputLabel htmlFor="id_salon" value="Salon" />
                    <select
                        id="id_salon"
                        name="id_salon"
                        value={data.id_salon}
                        onChange={(e) => setData("id_salon", e.target.value)}
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
                    <InputError
                        message={errors.id_salon}
                        className={Classes.error}
                    />

                    <InputLabel htmlFor="id_coiffeur" value="Coiffeur" />
                    <select
                        id="id_coiffeur"
                        name="id_coiffeur"
                        value={data.id_coiffeur}
                        onChange={(e) => setData("id_coiffeur", e.target.value)}
                        className={Classes.select}
                        required
                    >
                        <option value="">✂️ Sélectionnez un coiffeur</option>
                        {coiffeurs.map((coiffeur) => (
                            <option
                                key={coiffeur.id_coiffeur}
                                value={coiffeur.id_coiffeur}
                            >
                                {coiffeur.nom}
                            </option>
                        ))}
                    </select>
                    <InputError
                        message={errors.id_coiffeur}
                        className={Classes.error}
                    />

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
