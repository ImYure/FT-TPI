
import { Link } from "wouter";

export default function Header() {
  return (
    <header className="header">
      <Link href="/inicio" className="logo">
        <span className="escudo"></span>
      </Link>

      <div className="header-acciones">
        <Link href="/login" className="link-login">
          Iniciar sesión
        </Link>

        <Link href="/registro" className="boton-registro">
          Registrarse
        </Link>

      </div>
    </header>
  );
}
