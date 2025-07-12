import Classes from "../../../css/headerfull/header.module.css";
import { IoCutOutline } from "react-icons/io5";

export default function Header() {
    return (
        <>
            <div className={Classes.containerbg}>
                <div className={Classes.title}>
                    <IoCutOutline />
                    <h1>Barber 225</h1>
                </div>
                <div className={Classes.papierbg}></div>
            </div>
        </>
    );
} 