
import { useState, useEffect } from "react";
import axios from "axios";

import TiendaNavb from "../componentes/navegacion/TiendaNavb.jsx";
import ListaProductos from "../componentes/ListaProductos.jsx";
import TarjetaCarta from "../componentes/TarjetaCarta.jsx";
import TarjetaProductos from "../componentes/TarjetaProductos.jsx";
import SobreAnimado from "../componentes/aperturaSobres/SobreAnimado.jsx";
import Saldo from "../componentes/Saldo.jsx";

import "../estilos/DetalleCarta.css";

export default function Inventario() {

    const [articulos, setArticulos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [filtros, setFiltros] = useState({
        tipo: "todos"
    });

    const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);

    const [sobreEnApertura, setSobreEnApertura] = useState(null);
    const [cartasObtenidas, setCartasObtenidas] = useState([]);

    const [cargandoApertura, setCargandoApertura] = useState(false);
    const [errorApertura, setErrorApertura] = useState("");


    // CARGAR INVENTARIO
    async function cargarInventario() {

        const token = localStorage.getItem("token");

        if (!token) {
            setError("Tenés que iniciar sesión para ver tu inventario.");
            setCargando(false);
            return;
        }

        setCargando(true);
        setError("");

        try {

            const configuracion = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const [respuestaCartas, respuestaSobres] = await Promise.all([

                axios.get(
                    "http://localhost:3000/cartas/mis-cartas",
                    configuracion
                ),

                axios.get(
                    "http://localhost:3000/sobres/mis-sobres",
                    configuracion
                )

            ]);

            const cartas = (respuestaCartas.data.cartas || []).map(carta => ({
                ...carta,
                tipo: "carta"
            }));


            // OBTENER LOS SOBRES DEL INVENTARIO
            const datosSobres = Array.isArray(respuestaSobres.data)
                ? respuestaSobres.data
                : (respuestaSobres.data.sobres || []);

            const sobres = datosSobres.map(sobre => ({
                ...sobre,
                tipo: "sobre"
            }));


            const inventarioCompleto = [...cartas, ...sobres];

            setArticulos(inventarioCompleto);

            setArticuloSeleccionado(anterior => {

                if (!anterior) {
                    return inventarioCompleto[0] || null;
                }

                return inventarioCompleto.find(
                    item =>
                        item.tipo === anterior.tipo &&
                        item.id === anterior.id
                ) || inventarioCompleto[0] || null;

            });

        } catch (error) {

            console.error("Error al cargar el inventario:", error);

            if (error.response && error.response.status === 401) {
                setError("Tu sesión venció. Volvé a iniciar sesión.");
            } else {
                setError("No se pudo cargar tu inventario.");
            }

        } finally {
            setCargando(false);
        }
    }


    useEffect(() => {
        cargarInventario();
    }, []);


    // APLICAR FILTROS
    const articulosFiltrados = articulos.filter(item => {

        if (filtros.tipo === "todos") {
            return true;
        }

        return item.tipo === filtros.tipo;

    });


    // ABRIR SOBRE
    async function abrirSobre() {

        if (!articuloSeleccionado || cargandoApertura) {
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            setErrorApertura("Tenés que iniciar sesión.");
            return;
        }

        setCargandoApertura(true);
        setErrorApertura("");
        setCartasObtenidas([]);

        try {

            const respuesta = await axios.post(
                `http://localhost:3000/sobres/abrir/${articuloSeleccionado.id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // GUARDAR LAS CARTAS QUE DEVUELVE EL BACKEND
            setCartasObtenidas(respuesta.data.cartasObtenidas || []);

            // MOSTRAR LA ANIMACIÓN
            setSobreEnApertura(articuloSeleccionado);

        } catch (error) {

            console.error("Error al abrir el sobre:", error);

            if (error.response && error.response.data) {
                setErrorApertura(
                    error.response.data.mensaje ||
                    "No se pudo abrir el sobre."
                );
            } else {
                setErrorApertura("No se pudo conectar con el servidor.");
            }

        } finally {
            setCargandoApertura(false);
        }
    }


    // CERRAR RESULTADO Y ACTUALIZAR INVENTARIO
    function finalizarApertura() {

        setSobreEnApertura(null);
        setCartasObtenidas([]);
        setErrorApertura("");

        cargarInventario();
    }


    return (
        <section className="inventario">

            <div className="inicio-contenido tienda inventario-layout">

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
                        onChange={nuevoTipo =>
                            setFiltros({ ...filtros, tipo: nuevoTipo })
                        }
                        titulo="Inventario"
                        descripcion="Consultá y organizá los artículos de tu colección"
                    />


                    {cargando ? (

                        <p>Cargando inventario...</p>

                    ) : error ? (

                        <p>{error}</p>

                    ) : articulosFiltrados.length === 0 ? (

                        <p>Todavía no tenés artículos en esta sección.</p>

                    ) : (

                        <ListaProductos
                            articulos={articulosFiltrados}
                            mostrarPrecio={false}
                            onSeleccionar={setArticuloSeleccionado}
                        />

                    )}

                </div>


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
                                    onAbrirSobre={abrirSobre}
                                />

                            )}

                        </div>

                    )}


                    {cargandoApertura && (
                        <p>Abriendo sobre...</p>
                    )}

                    {errorApertura && (
                        <p>{errorApertura}</p>
                    )}

                </aside>

            </div>


            {sobreEnApertura && (

                <SobreAnimado
                    sobre={sobreEnApertura}
                    cartasObtenidas={cartasObtenidas}
                    onCerrar={finalizarApertura}
                />

            )}

        </section>
    );
}
