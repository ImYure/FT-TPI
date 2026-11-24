
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "wouter";
import Footer from "../../componentes/navegacion/Footer";
import "../../estilos/perfilesAdmin.css";

function PerfilesAdmin() {
    const [roles, setRoles] = useState([]);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [pass, setPass] = useState("");
    const [rol, setRol] = useState("");
    const [perfiles, setPerfiles] = useState([]);
    const [editando, setEditando] = useState(null);
    const [cargando, setCargando] = useState(false);

    // Obtener token
    function obtenerToken() {
        return localStorage.getItem("token");
    }

    // Configuración de autorización
    function obtenerConfig() {
        return {
            headers: {
                Authorization: `Bearer ${obtenerToken()}`
            }
        };
    }

    // Cargar usuarios
    async function cargarUsuarios() {
        try {
            setCargando(true);

            const respuesta = await axios.get(
                "http://localhost:3000/api/usuarios",
                obtenerConfig()
            );

            setPerfiles(respuesta.data);

        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            alert(error.response?.data?.mensaje || "No se pudieron cargar los usuarios.");

        } finally {
            setCargando(false);
        }
    }

    // Cargar roles
    async function cargarRoles() {
        try {
            const respuesta = await axios.get(
                "http://localhost:3000/api/roles",
                obtenerConfig()
            );

            setRoles(respuesta.data);

            // Seleccionar Jugador como rol inicial
            const rolJugador = respuesta.data.find(
                rol => rol.rol.toLowerCase() === "jugador"
            );

            if (rolJugador) {
                setRol(String(rolJugador.id));
            } else if (respuesta.data.length > 0) {
                setRol(String(respuesta.data[0].id));
            }

        } catch (error) {
            console.error("Error al obtener los roles:", error);
            alert(error.response?.data?.mensaje || "No se pudieron cargar los roles.");
        }
    }

    useEffect(() => {
        cargarUsuarios();
        cargarRoles();
    }, []);

    // Obtener nombre del rol según su ID
    function obtenerNombreRol(id) {
        const rolEncontrado = roles.find(
            rol => Number(rol.id) === Number(id)
        );

        return rolEncontrado ? rolEncontrado.rol : "Sin rol";
    }

    // Limpiar formulario
    function limpiar() {
        setNombre("");
        setApellido("");
        setCorreo("");
        setPass("");

        const rolJugador = roles.find(
            rol => rol.rol.toLowerCase() === "jugador"
        );

        setRol(
            rolJugador
                ? String(rolJugador.id)
                : roles.length > 0
                    ? String(roles[0].id)
                    : ""
        );

        setEditando(null);
    }

    // Crear o editar usuario
    async function guardar(e) {
        e.preventDefault();

        if (!nombre.trim() || !apellido.trim() || !correo.trim() || !rol) {
            alert("Completá todos los campos.");
            return;
        }

        if (editando === null && !pass.trim()) {
            alert("Ingresá una contraseña.");
            return;
        }

        try {
            const datos = {
                nombre,
                apellido,
                mail: correo,
                pass,
                rol_id: rol
            };

            let respuesta;

            if (editando === null) {
                // Crear usuario
                respuesta = await axios.post(
                    "http://localhost:3000/api/usuarios",
                    datos,
                    obtenerConfig()
                );
            } else {
                // Editar usuario
                respuesta = await axios.put(
                    `http://localhost:3000/api/usuarios/${editando}`,
                    datos,
                    obtenerConfig()
                );
            }

            alert(respuesta.data.mensaje);

            limpiar();
            cargarUsuarios();

        } catch (error) {
            console.error("Error al guardar el usuario:", error);
            alert(error.response?.data?.mensaje || "No se pudo guardar el usuario.");
        }
    }

    // Cargar datos en el formulario para editar
    function editar(perfil) {
        setNombre(perfil.nombre);
        setApellido(perfil.apellido);
        setCorreo(perfil.mail);
        setRol(String(perfil.rol_id));
        setPass("");
        setEditando(perfil.id);
    }

    // Eliminar usuario
    async function eliminar(id) {
        if (!confirm("¿Querés eliminar esta cuenta?")) {
            return;
        }

        try {
            const respuesta = await axios.delete(
                `http://localhost:3000/api/usuarios/${id}`,
                obtenerConfig()
            );

            alert(respuesta.data.mensaje);

            if (editando === id) {
                limpiar();
            }

            cargarUsuarios();

        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            alert(error.response?.data?.mensaje || "No se pudo eliminar el usuario.");
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

                        <label>Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />

                        <label>Apellido</label>
                        <input
                            type="text"
                            value={apellido}
                            onChange={e => setApellido(e.target.value)}
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            value={correo}
                            onChange={e => setCorreo(e.target.value)}
                        />

                        <label>
                            {editando !== null
                                ? "Nueva contraseña (opcional)"
                                : "Contraseña"}
                        </label>

                        <input
                            type="password"
                            value={pass}
                            onChange={e => setPass(e.target.value)}
                            placeholder={
                                editando !== null
                                    ? "Dejar vacío para mantener la actual"
                                    : "Ingresá una contraseña"
                            }
                        />

                        <label>Rol del usuario</label>

                        <select
                            value={rol}
                            onChange={e => setRol(e.target.value)}
                        >
                            {roles.map(rol => (
                                <option key={rol.id} value={rol.id}>
                                    {rol.rol}
                                </option>
                            ))}
                        </select>

                        <p className="perfil-ayuda">
                            Elegí el rol que tendrá el usuario.
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

                                {cargando ? (

                                    <tr>
                                        <td colSpan="5" className="perfil-vacio">
                                            Cargando usuarios...
                                        </td>
                                    </tr>

                                ) : perfiles.length === 0 ? (

                                    <tr>
                                        <td colSpan="5" className="perfil-vacio">
                                            Todavía no hay usuarios registrados.
                                        </td>
                                    </tr>

                                ) : (

                                    perfiles.map(perfil => (

                                        <tr key={perfil.id}>

                                            <td>{perfil.id}</td>

                                            <td>
                                                {perfil.nombre} {perfil.apellido}
                                            </td>

                                            <td>{perfil.mail}</td>

                                            <td>
                                                <span className={`perfil-etiqueta ${
                                                    obtenerNombreRol(perfil.rol_id) === "Administrador"
                                                        ? "es-admin"
                                                        : ""
                                                }`}>
                                                    {obtenerNombreRol(perfil.rol_id)}
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
