import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Popup from "@/Pages/popupCutilisateur/popuputilisateur";

import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { GiComb } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import PopupForm from "@/Pages/popupCutilisateur/popuputilisateur";
import PopupFormcoiffeur from "@/Pages/popupCutilisateur/popupcoiffeuradd";
import PopupFormSalon from "@/Pages/popupCutilisateur/popupSalonAddcopy";
import PopupFormClient from "@/Pages/popupCutilisateur/popupClientAddcopy";
// Import des popups de suppression
import PopupDeleteUser from "@/Pages/popupCutilisateur/popupDeleteUser";
import PopupDeleteCoiffeur from "@/Pages/popupCutilisateur/popupDeleteCoiffeur";
import PopupDeleteSalon from "@/Pages/popupCutilisateur/popupDeleteSalon";
import PopupDeleteClient from "@/Pages/popupCutilisateur/popupDeleteClient";
import { usePage } from "@inertiajs/react";
import Classes from "../../../css/gestAdmin/admingest.module.css";

export default function GestionnaireAdmin() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    
    // États pour les popups de suppression
    const [isDeleteUserPopupOpen, setIsDeleteUserPopupOpen] = useState(false);
    const openDeleteUserPopup = () => setIsDeleteUserPopupOpen(true);
    const closeDeleteUserPopup = () => setIsDeleteUserPopupOpen(false);
    
    const [isCoiffeurPopupOpen, setIsCoiffeurPopupOpen] = useState(false);
    const { salons, counts } = usePage().props as { salons?: any; counts?: any };
    console.log("salons props:", salons);
    const openCoiffeurPopup = () => setIsCoiffeurPopupOpen(true);
    const closeCoiffeurPopup = () => setIsCoiffeurPopupOpen(false);
    
    // États pour les popups de suppression de coiffeurs
    const [isDeleteCoiffeurPopupOpen, setIsDeleteCoiffeurPopupOpen] = useState(false);
    const openDeleteCoiffeurPopup = () => setIsDeleteCoiffeurPopupOpen(true);
    const closeDeleteCoiffeurPopup = () => setIsDeleteCoiffeurPopupOpen(false);
    
    const {coiffeurs}=usePage().props as {coiffeurs?:any};
    console.log("coiffeurs props:",coiffeurs);
    const [isSalonPopupOpen, setIsSalonPopupOpen] = useState(false);

    const openSalonPopup = () => setIsSalonPopupOpen(true);
    const closeSalonPopup = () => setIsSalonPopupOpen(false);

    // États pour les popups de suppression de salons
    const [isDeleteSalonPopupOpen, setIsDeleteSalonPopupOpen] = useState(false);
    const openDeleteSalonPopup = () => setIsDeleteSalonPopupOpen(true);
    const closeDeleteSalonPopup = () => setIsDeleteSalonPopupOpen(false);

    const [isClientPopupOpen, setIsClientPopupOpen] = useState(false);

    const openClientPopup = () => setIsClientPopupOpen(true);
    const closeCientPopup = () => setIsClientPopupOpen(false);

    // États pour les popups de suppression de clients
    const [isDeleteClientPopupOpen, setIsDeleteClientPopupOpen] = useState(false);
    const openDeleteClientPopup = () => setIsDeleteClientPopupOpen(true);
    const closeDeleteClientPopup = () => setIsDeleteClientPopupOpen(false);

    return (
        <AuthenticatedLayout>
            {/* <Popup trigger={<button> test</button>} position="right center">
                
            </Popup> */}
            <div className={Classes.containerbox}>
                <div className={Classes.titlecontainer}>
                    {" "}
                    Gestionnaire de l'Administrateur
                </div>
                <div className={Classes.Containerboxson}>
                    <div className={Classes.boxcontainer}>
                        <div className={Classes.boxcontainerimgtitle}>
                            {" "}
                            <h3>
                                <FaUserCircle />
                            </h3>
                            <div className={Classes.titlecontentinfo}>
                                <span> {counts?.users || 0} </span>
                                <samp> Utilisateurs </samp>
                            </div>
                        </div>
                        <div className={Classes.contentbox}>
                            retrouver ici la section dedier a l'ajout ou de
                            suppression de nouveaux utilisateur que ce soit
                            administrateur ou Caissiere pour gerer vos diffents
                            salons
                        </div>
                        <div className={Classes.popupbtn}>
                            <div
                                className={Classes.button1}
                                onClick={openPopup}
                            >
                                <IoIosAddCircle /> Ajouter
                            </div>

                            <div className={Classes.button2} onClick={openDeleteUserPopup}>
                                {" "}
                                <MdDeleteForever />
                                Supprimer{" "}
                            </div>
                        </div>
                    </div>
                    <div className={Classes.boxcontainer}>
                        <div className={Classes.boxcontainerimgtitle}>
                            {" "}
                            <h3>
                                <GiComb />
                            </h3>
                            <div className={Classes.titlecontentinfo}>
                                <span> {counts?.coiffeurs || 0} </span>
                                <samp> Coiffeurs Disponible</samp>
                            </div>
                        </div>
                        <div className={Classes.contentbox}>
                            retrouver ici la section dedier a l'ajout ou de
                            suppression de nouveau coiffeur pour vos differents
                            Salons vous pouvez leurs ajouter selon leurs
                            specialite et leurs disponibilites et et les
                            supprimer dans le cas d'un renvoi
                        </div>
                        <div className={Classes.popupbtn}>
                            <div
                                className={Classes.button1}
                                onClick={openCoiffeurPopup}
                            >
                                {" "}
                                <IoIosAddCircle />
                                Ajouter{" "}
                            </div>
                            <div className={Classes.button2} onClick={openDeleteCoiffeurPopup}>
                                {" "}
                                <MdDeleteForever />
                                Supprimer{" "}
                            </div>
                        </div>
                    </div>
                    <div className={Classes.boxcontainer}>
                        <div className={Classes.boxcontainerimgtitle}>
                            {" "}
                            <h3>
                                <FaUsers />
                            </h3>
                            <div className={Classes.titlecontentinfo}>
                                <span> {counts?.salons || 0} </span>
                                <samp> Salons Ouverts</samp>
                            </div>
                        </div>
                        <div className={Classes.contentbox}>
                            Ici vous pouvez ajouter ou supprimer des salons que
                            vous avez créés pour gérer vos différents établissements
                        </div>
                        <div className={Classes.popupbtn}>
                            <div className={Classes.button1} onClick={openSalonPopup}>
                                {" "}
                                <IoIosAddCircle />
                                Ajouter{" "}
                            </div>
                            <div className={Classes.button2} onClick={openDeleteSalonPopup}>
                                {" "}
                                <MdDeleteForever />
                                Supprimer{" "}
                            </div>
                        </div>
                    </div>
                    <div className={Classes.boxcontainer}>
                        <div className={Classes.boxcontainerimgtitle}>
                            {" "}
                            <h3>
                                <MdPayments />
                            </h3>
                            <div className={Classes.titlecontentinfo}>
                                <span> {counts?.clients || 0} </span>
                                <samp> Clients </samp>
                            </div>
                        </div>
                        <div className={Classes.contentbox}>
                            Ici vous pouvez ajouter ou supprimer des clients pour
                            gérer votre base de données clients
                        </div>
                        <div className={Classes.popupbtn}>
                            <div className={Classes.button1} onClick={openClientPopup}>
                                {" "}
                                <IoIosAddCircle />
                                Ajouter{" "}
                            </div>
                            <div className={Classes.button2} onClick={openDeleteClientPopup}>
                                {" "}
                                <MdDeleteForever />
                                Supprimer{" "}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isPopupOpen && (
                <PopupForm
                    title="Ajouter un utilisateur"
                    onClose={closePopup}
                />
            )}
            {isCoiffeurPopupOpen && (
                <PopupFormcoiffeur
                    title="Ajouter un coiffeur"
                    onClose={closeCoiffeurPopup}
                />
            )}
            {isSalonPopupOpen && (
                <PopupFormSalon
                    title="Ajouter un salon"
                    onClose={closeSalonPopup}
                />
            )}

            {isClientPopupOpen && (
                <PopupFormClient
                    title="Ajouter un client"
                    onClose={closeCientPopup}
                />
            )}

            {/* Popups de suppression */}
            {isDeleteUserPopupOpen && (
                <PopupDeleteUser onClose={closeDeleteUserPopup} />
            )}
            {isDeleteCoiffeurPopupOpen && (
                <PopupDeleteCoiffeur onClose={closeDeleteCoiffeurPopup} />
            )}
            {isDeleteSalonPopupOpen && (
                <PopupDeleteSalon onClose={closeDeleteSalonPopup} />
            )}
            {isDeleteClientPopupOpen && (
                <PopupDeleteClient onClose={closeDeleteClientPopup} />
            )}
        </AuthenticatedLayout>
    );
}
