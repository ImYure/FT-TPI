
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "wouter";
import Footer from "../../componentes/navegacion/Footer";
import "../../estilos/sobresAdmin.css";

const API_SOBRES = "http://localhost:3000/sobres";
const API_CARTAS = "http://localhost:3000/cartas";

export default function SobresAdmin({ integrado = false }) {

    const [editando, setEditando] = useState(false);
    const [sobreEditandoId, setSobreEditandoId] = useState(null);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [categoria, setCategoria] = useState("");

    const [sobres, setSobres] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [cartasDisponibles, setCartasDisponibles] = useState([]);
    const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);

    const [cargando, setCargando] = useState(true);

    // CONFIGURACIÓN DEL TOKEN
    function obtenerConfig() {

        const token = localStorage.getItem("token");

        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    }

    // OBTENER SOBRES
    async function cargarSobres() {

        try {

            const respuesta = await axios.get(
                API_SOBRES,
                obtenerConfig()
            );

            setSobres(respuesta.data.sobres || []);

        } catch (error) {

            console.error("Error al cargar sobres:", error);
            throw error;
        }
    }

    // OBTENER CARTAS DISPONIBLES
    async function cargarCartas() {

        try {

            const respuesta = await axios.get(
                API_CARTAS,
                obtenerConfig()
            );

            setCartasDisponibles(respuesta.data.cartas || []);

        } catch (error) {

            console.error("Error al cargar cartas:", error);
            throw error;
        }
    }

    // OBTENER CATEGORÍAS
    async function cargarCategorias() {

        try {

            const respuesta = await axios.get(
                `${API_CARTAS}/categorias`,
                obtenerConfig()
            );

            setCategorias(respuesta.data.categorias || []);

        } catch (error) {

            console.error("Error al cargar categorías:", error);
            throw error;
        }
    }

    // CARGAR DATOS AL ENTRAR
    useEffect(() => {

        async function cargarDatos() {

            try {

                await Promise.all([
                    cargarSobres(),
                    cargarCartas(),
                    cargarCategorias()
                ]);

            } catch (error) {

                console.error("Error al cargar los datos:", error);

            } finally {

                setCargando(false);
            }
        }

        cargarDatos();

    }, []);

    // LIMPIAR FORMULARIO
    function limpiarFormulario() {

        setNombre("");
        setDescripcion("");
        setPrecio("");
        setCantidad("");
        setCategoria("");
        setCartasSeleccionadas([]);

        setEditando(false);
        setSobreEditandoId(null);
    }

    // SELECCIONAR O DESELECCIONAR UNA CARTA
    function cambiarSeleccionCarta(carta) {

        const existe = cartasSeleccionadas.some(
            seleccionada => Number(seleccionada.id) === Number(carta.id)
        );

        if (existe) {

            setCartasSeleccionadas(
                cartasSeleccionadas.filter(
                    seleccionada => Number(seleccionada.id) !== Number(carta.id)
                )
            );

        } else {

            setCartasSeleccionadas([
                ...cartasSeleccionadas,
                {
                    id: Number(carta.id),
                    probabilidad: 0
                }
            ]);
        }
    }

    // CAMBIAR PROBABILIDAD DE UNA CARTA
    function cambiarProbabilidad(id, valor) {

        setCartasSeleccionadas(
            cartasSeleccionadas.map(carta => {

                if (Number(carta.id) === Number(id)) {

                    return {
                        ...carta,
                        probabilidad: valor
                    };
                }

                return carta;
            })
        );
    }

    // CREAR O EDITAR SOBRE
    async function crearSobre(e) {

        e.preventDefault();

        if (
            !nombre.trim() ||
            !descripcion.trim() ||
            precio === "" ||
            cantidad === "" ||
            !categoria
        ) {

            alert("Completá todos los campos.");
            return;
        }

        if (
            !Number.isFinite(Number(precio)) ||
            Number(precio) < 0 ||
            !Number.isInteger(Number(cantidad)) ||
            Number(cantidad) < 1 ||
            Number(cantidad) > 30
        ) {

            alert("Ingresá un precio válido y una cantidad entre 1 y 30.");
            return;
        }

        // VALIDAR CARTAS
        if (cartasSeleccionadas.length === 0) {

            alert("Seleccioná al menos una carta para el sobre.");
            return;
        }

        for (const carta of cartasSeleccionadas) {

            const probabilidad = Number(carta.probabilidad);

            if (
                !Number.isFinite(probabilidad) ||
                probabilidad < 0 ||
                probabilidad > 100
            ) {

                alert("Las probabilidades deben estar entre 0 y 100.");
                return;
            }
        }

        const datos = {

            nombre: nombre.trim(),
            descripcion: descripcion.trim(),
            precio: precio,
            cantidad_carta: cantidad,
            categoria_id: categoria,

            cartas: cartasSeleccionadas.map(carta => ({

                id: Number(carta.id),
                probabilidad: Number(carta.probabilidad)

            }))
        };

        try {

            if (editando) {

                await axios.put(
                    `${API_SOBRES}/${sobreEditandoId}`,
                    datos,
                    obtenerConfig()
                );

                alert("Sobre actualizado correctamente.");

            } else {

                await axios.post(
                    API_SOBRES,
                    datos,
                    obtenerConfig()
                );

                alert("Sobre y cartas guardados correctamente.");
            }

            limpiarFormulario();
            await cargarSobres();

        } catch (error) {

            console.error("Error al guardar sobre:", error);

            alert(
                error.response?.data?.mensaje ||
                "No se pudo guardar el sobre."
            );
        }
    }

    // EDITAR SOBRE
    function editarSobre(sobre) {

        setNombre(sobre.nombre);
        setDescripcion(sobre.descripcion);
        setPrecio(sobre.precio);
        setCantidad(sobre.cantidad_carta);
        setCategoria(String(sobre.categoria_id));

        // RECUPERAR LAS CARTAS DEL SOBRE
        setCartasSeleccionadas(
            (sobre.cartas || []).map(carta => ({

                id: Number(carta.id),
                probabilidad: Number(carta.probabilidad)

            }))
        );

        setEditando(true);
        setSobreEditandoId(sobre.id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // ELIMINAR SOBRE
    async function eliminarSobre(id) {

        const confirmar = window.confirm(
            "¿Estás seguro de que querés eliminar este sobre?"
        );

        if (!confirmar) return;

        try {

            await axios.delete(
                `${API_SOBRES}/${id}`,
                obtenerConfig()
            );

            alert("Sobre eliminado correctamente.");

            if (sobreEditandoId === id) {

                limpiarFormulario();
            }

            await cargarSobres();

        } catch (error) {

            console.error("Error al eliminar sobre:", error);

            alert(
                error.response?.data?.mensaje ||
                "No se pudo eliminar el sobre."
            );
        }
    }

    return (

        <div className="sobres-pagina">

            {!integrado && (

                <header className="sobres-header">

                    <div
                        className="sobres-logo-escudo"
                        title="Panel Admin"
                    ></div>

                    <h1>Admin</h1>

                </header>

            )}

            {!integrado && (

                <nav className="sobres-navbar">

                    <Link href="/perfilAdmin" className="nav-item">
                        <span>Cartas</span>
                    </Link>

                    <Link href="/sobresAdmin" className="nav-item activo">
                        <span>Sobres</span>
                    </Link>

                    <Link href="/perfilesAdmin" className="nav-item">
                        <span>Perfiles</span>
                    </Link>

                </nav>

            )}

            <main className="sobres-contenido">

                <div className="sobres-titulo-seccion">

                    <h2>Administrar sobres</h2>

                    <p>
                        Creá y administrá los sobres del juego.
                    </p>

                </div>

                <div className="sobres-columnas">

                    {/* FORMULARIO */}

                    <form
                        className="sobres-formulario"
                        onSubmit={crearSobre}
                    >

                        <div className="sobres-form-header">

                            <h3>
                                {editando ? "Editar sobre" : "Crear sobre"}
                            </h3>

                        </div>

                        <label htmlFor="nombre-sobre">
                            Nombre del sobre
                        </label>

                        <input
                            id="nombre-sobre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />

                        <label htmlFor="descripcion-sobre">
                            Descripción
                        </label>

                        <textarea
                            id="descripcion-sobre"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />

                        <div className="sobres-fila-doble">

                            <div className="sobres-campo-grupo">

                                <label htmlFor="cantidad-sobre">
                                    Cantidad de cartas
                                </label>

                                <input
                                    id="cantidad-sobre"
                                    type="number"
                                    min="1"
                                    max="30"
                                    value={cantidad}
                                    onChange={(e) => setCantidad(e.target.value)}
                                />

                            </div>

                            <div className="sobres-campo-grupo">

                                <label htmlFor="precio-sobre">
                                    Precio
                                </label>

                                <input
                                    id="precio-sobre"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                />

                            </div>

                        </div>

                        <div className="sobres-fila-doble">

                            <div className="sobres-campo-grupo">

                                <label htmlFor="categoria-sobre">
                                    Categoría
                                </label>

                                <select
                                    id="categoria-sobre"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                >

                                    <option value="">
                                        Seleccionar
                                    </option>

                                    {categorias.map(cat => (

                                        <option key={cat.id} value={cat.id}>
                                            {cat.nombre}
                                        </option>

                                    ))}

                                </select>

                            </div>

                        </div>

                        {/* SELECCIÓN DE CARTAS */}

                        <div className="sobres-seleccion-cartas">

                            <h3>
                                Cartas que contiene el sobre
                            </h3>

                            <p>
                                Seleccioná las cartas que podrán salir al abrirlo.
                            </p>

                            {cargando ? (

                                <p>Cargando cartas...</p>

                            ) : cartasDisponibles.length === 0 ? (

                                <p>No hay cartas disponibles.</p>

                            ) : (

                                <div className="sobres-cartas-lista">

                                    {cartasDisponibles.map(carta => {

                                        const seleccionada =
                                            cartasSeleccionadas.some(
                                                item => Number(item.id) === Number(carta.id)
                                            );

                                        const datosSeleccionados =
                                            cartasSeleccionadas.find(
                                                item => Number(item.id) === Number(carta.id)
                                            );

                                        return (

                                            <div
                                                className="sobres-carta-opcion"
                                                key={carta.id}
                                            >

                                                <label>

                                                    <input
                                                        type="checkbox"
                                                        checked={seleccionada}
                                                        onChange={() =>
                                                            cambiarSeleccionCarta(carta)
                                                        }
                                                    />

                                                    <span>
                                                        {carta.nombre}
                                                    </span>

                                                </label>

                                                {seleccionada && (

                                                    <div className="sobres-carta-probabilidad">

                                                        <label>
                                                            Probabilidad (%)
                                                        </label>

                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="100"
                                                            step="0.01"
                                                            value={datosSeleccionados.probabilidad}
                                                            onChange={(e) =>
                                                                cambiarProbabilidad(
                                                                    carta.id,
                                                                    e.target.value
                                                                )
                                                            }
                                                        />

                                                    </div>

                                                )}

                                            </div>

                                        );

                                    })}

                                </div>

                            )}

                            <p>
                                Cartas seleccionadas: {cartasSeleccionadas.length}
                            </p>

                        </div>

                        <div className="sobres-formulario-acciones">

                            <button
                                type="button"
                                className="sobre-cancelar"
                                onClick={limpiarFormulario}
                            >
                                Limpiar
                            </button>

                            <button
                                type="submit"
                                className="sobre-btn-guardar"
                            >
                                {editando ? "Guardar cambios" : "Crear sobre"}
                            </button>

                        </div>

                    </form>

                    {/* LISTADO */}

                    <section className="sobres-listado">

                        <h3>Sobres creados</h3>

                        {cargando ? (

                            <p>Cargando sobres...</p>

                        ) : sobres.length === 0 ? (

                            <p className="sobres-vacio">
                                Todavía no hay sobres creados.
                            </p>

                        ) : (

                            <div className="sobres-lista">

                                {sobres.map(sobre => (

                                    <article
                                        className="sobre-item"
                                        key={sobre.id}
                                    >

                                        <div className="sobre-visual">

                                            <div className="sobre-paquete">
                                                <div className="sobre-escudo-centro"></div>
                                            </div>

                                        </div>

                                        <div className="sobre-info">

                                            <strong className="sobre-titulo-card">
                                                {sobre.nombre}
                                            </strong>

                                            <span className="sobre-desc-card">
                                                {sobre.descripcion}
                                            </span>

                                            <span className="sobre-meta-card">
                                                {sobre.cantidad_carta} cartas · {sobre.precio} monedas
                                            </span>

                                            <span className="sobre-incluye-card">
                                                {sobre.categoria}
                                            </span>

                                            <div className="sobre-acciones">

                                                <button
                                                    type="button"
                                                    onClick={() => editarSobre(sobre)}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => eliminarSobre(sobre.id)}
                                                >
                                                    Eliminar
                                                </button>

                                            </div>

                                        </div>

                                    </article>

                                ))}

                            </div>

                        )}

                    </section>

                </div>

            </main>

            {!integrado && <Footer />}

        </div>
    );
}
