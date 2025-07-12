import Classes from "../../../css/caissierapge/caissierpage.module.css"
import AuthenticatedCaissier from "@/Layouts/AuthenticatedLayoutcaissier"
export default function CaissierPage() {
    return (
        <AuthenticatedCaissier>
            <div className={Classes.caissierPage}>
                <h1>Caissier Page</h1>
            </div>
        </AuthenticatedCaissier>
    )
}