import { SVGAttributes } from 'react';
import logo from '../../../public/images/barberlogo.png';
export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <img src={logo} alt="Logo" className="w-20 h-20" />
    );
}
