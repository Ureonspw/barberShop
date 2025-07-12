import Classes from "../../../css/contenuepg/contenupg.module.css";
import { IoLocation } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { GiScissors } from "react-icons/gi";
import { GiHairStrands } from "react-icons/gi";
import { GiPaintBrush } from "react-icons/gi";
import { GiStraightPipe } from "react-icons/gi";
import { GiHarp } from "react-icons/gi";
import { GiBottleVapors } from "react-icons/gi";


export default function Contenuepg() {
    return (
        <>
            <div id="accueil" className={Classes.containercontent}>
                <div className={Classes.containerphoto}></div>
                <div className={Classes.containertext}>
                    <h1>Bienvenue chez nous</h1>
                    <div>
                        nous mettons avotre disposition un salon de{" "}
                        <span className={Classes.highlightedText}>
                            coiffure homme et dame
                        </span>{" "}
                        afin de faire ressortir de vous une coiffure qui vous
                        ressemble. nos coiffeurs ferons leur mieux pour vous
                        afin de vous satisfaire.
                        <br />
                        <br />
                        <span className={Classes.highlightedTextbold}>
                            {" "}
                            vous satisfair, notre priorité{" "}
                        </span>
                    </div>
                </div>
            </div>
            <div id="a-propos" className={Classes.lieucontainer}>
                <div className={Classes.logocont}></div>
                <div className={Classes.textlieu}>
                    <h1>Où nous trouver !</h1>
                    <div>
                        <p>
                            vous retrouvez ici nos differents salons de coiffure
                            homme et mixte
                        </p>
                    </div>
                    <div className={Classes.lieuxboxcontainer}>
                        <div className={Classes.lieuxbox}>
                            <div className={Classes.lieupos}>
                                <IoLocation />
                            </div>
                            <samp>SONGON</samp>
                            <h3>Carrefour Corrico </h3>
                        </div>
                        <div className={Classes.lieuxbox}>
                            <div className={Classes.lieupos}>
                                <IoLocation />
                            </div>
                            <samp>TREICHVILLE</samp>
                            <h3>Arras 3, Carrefour CINÉMA ENTENTE </h3>
                        </div>
                    </div>
                </div>
            </div>

           

            <div id="contact" className={Classes.contactsbox}>
                <div className={Classes.boxtransition}></div>
                <h1>Contactez-nous</h1>
                <div className={Classes.contactsboxcontainer}>
                <div className={Classes.lieuxboxnum}>
                            <div className={Classes.lieuposnum}>
                            <IoCallOutline />
                            </div>
                            <samp>+225 07 13 04 11 12</samp>
                            <h3>Barber_225 number</h3>
                        </div>

                        <div className={Classes.titlecontactsresaux1}>
                            <FaTiktok />
                        </div>
                        <div className={Classes.titlecontactsresaux2}>
                            <FaInstagram />
                        </div>
                        <div className={Classes.titlecontactsresaux3}>
                            <FaFacebook />
                        </div>
                        <div className={Classes.titlecontactsresaux4}>Suivez nous sur les reseaux sociaux <FaLongArrowAltRight /></div>

                </div>
            </div>
            <div id="services" className={Classes.servicescontainer}>
                <div className={Classes.textservices}>
                    <h1>Nos Services</h1>
                    <div>
                        <p>
                            Découvrez notre gamme complète de services de coiffure professionnelle
                        </p>
                    </div>
                    <div className={Classes.servicesgrid}>
                        <div className={Classes.servicebox}>
                            <div className={Classes.serviceicon}>
                                <GiScissors />
                            </div>
                            <h3>Coupe Homme</h3>
                            <p>Coupes modernes et classiques</p>
                        </div>
                        <div className={Classes.servicebox}>
                            <div className={Classes.serviceicon}>
                                <GiHairStrands />
                            </div>
                            <h3>Coupe Dame</h3>
                            <p>Styles élégants et tendance</p>
                        </div>
                        <div className={Classes.servicebox}>
                            <div className={Classes.serviceicon}>
                                <GiPaintBrush />
                            </div>
                            <h3>Coloration</h3>
                            <p>Teintes et balayages personnalisés</p>
                        </div>
                        <div className={Classes.servicebox}>
                            <div className={Classes.serviceicon}>
                                <GiStraightPipe />
                            </div>
                            <h3>Lissage</h3>
                            <p>Lissage professionnel et durable</p>
                        </div>
                        <div className={Classes.servicebox}>
                            <div className={Classes.serviceicon}>
                                <GiHarp />
                            </div>
                            <h3>Permanente</h3>
                            <p>Boucles naturelles et volumineuses</p>
                        </div>
                        <div className={Classes.servicebox}>
                            <div className={Classes.serviceicon}>
                                <GiBottleVapors />
                            </div>
                            <h3>Soins Capillaires</h3>
                            <p>Soins nourrissants et réparateurs</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
