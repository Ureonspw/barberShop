// src/Components/PopupForm.tsx
import React, { useState } from "react";
import Classes from "../../../css/popup/popupuser.module.css";

export default function PopupFormClient({ onClose, title }: { onClose: () => void; title: string }) {
    const [formData, setFormData] = useState({
        nom: "",
        contact: "",
        id_coiffeur: 0,
        id_salon: 0,
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
     
        console.log("Formulaire soumis :", formData);
        // TODO : Envoi à la base de données
        onClose();
    };

    return (
        <div className={Classes.overlay}>
            <div className={Classes.popup}>
                <h2>{title}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nom"
                        placeholder="Nom du Client"
                        value={formData.nom}
                        required 
                    />
<input
    type="text"
    name="contact"
    placeholder="Entrez le contact du client"
    value={formData.contact}
    onChange={handleChange}
    required
/>
                    <select name="Coiffeur" value={formData.id_coiffeur} onChange={handleChange} className={Classes.select} required>
                        <option value="" disabled>Sélectionnez le coiffeur associé</option>

                    </select>
                    <select name="Salon" value={formData.id_salon} onChange={handleChange} className={Classes.select} required>
                        <option value="" disabled>Sélectionnez le salon associé</option>

                    </select>

                                      
                    {error && <p className={Classes.error}>{error}</p>}
                    <div className={Classes.btns}>
                        <button type="submit" className={Classes.validateBtn}>Enregistrer</button>
                        <button type="button" onClick={onClose} className={Classes.cancelBtn}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
