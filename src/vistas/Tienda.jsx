import Filtros from "../componentes/Filtros.jsx";
import TiendaNavb from "../componentes/TiendaNavb.jsx";
import ListaProductos from "../componentes/ListaProductos.jsx";
import articulosDefault from "../datos/articulos.js";
import Saldo from "../componentes/Saldo.jsx";

export default function Tienda() {
  return (
    <div className="inicio-contenido tienda">
      <Filtros />
      <div className="tienda-columna-derecha">
        <TiendaNavb />
        <ListaProductos articulos={articulosDefault} />
      </div>
      <Saldo />
    </div>
  );
}