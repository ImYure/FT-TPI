
import { Link, useLocation } from "wouter";

export default function Navb() {
  const [location] = useLocation();

  return (
    <nav className="navbar">
      <Link
        className={`opcion ${location === "/inventario" ? "activa" : ""}`}
        href="/inventario"
      >
        <span>♙</span> Inventario
      </Link>

      <Link
        className={`opcion ${location === "/pvp" ? "activa" : ""}`}
        href="/pvp"
      >
        <span>▤</span> PvP
      </Link>

      <Link
        className={`opcion ${location === "/inicio" ? "activa" : ""}`}
        href="/inicio"
      >
        <span>⌂</span> Inicio
      </Link>

      <Link
        className={`opcion ${location === "/tienda" ? "activa" : ""}`}
        href="/tienda"
      >
        <span>▣</span> Tienda
      </Link>

      <Link
        className={`opcion ${location === "/perfil" ? "activa" : ""}`}
        href="/perfil"
      >
        <span>♙</span> Perfil
      </Link>
    </nav>
  );
}
