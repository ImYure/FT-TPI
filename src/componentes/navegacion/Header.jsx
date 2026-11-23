
import { Link, useLocation } from "wouter";
import { useState } from "react";

export default function Header() {

    const [, setUbicacion] = useLocation();

    const [usuario, setUsuario] = useState(() => {
        const datos = localStorage.getItem("usuario");

        if (datos) {
            return JSON.parse(datos);
        }

        return null;
    });

    function cerrarSesion() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        setUsuario(null);
        setUbicacion("/login");
    }

    return (
        <header className="header">

            <Link href="/inicio" className="logo">
                <span className="escudo"></span>
            </Link>

            <div className="header-acciones">

                {!usuario ? (
                    <>
                        <Link href="/login" className="link-login">
                            Iniciar sesión
                        </Link>

                        <Link href="/login" className="boton-registro">
                            Registrarse
                        </Link>
                    </>
                ) : (
                    <>
                        {Number(usuario.rol_id) === 1 && (
                            <span className="link-login">
                                ADMINISTRADOR
                            </span>
                        )}

                        <button
                            className="boton-registro"
                            onClick={cerrarSesion}
                        >
                            Cerrar sesión
                        </button>
                    </>
                )}

            </div>

        </header>
    );
}
