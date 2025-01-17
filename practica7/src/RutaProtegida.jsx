
import { Navigate, Outlet } from "react-router-dom";

function RutaProtegida({ canActivate, redirectPath = "/Article/:id" }) {
    if (!canActivate) {
        return <Navigate to={redirectPath} />;
    }

    return <Outlet />;
}

export default RutaProtegida;
