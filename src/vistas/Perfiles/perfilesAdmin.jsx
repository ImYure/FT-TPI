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

    // Obtener el token guardado al iniciar sesión
    function obtenerToken() {
        return localStorage.getItem("token");
    }

    // Cargar usuarios desde MySQL
    async function cargarUsuarios() {
        try {
            setCargando(true);

            const respuesta = await fetch("http://localhost:3000/api/usuarios", {
                headers: {
                    Authorization: `Bearer ${obtenerToken()}`
                }
            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(datos.mensaje || "No se pudieron cargar los usuarios");
            }

            setPerfiles(datos);

        } catch (error) {
            console.error(error);
            alert(error.message);

        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        cargarUsuarios();
    }, []);

    // Limpiar formulario
    function limpiar() {
        setNombre("");
        setApellido("");
        setCorreo("");
        setContraseña("");
        setRol("2");
        setEditando(null);
    }

    // Crear o editar usuario
    async function guardar(e) {
        e.preventDefault();

        if (!nombre.trim() || !apellido.trim() || !correo.trim()) {
            alert("Completá todos los campos.");
            return;
        }

        if (editando === null && !pass) {
            alert("Ingresá una contraseña.");
            return;
        }

        try {
            const respuesta = await axios.post(
                "http://localhost:3000/api/usuarios",
                {
                    nombre,
                    apellido,
                    mail: correo,
                    pass,
                    rol_id: rol
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            alert(respuesta.data.mensaje || "Usuario creado correctamente.");

            limpiar();

        } catch (error) {
            console.error("Error al crear el usuario:", error);
            alert(error.response?.data?.mensaje || "No se pudo crear el usuario.");
        }
    }


    function editar(perfil) {
        setNombre(perfil.nombre);
        setApellido(perfil.apellido);
        setCorreo(perfil.mail);
        setRol(String(perfil.rol_id));
        setContraseña("");
        setEditando(perfil.id);
    }

    // Eliminar usuario
    async function eliminar(id) {
        if (!confirm("¿Querés eliminar esta cuenta?")) {
            return;
        }

        try {
            const respuesta = await fetch(
                `http://localhost:3000/api/usuarios/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${obtenerToken()}`
                    }
                }
            );

            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(resultado.mensaje || "No se pudo eliminar el usuario");
            }

            alert(resultado.mensaje);

            if (editando === id) {
                limpiar();
            }

            cargarUsuarios();

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }


    useEffect(() => {
        async function obtenerRoles() {
            try {
                const respuesta = await axios.get(
                    "http://localhost:3000/api/roles",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                setRoles(respuesta.data);

            } catch (error) {
                console.error("Error al obtener los roles:", error);
            }
        }

        obtenerRoles();
    }, []);


    useEffect(() => {
        async function obtenerPerfiles() {
            try {
                const respuesta = await axios.get(
                    "http://localhost:3000/api/usuarios",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                setPerfiles(respuesta.data);

            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        }

        obtenerPerfiles();
    }, []);


    return (
        <div className="perfiles-pagina">

            {!integrado && (
                <header className="admin-header">
                    <Link href="/" className="admin-escudo" title="Panel Admin">
                        <div className="admin-logo-icon"></div>
                    </Link>

                    <span className="admin-header-text">Admin</span>
                </header>
            )}

            {!integrado && (
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
            )}

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
                            value={contraseña}
                            onChange={e => setContraseña(e.target.value)}
                            placeholder={
                                editando !== null
                                    ? "Dejar vacío para mantener la actual"
                                    : "Ingresá una contraseña"
                            }
                        />

                        <label>Rol del usuario</label>

                        <select
                            value={rol}
                            onChange={e => setRol(Number(e.target.value))}
                        >
                            {roles.map(rol => (
                                <option key={rol.id} value={rol.id}>
                                    {rol.rol}
                                </option>
                            ))}
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
                                                <span className={`perfil-etiqueta ${Number(perfil.rol_id) === 1 ? "es-admin" : ""}`}>
                                                    {Number(perfil.rol_id) === 1
                                                        ? "Administrador"
                                                        : "Jugador"}
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

            {!integrado && <Footer />}

        </div>
    );
}

export default PerfilesAdmin;
