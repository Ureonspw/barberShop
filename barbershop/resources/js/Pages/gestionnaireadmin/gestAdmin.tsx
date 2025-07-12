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

import Classes from "../../../css/gestAdmin/admingest.module.css";

export default function GestionnaireAdmin() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    const [isCoiffeurPopupOpen, setIsCoiffeurPopupOpen] = useState(false);

    const openCoiffeurPopup = () => setIsCoiffeurPopupOpen(true);
    const closeCoiffeurPopup = () => setIsCoiffeurPopupOpen(false);

    const [isSalonPopupOpen, setIsSalonPopupOpen] = useState(false);

    const openSalonPopup = () => setIsSalonPopupOpen(true);
    const closeSalonPopup = () => setIsSalonPopupOpen(false);



    const [isClientPopupOpen, setIsClientPopupOpen] = useState(false);

    const openClientPopup = () => setIsClientPopupOpen(true);
    const closeCientPopup = () => setIsClientPopupOpen(false);


    return (
        <AuthenticatedLayout>
            {/* <Popup trigger={<button> test</button>} position="right center">
                
            </Popup> */}
            <div className={Classes.containerbox}>
                <div className={Classes.titlecontainer}>
                    {" "}
                    Gestionnaire de l'adminnistrateur Kouame
                </div>
                <div className={Classes.Containerboxson}>
                    <div className={Classes.boxcontainer}>
                        <div className={Classes.boxcontainerimgtitle}>
                            {" "}
                            <h3>
                                <FaUserCircle />
                            </h3>
                            <div className={Classes.titlecontentinfo}>
                                <span> 20 </span>
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

                            <div className={Classes.button2}>
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
                                <span> 05 </span>
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
                            <div className={Classes.button2}>
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
                                <span> 02 </span>
                                <samp> Salons Ouverts</samp>
                            </div>
                        </div>
                        <div className={Classes.contentbox}>
                            Ici vous pouvez ajouter ou supprimer des Salon que
                            vous avez creer
                        </div>
                        <div className={Classes.popupbtn}>
                            <div className={Classes.button1} onClick={openSalonPopup}>
                                {" "}
                                <IoIosAddCircle />
                                Ajouter{" "}
                            </div>
                            <div className={Classes.button2}>
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
                                <span> 100 </span>
                                <samp> Clients </samp>
                            </div>
                        </div>
                        <div className={Classes.contentbox}>
                            Ici vous pouvez ajouter ou supprimer des Salon que
                            vous avez creer
                        </div>
                        <div className={Classes.popupbtn}>
                            <div className={Classes.button1} onClick={openClientPopup}>
                                {" "}
                                <IoIosAddCircle />
                                Ajouter{" "}
                            </div>
                            <div className={Classes.button2}>
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
        </AuthenticatedLayout>
    );
}
