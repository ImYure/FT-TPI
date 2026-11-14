import { useState } from "react";
import { Link } from "wouter";
import Footer from "../componentes/Footer";
import "../sobresAdmin.css";

function SobresAdmin() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [cantidad, setCantidad] = useState("");

    const [cartasDisponibles, setCartasDisponibles] = useState([]);
    const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);
    const [sobres, setSobres] = useState([]);
    const [editando, setEditando] = useState(null);

    function agregarCarta() {
        const nuevaCarta = prompt("Ingresá el nombre de la nueva carta:");

        if (nuevaCarta && nuevaCarta.trim() !== "") {
            const cartaLimpia = nuevaCarta.trim();

            if (!cartasDisponibles.includes(cartaLimpia)) {
                setCartasDisponibles([...cartasDisponibles, cartaLimpia]);
            } else {
                alert("Esa carta ya está en la lista.");
            }
        }
    }

    function seleccionarCarta(carta) {
        if (cartasSeleccionadas.includes(carta)) {
            setCartasSeleccionadas(cartasSeleccionadas.filter((item) => item !== carta));
        } else {
            setCartasSeleccionadas([...cartasSeleccionadas, carta]);
        }
    }

    function limpiarFormulario() {
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setCantidad("");
        setCartasSeleccionadas([]);
        setEditando(null);
    }

    function crearSobre(e) {
        e.preventDefault();

        if (
            nombre.trim() === "" ||
            descripcion.trim() === "" ||
            precio === "" ||
            cantidad === ""
        ) {
            alert("Completá todos los campos.");
            return;
        }

        if (Number(precio) < 0 || Number(cantidad) < 1) {
            alert("Ingresá un precio válido y una cantidad mayor a cero.");
            return;
        }

        const nuevoSobre = {
            id: editando ? editando : Date.now(),
            nombre: nombre.trim(),
            descripcion: descripcion.trim(),
            precio: Number(precio),
            cantidad: Number(cantidad),
            cartas: [...cartasSeleccionadas]
        };

        if (editando) {
            setSobres(sobres.map((sobre) => (sobre.id === editando ? nuevoSobre : sobre)));
        } else {
            setSobres([...sobres, nuevoSobre]);
        }

        limpiarFormulario();
    }

    function editarSobre(sobre) {
        setNombre(sobre.nombre);
        setDescripcion(sobre.descripcion);
        setPrecio(String(sobre.precio));
        setCantidad(String(sobre.cantidad));
        setCartasSeleccionadas([...sobre.cartas]);
        setEditando(sobre.id);

        setCartasDisponibles((actuales) => [...new Set([...actuales, ...sobre.cartas])]);
    }

    function eliminarSobre(id) {
        const confirmar = window.confirm("¿Estás seguro de que querés borrar este sobre?");

        if (confirmar) {
            setSobres(sobres.filter((sobre) => sobre.id !== id));

            if (editando === id) {
                limpiarFormulario();
            }
        }
    }

    return (
        <div className="sobres-pagina">
            <header className="sobres-header">
                <div className="sobres-logo-escudo" title="Panel Admin"></div>
                <h1>Admin</h1>
            </header>

            <nav className="sobres-navbar">
                <Link href="/perfilAdmin" className="nav-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 11l9-8 9 8" />
                      <path d="M5 10v10h5v-6h4v6h5V10" />
                    </svg>
                    <span>Cartas</span>
                </Link>
                <Link href="/sobresAdmin" className="nav-item activo">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                    </svg>
                    <span>Sobres</span>
                </Link>
                <Link href="/perfilesAdmin" className="nav-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                    </svg>
                    <span>Perfiles</span>
                </Link>
            </nav>

            <main className="sobres-contenido">
                <div className="sobres-titulo-seccion">
                    <h2>Administrar sobres</h2>
                    <p>Elegí qué cartas contiene cada sobre y definí su precio.</p>
                </div>

                <div className="sobres-columnas">
                    {/* FORMULARIO */}
                    <form className="sobres-formulario" onSubmit={crearSobre}>
                        <div className="sobres-form-header">
                            <h3>{editando ? "Editar sobre" : "Crear sobre"}</h3>
                            <button type="button" className="sobre-btn-mini" onClick={agregarCarta}>
                                Cartas
                            </button>
                        </div>

                        <label htmlFor="nombre-sobre">Nombre del sobre</label>
                        <textarea
                            id="nombre-sobre"
                            className="input-nombre-grande"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />

                        <label htmlFor="descripcion-sobre" className="label-descripcion">
                            Descripción
                        </label>
                        <input
                            id="descripcion-sobre"
                            type="text"
                            placeholder="Ej: leon kennedy"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />

                        <div className="sobres-fila-doble">
                            <div className="sobres-campo-grupo">
                                <label htmlFor="cantidad-sobre">Cantidad de cartas</label>
                                <input
                                    id="cantidad-sobre"
                                    type="number"
                                    min="1"
                                    placeholder="Ej: 5"
                                    value={cantidad}
                                    onChange={(e) => setCantidad(e.target.value)}
                                />
                            </div>

                            <div className="sobres-campo-grupo">
                                <label htmlFor="precio-sobre">Precio</label>
                                <input
                                    id="precio-sobre"
                                    type="number"
                                    min="0"
                                    placeholder="Ej: 100"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sobres-cartas">
                            <label className="label-con-linea">Elegí las cartas que incluye</label>

                            {cartasDisponibles.length > 0 ? (
                                <div className="sobres-cartas-lista">
                                    {cartasDisponibles.map((carta) => (
                                        <label
                                            className={`sobre-carta-card ${
                                                cartasSeleccionadas.includes(carta) ? "seleccionada" : ""
                                            }`}
                                            key={carta}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={cartasSeleccionadas.includes(carta)}
                                                onChange={() => seleccionarCarta(carta)}
                                            />
                                            <span>{carta}</span>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <p className="sobres-sin-cartas">
                                    Todavía no hay cartas agregadas. Tocá "Cartas" arriba.
                                </p>
                            )}
                        </div>

                        <div className="sobres-formulario-acciones">
                            {editando && (
                                <button type="button" className="sobre-cancelar" onClick={limpiarFormulario}>
                                    Cancelar
                                </button>
                            )}
                            <button type="submit" className="sobre-btn-guardar">
                                {editando ? "Guardar Cambios" : "Guardar Carta"}
                            </button>
                        </div>
                    </form>

                    {/* LISTADO */}
                    <section className="sobres-listado">
                        <h3>Sobres creados</h3>

                        {sobres.length === 0 ? (
                            <p className="sobres-vacio">
                                Todavía no hay sobres creados. Se cargarán automáticamente desde MySQL.
                            </p>
                        ) : (
                            <div className="sobres-lista">
                                {sobres.map((sobre) => (
                                    <article className="sobre-item" key={sobre.id}>
                                        <div className="sobre-visual">
                                            <div className="sobre-paquete">
                                                <div className="sobre-rayas">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                                <div className="sobre-franja superior">
                                                    <div className="linea-franja"></div>
                                                    <div className="linea-franja"></div>
                                                    <div className="linea-franja"></div>
                                                </div>
                                                <div className="sobre-escudo-centro"></div>
                                                <div className="sobre-franja inferior">
                                                    <div className="linea-franja"></div>
                                                    <div className="linea-franja"></div>
                                                    <div className="linea-franja"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sobre-info">
                                            <strong className="sobre-titulo-card">{sobre.nombre}</strong>
                                            <span className="sobre-desc-card">{sobre.descripcion}</span>
                                            <span className="sobre-meta-card">
                                                {sobre.cantidad} cartas · {sobre.precio} monedas
                                            </span>
                                            <span className="sobre-incluye-card">
                                                Incluye:{" "}
                                                {sobre.cartas.length > 0
                                                    ? sobre.cartas.join(", ")
                                                    : "Sin cartas seleccionadas"}
                                            </span>

                                            <div className="sobre-acciones">
                                                <button
                                                    type="button"
                                                    className="sobre-boton-editar"
                                                    onClick={() => editarSobre(sobre)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    type="button"
                                                    className="sobre-boton-eliminar"
                                                    onClick={() => eliminarSobre(sobre.id)}
                                                >
                                                    Borrar
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

            <Footer />
        </div>
    );
}

export default SobresAdmin;