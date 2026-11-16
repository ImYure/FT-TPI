import { useState } from "react";
import TiendaNavb from "../componentes/navegacion/TiendaNavb.jsx";
import ListaProductos from "../componentes/ListaProductos.jsx";
import TarjetaCarta from "../componentes/TarjetaCarta.jsx";
import TarjetaProductos from "../componentes/TarjetaProductos.jsx";
import articulosDefault from "../datos/articulos.js";
import Saldo from "../componentes/Saldo.jsx";
import "../estilos/DetalleCarta.css"; // Ajustá esta ruta según dónde esté DetalleCarta.css

export default function Inventario() {
  const [filtros, setFiltros] = useState({
    tipo: "todos",
  });

  // Guarda la carta o sobre seleccionado (arranca mostrando el primero)
  const [articuloSeleccionado, setArticuloSeleccionado] = useState(
    articulosDefault[0] || null
  );

  // Filtrar artículos por tipo
  const articulosFiltrados = articulosDefault.filter((item) => {
    if (filtros.tipo === "todos") return true;
    return item.tipo === filtros.tipo;
  });

  return (
    <header className="inventario">
      <div className="inicio-contenido tienda inventario-layout">
        
        {/* COLUMNA IZQUIERDA: Encabezado, filtros y grilla */}
        <div className="tienda-columna-derecha">
          <div className="inicio-texto">
            <div className="inicio-texto-icono">
              <img src="/tienda.png" alt="tienda-icono" />
              <h1>Inventario</h1>
            </div>
            <p>El lugar donde se almacenan tus cartas y colecciones</p>
          </div>

          <TiendaNavb
            tipo={filtros.tipo}
            onChange={(nuevoTipo) =>
              setFiltros({
                ...filtros,
                tipo: nuevoTipo,
              })
            }
            titulo="Inventario"
            descripcion="Consultá y organizá los artículos de tu colección"
          />

          <ListaProductos
            articulos={articulosFiltrados}
            mostrarPrecio={false}
            onSeleccionar={(articulo) => setArticuloSeleccionado(articulo)}
          />
        </div>

        {/* COLUMNA DERECHA: Saldo arriba + Vista ampliada abajo */}
        <aside className="inventario-panel-derecho">
          <Saldo />

          {articuloSeleccionado && (
            <div className="detalle-carta-contenedor">
              {articuloSeleccionado.tipo === "carta" ? (
                <TarjetaCarta
                  carta={articuloSeleccionado}
                  mostrarPrecio={false}
                />
              ) : (
                <TarjetaProductos
                  {...articuloSeleccionado}
                  mostrarPrecio={false}
                />
              )}
            </div>
          )}
        </aside>

      </div>
    </header>
  );
}