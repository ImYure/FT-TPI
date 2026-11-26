
import { useState, useEffect } from "react";
import axios from "axios";

import Filtros from "../componentes/Filtros.jsx";
import TiendaNavb from "../componentes/navegacion/TiendaNavb.jsx";
import ListaProductos from "../componentes/ListaProductos.jsx";
import Saldo from "../componentes/Saldo.jsx";
import PaquetesMonedas from "../componentes/PaquetesMonedas.jsx";

export default function Tienda() {
    const [articulos, setArticulos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [rarezas, setRarezas] = useState([]);
    const [saldo, setSaldo] = useState(0);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [comprandoId, setComprandoId] = useState(null);

    const [filtros, setFiltros] = useState({
        tipo: "todos",
        categoria: "todos",
        rareza: [],
        orden: "ninguno"
    });

    // Obtener categorías y rarezas
    useEffect(() => {
        axios.all([
            axios.get("http://localhost:3000/cartas/categorias"),
            axios.get("http://localhost:3000/cartas/rareza")
        ]).then(([respuestaCategorias, respuestaRarezas]) => {
            setCategorias(respuestaCategorias.data.categorias || []);
            setRarezas(respuestaRarezas.data.rarezas || []);
        }).catch((error) => {
            console.error("Error al obtener los filtros:", error);
        });
    }, []);

    // Obtener cartas y sobres
    useEffect(() => {
        if (filtros.tipo === "monedas") {
            setCargando(false);
            return;
        }

        setCargando(true);
        setError("");

        axios.all([
            axios.get("http://localhost:3000/cartas", {
                params: {
                    categoria: filtros.categoria,
                    rareza: filtros.rareza.join(","),
                    orden: filtros.orden
                }
            }),
            axios.get("http://localhost:3000/sobres", {
                params: {
                    categoria: filtros.categoria,
                    rareza: filtros.rareza.join(","),
                    orden: filtros.orden
                }
            })
        ]).then(([respuestaCartas, respuestaSobres]) => {
            const cartas = (respuestaCartas.data.cartas || []).map(carta => ({
                ...carta,
                tipo: "carta"
            }));

            const sobres = (respuestaSobres.data.sobres || []).map(sobre => ({
                ...sobre,
                tipo: "sobre"
            }));

            setArticulos([...cartas, ...sobres]);

        }).catch((error) => {
            console.error("Error al obtener los artículos:", error);
            setError("No se pudieron cargar los artículos.");

        }).finally(() => {
            setCargando(false);
        });

    }, [
        filtros.tipo,
        filtros.categoria,
        filtros.rareza,
        filtros.orden
    ]);

    // Actualizar el saldo del jugador
    function actualizarSaldo() {
        const token = localStorage.getItem("token");

        if (!token) return;

        axios.get("http://localhost:3000/productos/saldo", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((respuesta) => {
            setSaldo(Number(respuesta.data.saldo));
        }).catch((error) => {
            console.error("Error al obtener el saldo:", error);
        });
    }

    useEffect(() => {
        actualizarSaldo();
    }, []);

    // Comprar un sobre
    async function comprarSobre(articulo) {
        const token = localStorage.getItem("token");

        if (!token) {
            setMensaje("Tenés que iniciar sesión para comprar un sobre.");
            return;
        }

        setComprandoId(articulo.id);
        setMensaje("");

        try {
            const respuesta = await axios.post(
                `http://localhost:3000/sobres/comprar/${articulo.id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSaldo(Number(respuesta.data.saldo));
            setMensaje(
                respuesta.data.mensaje || "¡Sobre comprado correctamente!"
            );

        } catch (error) {
            console.error("Error al comprar el sobre:", error);

            if (error.response && error.response.data) {
                setMensaje(
                    error.response.data.mensaje ||
                    "No se pudo comprar el sobre."
                );
            } else {
                setMensaje("No se pudo conectar con el servidor.");
            }

            actualizarSaldo();

        } finally {
            setComprandoId(null);
        }
    }

    // Comprar una carta
    async function comprarCarta(carta) {
        const token = localStorage.getItem("token");

        if (!token) {
            setMensaje("Tenés que iniciar sesión para comprar una carta.");
            return;
        }

        setComprandoId(carta.id);
        setMensaje("");

        try {
            const respuesta = await axios.post(
                `http://localhost:3000/cartas/comprar/${carta.id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSaldo(Number(respuesta.data.saldo));
            setMensaje(
                respuesta.data.mensaje || "¡Carta comprada correctamente!"
            );

        } catch (error) {
            console.error("Error al comprar la carta:", error);

            if (error.response && error.response.data) {
                setMensaje(
                    error.response.data.mensaje ||
                    "No se pudo comprar la carta."
                );
            } else {
                setMensaje("No se pudo conectar con el servidor.");
            }

            actualizarSaldo();

        } finally {
            setComprandoId(null);
        }
    }

    // Aplicar filtros
    const articulosFiltrados = articulos.filter((articulo) => {
        if (filtros.tipo === "todos") return true;
        if (filtros.tipo === "carta") return articulo.tipo === "carta";
        if (filtros.tipo === "sobre") return articulo.tipo === "sobre";

        return false;
    });

    return (
        <div className="inicio-contenido tienda">

            {filtros.tipo !== "monedas" && (
                <Filtros
                    filtros={filtros}
                    onChange={setFiltros}
                    categorias={categorias}
                    rarezas={rarezas}
                />
            )}

            <div className="tienda-columna-derecha">

                <div className="inicio-texto">
                    <div className="inicio-texto-icono">
                        <img src="/tienda.png" alt="tienda-icono" />
                        <h1>Tienda</h1>
                    </div>

                    <p>Adquirí cartas, sobres y objetos para tu colección</p>
                </div>

                <TiendaNavb
                    tipo={filtros.tipo}
                    onChange={(tipo) => {
                        setMensaje("");
                        setFiltros({ ...filtros, tipo: tipo });
                    }}
                />

                {mensaje && (
                    <p className="mensaje-compra" role="status">
                        {mensaje}
                    </p>
                )}

                {filtros.tipo === "monedas" ? (
                    <PaquetesMonedas actualizarSaldo={actualizarSaldo} />
                ) : (
                    cargando ? (
                        <p>Cargando artículos...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : articulosFiltrados.length === 0 ? (
                        <p>No se encontraron artículos.</p>
                    ) : (
                        <ListaProductos
                            articulos={articulosFiltrados}
                            mostrarPrecio={true}
                            onComprar={comprarSobre}
                            onComprarCarta={comprarCarta}
                            comprandoId={comprandoId}
                        />
                    )
                )}

            </div>

            <Saldo saldo={saldo} />

        </div>
    );
}
