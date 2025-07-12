import { SVGAttributes } from 'react';
import logo from '../../../public/images/barberlogo.png';
export default function ApplicationLogomini(props: SVGAttributes<SVGElement>) {
    return (
        <img src={logo} alt="Logo" className="w-10 h-10" />
    );
}
