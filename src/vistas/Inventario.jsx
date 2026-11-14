import { Link } from "wouter";
import TiendaNavb from "../componentes/TiendaNavb.jsx";
import ListaProductos from "../componentes/ListaProductos.jsx";
import articulosDefault from "../datos/articulos.js";
import Saldo from "../componentes/Saldo.jsx";
export default function Inventario() {
  return (
    <header className="inventario">
      <h1>inventario 123</h1>

      <div className="inicio-contenido tienda">
      <div className="tienda-columna-derecha">
        <TiendaNavb />
        <ListaProductos articulos={articulosDefault} />
      </div>
      <Saldo />
    </div>
    </header>
  );
}
