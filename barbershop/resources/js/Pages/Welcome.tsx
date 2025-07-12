import { PageProps } from '@/types';
import Header from './headerfull/header';
import Header2 from './header/header';
import Contenuepg from './contenuepg/contenupg';
import Footer from './footer/footer';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Header2 />
            <Header />
            <Contenuepg />
            <Footer />
        </>
    );
}
