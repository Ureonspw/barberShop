import Classes from "../../../css/header/header.module.css";
import { IoMdLogIn } from "react-icons/io";

export default function Header() {
    return (
        <header className={Classes.headerContainer}>
            <div className={Classes.headerContentbox1}>
                <a href="#accueil" className={Classes.navLink}>Accueil</a>
                <a href="#a-propos" className={Classes.navLink}>A propos</a>
                <a href="#services" className={Classes.navLink}>Services</a>
            </div>
            <div className={Classes.Headerlogo}></div>
            <div className={Classes.headerContentbox1}>
                <a href="#contact" className={Classes.navLink}>Contact</a>
                <a href="/login" className={Classes.navLink}>Connexion</a>
                <a href="/register" className={Classes.navLink}>Inscription</a>
            </div>
            <a href="/login" className={Classes.navLink2}><IoMdLogIn /></a>

        </header>
    ); 
}
