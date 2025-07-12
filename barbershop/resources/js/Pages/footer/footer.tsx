import Classes from "../../../css/footer/footer.module.css";
import { IoLocation } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { IoCutOutline } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <footer className={Classes.footerContainer}>
                {/* Section principale du footer */}
                <div className={Classes.footerMain}>
                    {/* Logo et description */}
                    <div className={Classes.footerBrand}>
                        <div className={Classes.logoContainer}>
                            <IoCutOutline />
                            <h2>Barber 225</h2>
                        </div>
                        <p>
                            Votre destination premium pour des coupes de cheveux exceptionnelles. 
                            Notre équipe de coiffeurs experts s'engage à vous offrir une expérience 
                            unique et des résultats qui vous ressemblent.
                        </p>
                        <div className={Classes.socialLinks}>
                            <a href="#" className={Classes.socialLink} title="TikTok">
                                <FaTiktok />
                            </a>
                            <a href="#" className={Classes.socialLink} title="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="#" className={Classes.socialLink} title="Facebook">
                                <FaFacebook />
                            </a>
                            <a href="#" className={Classes.socialLink} title="WhatsApp">
                                <FaWhatsapp />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div className={Classes.footerSection}>
                        <h3>Nos Services</h3>
                        <ul className={Classes.serviceList}>
                            <li>Coupe Homme</li>
                            <li>Coupe Dame</li>
                            <li>Coloration</li>
                            <li>Lissage</li>
                            <li>Permanente</li>
                            <li>Soins Capillaires</li>
                        </ul>
                    </div>

                    {/* Horaires */}
                    <div className={Classes.footerSection}>
                        <h3>Horaires d'ouverture</h3>
                        <div className={Classes.hoursContainer}>
                            <div className={Classes.hourItem}>
                                <span>Lundi - Vendredi</span>
                                <span>08:00 - 20:00</span>
                            </div>
                            <div className={Classes.hourItem}>
                                <span>Samedi</span>
                                <span>08:00 - 18:00</span>
                            </div>
                            <div className={Classes.hourItem}>
                                <span>Dimanche</span>
                                <span>09:00 - 16:00</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className={Classes.footerSection}>
                        <h3>Contact</h3>
                        <div className={Classes.contactInfo}>
                            <div className={Classes.contactItem}>
                                <IoLocation />
                                <div>
                                    <h4>Songon</h4>
                                    <p>Carrefour Corrico</p>
                                </div>
                            </div>
                            <div className={Classes.contactItem}>
                                <IoLocation />
                                <div>
                                    <h4>Treichville</h4>
                                    <p>Arras 3, Carrefour CINÉMA ENTENTE</p>
                                </div>
                            </div>
                            <div className={Classes.contactItem}>
                                <IoCallOutline />
                                <div>
                                    <h4>Téléphone</h4>
                                    <p>+225 07 13 04 11 12</p>
                                </div>
                            </div>
                            <div className={Classes.contactItem}>
                                <IoMailOutline />
                                <div>
                                    <h4>Email</h4>
                                    <p>contact@barber225.ci</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section inférieure */}
                <div className={Classes.footerBottom}>
                    <div className={Classes.bottomContent}>
                        <p>&copy; 2024 Barber 225. Tous droits réservés.</p>
                        <div className={Classes.bottomLinks}>
                            <a href="#">Politique de confidentialité</a>
                            <a href="#">Conditions d'utilisation</a>
                            <a href="#">Mentions légales</a>
                        </div>
                    </div>
                </div>

                {/* Bouton retour en haut */}
                <button className={Classes.scrollToTop} onClick={scrollToTop}>
                    <FaArrowUp />
                </button>
            </footer>
        </>
    );
} 