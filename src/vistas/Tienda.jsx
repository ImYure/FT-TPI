import { useState } from "react";
import Filtros from "../componentes/Filtros.jsx";
import TiendaNavb from "../componentes/navegacion/TiendaNavb.jsx";
import ListaProductos from "../componentes/ListaProductos.jsx";
import articulosDefault from "../datos/articulos.js";
import Saldo from "../componentes/Saldo.jsx";

export default function Tienda() {
  
  const [filtros, setFiltros] = useState({
    tipo: "todos",
    categoria: "todos",
    rareza: [],
    orden: "ninguno"
  });

  // 1. Aplicar filtros
  let articulosFiltrados = articulosDefault.filter((articulo) => {
    // Filtrar por tipo
    const coincideTipo =
      filtros.tipo === "todos" ||
      articulo.tipo === filtros.tipo;

    // Filtrar por rareza (si el array de rareza está vacío, pasan todos; si no, evalúa si incluye la rareza del artículo)
    const coincideRareza =
      filtros.rareza.length === 0 ||
      filtros.rareza.includes(articulo.rareza);
    // Filtrar por categoría
    const coincideCategoria =
      filtros.categoria === "todos" ||
      articulo.categoria === filtros.categoria;
    return coincideTipo && coincideCategoria && coincideRareza;
  });

  // 2. Ordenar artículos
  if (filtros.orden === "precio") {
    articulosFiltrados.sort((a, b) => a.precio - b.precio);
  }

  if (filtros.orden === "reciente") {
    articulosFiltrados.sort((a, b) => b.id - a.id);
  }

  return (

    <div className="inicio-contenido tienda">
      <Filtros
        filtros={filtros}
        onChange={setFiltros}
      />
      <div className="tienda-columna-derecha">
        <div className="inicio-texto">
          <div className="inicio-texto-icono">
            <img src="../public/tienda.png" alt="tienda-icono" />
            <h1>Tienda</h1>
          </div>

          <p>Adquirí cartas, sobres y objetos para tu colección</p>
        </div>
        <TiendaNavb
          tipo={filtros.tipo}
          onChange={(tipo) =>
            setFiltros({
              ...filtros,
              tipo: tipo
            })
          }
        />
        <ListaProductos articulos={articulosFiltrados} mostrarPrecio={true} />
      </div>

      <Saldo />
    </div>
  );
}