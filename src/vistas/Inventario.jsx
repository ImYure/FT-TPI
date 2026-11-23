import { useState } from "react";
import TiendaNavb from "../componentes/navegacion/TiendaNavb.jsx";
import ListaProductos from "../componentes/ListaProductos.jsx";
import TarjetaCarta from "../componentes/TarjetaCarta.jsx";
import TarjetaProductos from "../componentes/TarjetaProductos.jsx";
import SobreAnimado from "../componentes/aperturaSobres/SobreAnimado.jsx";
import articulosDefault from "../datos/articulos.js";
import Saldo from "../componentes/Saldo.jsx";
import "../estilos/DetalleCarta.css";

export default function Inventario() {
    const [articulos, setArticulos] = useState(articulosDefault);

    const [filtros, setFiltros] = useState({
        tipo: "todos",
    });

    const [articuloSeleccionado, setArticuloSeleccionado] = useState(
        articulosDefault[0] || null
    );

    const [sobreEnApertura, setSobreEnApertura] = useState(null);

    // Filtramos los artículos según el tipo seleccionado
    const articulosFiltrados = articulos.filter((item) => {
        if (filtros.tipo === "todos") return true;
        return item.tipo === filtros.tipo;
    });

    // Obtenemos solamente las cartas del inventario
    const cartasDisponibles = articulos.filter(
        (item) => item.tipo === "carta"
    );

    // Finalizamos la apertura y consumimos el sobre
    function finalizarApertura() {
        const restantes = articulos.filter(
            (item) => item.id !== sobreEnApertura.id
        );

        setArticulos(restantes);
        setArticuloSeleccionado(restantes[0] || null);
        setSobreEnApertura(null);
    }

    return (
        <section className="inventario">

            <div className="inicio-contenido tienda inventario-layout">

                {/* COLUMNA IZQUIERDA */}
                <div className="tienda-columna-derecha">

                    <div className="inicio-texto">
                        <div className="inicio-texto-icono">
                            <img src="/tienda.png" alt="tienda-icono" />
                            <h1>Inventario</h1>
                        </div>

                        <p>
                            El lugar donde se almacenan tus cartas y colecciones
                        </p>
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
                        onSeleccionar={(articulo) =>
                            setArticuloSeleccionado(articulo)
                        }
                    />

                </div>

                {/* COLUMNA DERECHA */}
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
                                    mostrarBotonAbrir={true}
                                    onAbrirSobre={() =>
                                        setSobreEnApertura(articuloSeleccionado)
                                    }
                                />
                            )}

                        </div>
                    )}

                </aside>

            </div>

            {/* APERTURA DE SOBRES */}
            {sobreEnApertura && (
                <SobreAnimado
                    sobre={sobreEnApertura}
                    cartasDisponibles={cartasDisponibles}
                    onCerrar={finalizarApertura}
                />
            )}

        </section>
    );
}