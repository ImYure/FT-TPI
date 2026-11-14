import { useState } from "react";
import { Link } from "wouter";
import Footer from "../componentes/Footer";
import "../perfilesAdmin.css";

function PerfilesAdmin() {
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState("Usuario");
    const [perfiles, setPerfiles] = useState([]);
    const [editando, setEditando] = useState(null);

    function limpiar() {
        setNombre("");
        setUsuario("");
        setCorreo("");
        setRol("Usuario");
        setEditando(null);
    }

    function guardar(e) {
        e.preventDefault();

        if (!nombre || !usuario || !correo) {
            alert("Completá todos los campos.");
            return;
        }

        const perfil = {
            id: editando !== null ? editando : Date.now(),
            nombre,
            usuario,
            correo,
            rol
        };

        if (editando !== null) {
            setPerfiles(perfiles.map(p =>
                p.id === editando ? perfil : p
            ));
        } else {
            setPerfiles([...perfiles, perfil]);
        }

        limpiar();
    }

    function editar(perfil) {
        setNombre(perfil.nombre);
        setUsuario(perfil.usuario);
        setCorreo(perfil.correo);
        setRol(perfil.rol);
        setEditando(perfil.id);
    }

    function eliminar(id) {
        if (confirm("¿Querés eliminar esta cuenta?")) {
            setPerfiles(perfiles.filter(p => p.id !== id));

            if (editando === id) {
                limpiar();
            }
        }
    }

    return (
        <div className="perfiles-pagina">

            <header className="admin-header">
                <Link href="/" className="admin-escudo" title="Panel Admin">
                    <div className="admin-logo-icon"></div>
                </Link>
                <span className="admin-header-text">Admin</span>
            </header>

            <nav className="admin-navbar">
                <Link href="/perfilAdmin" className="admin-opcion">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 11l9-8 9 8" />
                        <path d="M5 10v10h5v-6h4v6h5V10" />
                    </svg>
                    <span>Cartas</span>
                </Link>
                <Link href="/sobresAdmin" className="admin-opcion">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                    </svg>
                    <span>Sobres</span>
                </Link>
                <Link href="/perfilesAdmin" className="admin-opcion activa">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                    </svg>
                    <span>Perfiles</span>
                </Link>
            </nav>

            <main className="perfiles-contenido">

                <div className="perfiles-titulo">
                    <h2>Administrar Cuentas</h2>
                    <p>Acá podés administrar sus cuentas.</p>
                </div>

                <div className="perfiles-columnas">

                    <form className="perfil-formulario" onSubmit={guardar}>

                        <h3>
                            {editando !== null ? "Editar usuario" : "Agregar usuario"}
                        </h3>

                        <label>Nombres</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />

                        <label>Usuario</label>
                        <input
                            type="text"
                            value={usuario}
                            onChange={e => setUsuario(e.target.value)}
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            value={correo}
                            onChange={e => setCorreo(e.target.value)}
                        />

                        <label>Rol del usuario</label>
                        <select
                            value={rol}
                            onChange={e => setRol(e.target.value)}
                        >
                            <option value="Administrador">Administrador</option>
                            <option value="Usuario">Jugador</option>
                        </select>

                        <p className="perfil-ayuda">
                            Elegí "Administrador" para darle acceso al panel de administración.
                        </p>

                        <button className="perfil-guardar" type="submit">
                            {editando !== null ? "Guardar cambios" : "Guardar Cambios"}
                        </button>

                        {editando !== null && (
                            <button
                                className="perfil-cancelar"
                                type="button"
                                onClick={limpiar}
                            >
                                Cancelar
                            </button>
                        )}

                    </form>

                    <section className="perfil-listado">

                        <table className="perfil-tabla">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombres</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {perfiles.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="perfil-vacio">
                                            Todavía no hay usuarios registrados.
                                        </td>
                                    </tr>
                                ) : (
                                    perfiles.map(perfil => (
                                        <tr key={perfil.id}>
                                            <td>{perfil.id}</td>
                                            <td>{perfil.nombre}</td>
                                            <td>{perfil.correo}</td>
                                            <td>
                                                <span className={`perfil-etiqueta ${perfil.rol === "Administrador" ? "es-admin" : ""}`}>
                                                    {perfil.rol === "Usuario" ? "Jugador" : perfil.rol}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="perfil-botones">
                                                    <button
                                                        type="button"
                                                        onClick={() => editar(perfil)}
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => eliminar(perfil.id)}
                                                    >
                                                        Borrar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                    </section>

                </div>

            </main>

            <Footer />

        </div>
    );
}

export default PerfilesAdmin;