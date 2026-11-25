
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
    const [rareza, setRareza] = useState("");

    const [imagen, setImagen] = useState(null);
    const [vistaPrevia, setVistaPrevia] = useState("");

    const [sobres, setSobres] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [rarezas, setRarezas] = useState([]);

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
            const respuesta = await axios.get(API_SOBRES);

            setSobres(respuesta.data.sobres);

        } catch (error) {
            console.error("Error al cargar sobres:", error);
            alert("No se pudieron cargar los sobres.");
        }
    }

    // OBTENER CATEGORÍAS
    async function cargarCategorias() {

        try {
            const respuesta = await axios.get(`${API_CARTAS}/categorias`);

            setCategorias(respuesta.data.categorias);

        } catch (error) {
            console.error("Error al cargar categorías:", error);
        }
    }

    // OBTENER RAREZAS
    async function cargarRarezas() {

        try {
            const respuesta = await axios.get(`${API_CARTAS}/rareza`);

            setRarezas(respuesta.data.rarezas);

        } catch (error) {
            console.error("Error al cargar rarezas:", error);
        }
    }

    // CARGAR DATOS AL ABRIR
    useEffect(() => {

        Promise.all([
            cargarSobres(),
            cargarCategorias(),
            cargarRarezas()
        ]).finally(() => {
            setCargando(false);
        });

    }, []);

    // SELECCIONAR IMAGEN
    function seleccionarImagen(e) {

        const archivo = e.target.files[0];

        if (archivo) {
            setImagen(archivo);
            setVistaPrevia(URL.createObjectURL(archivo));
        }
    }

    // LIMPIAR FORMULARIO
    function limpiarFormulario() {

        setNombre("");
        setDescripcion("");
        setPrecio("");
        setCantidad("");
        setCategoria("");
        setRareza("");
        setImagen(null);
        setVistaPrevia("");

        setEditando(false);
        setSobreEditandoId(null);
    }

    // CREAR SOBRE
    // CREAR O EDITAR SOBRE
    async function crearSobre(e) {

        e.preventDefault();

        if (
            !nombre.trim() ||
            !descripcion.trim() ||
            precio === "" ||
            cantidad === "" ||
            !categoria ||
            !rareza ||
            (!editando && !imagen)
        ) {
            alert("Completá todos los campos y seleccioná una imagen.");
            return;
        }

        if (
            Number(precio) < 0 ||
            Number(cantidad) < 1 ||
            Number(cantidad) > 30
        ) {
            alert("Ingresá un precio válido y una cantidad entre 1 y 30.");
            return;
        }

        const datos = new FormData();

        datos.append("nombre", nombre);
        datos.append("descripcion", descripcion);
        datos.append("precio", precio);
        datos.append("cantidad_carta", cantidad);
        datos.append("categoria_id", categoria);
        datos.append("rareza_id", rareza);

        if (imagen) {
            datos.append("imagen", imagen);
        }

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

                alert("Sobre creado correctamente.");
            }

            limpiarFormulario();
            cargarSobres();

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
        setCategoria(sobre.categoria_id);
        setRareza(sobre.rareza_id);

        setImagen(null);

        setVistaPrevia(
            sobre.imagen
                ? `http://localhost:3000/imagenes/sobres/${sobre.imagen}`
                : ""
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

            cargarSobres();

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
                            <h3>{editando ? "Editar sobre" : "Crear sobre"}</h3>
                        </div>

                        <label htmlFor="imagen-sobre">
                            Imagen del sobre
                        </label>

                        <input
                            id="imagen-sobre"
                            type="file"
                            accept="image/png, image/jpeg, image/webp, image/gif, image/avif"
                            onChange={seleccionarImagen}
                        />

                        {vistaPrevia && (
                            <img
                                src={vistaPrevia}
                                alt="Vista previa"
                                className="sobre-imagen-preview"
                            />
                        )}

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

                                <label>Categoría</label>

                                <select
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                >
                                    <option value="">Seleccionar</option>

                                    {categorias.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nombre}
                                        </option>
                                    ))}

                                </select>

                            </div>

                            <div className="sobres-campo-grupo">

                                <label>Rareza</label>

                                <select
                                    value={rareza}
                                    onChange={(e) => setRareza(e.target.value)}
                                >
                                    <option value="">Seleccionar</option>

                                    {rarezas.map(r => (
                                        <option key={r.id} value={r.id}>
                                            {r.nombre}
                                        </option>
                                    ))}

                                </select>

                            </div>

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

                                            {sobre.imagen ? (
                                                <div className="sobre-imagen-contenedor">
                                                    <img
                                                        src={`http://localhost:3000/imagenes/sobres/${sobre.imagen}`}
                                                        alt={sobre.nombre}
                                                    />
                                                </div>
                                            ) : (

                                                <div className="sobre-paquete">
                                                    <div className="sobre-escudo-centro"></div>
                                                </div>

                                            )}

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
                                                {sobre.categoria} - {sobre.rareza}
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
