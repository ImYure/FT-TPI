import { useLocation } from "wouter";
import { useState } from "react";
import axios from "axios";
import "../login.css";

function Login() {
    const [, setLocation] = useLocation();
    const [modo, setModo] = useState("login");
    const [Nombre, setNombre] = useState("");
    const [Apellido, setApellido] = useState("");
    const [Correo, setCorreo] = useState("");
    const [Contraseña, setContraseña] = useState("");
    const [ConfirmarContraseña, setConfirmarContraseña] = useState("");
    const [Recordarme, setRecordarme] = useState(false);
    const [AceptarTerminos, setAceptarTerminos] = useState(false);

    async function manejarEnvio(evento) {
        evento.preventDefault();

        if (modo === "registro") {

            if (Contraseña !== ConfirmarContraseña) {
                alert("Las contraseñas no coinciden");
                return;
            }

            if (!AceptarTerminos) {
                alert("Tenés que aceptar los términos y condiciones");
                return;
            }

            try {
                const respuesta = await axios.post(
                    "http://localhost:3000/api/registro",
                    {
                        nombre: Nombre,
                        apellido: Apellido,
                        mail: Correo,
                        pass: Contraseña
                    }
                );

                alert(respuesta.data.mensaje);

                // Limpiar los campos
                setNombre("");
                setApellido("");
                setCorreo("");
                setContraseña("");
                setConfirmarContraseña("");
                setAceptarTerminos(false);

                // Volver al inicio de sesión
                setModo("login");

            } catch (error) {
                console.error(error);

                alert(
                    error.response?.data?.mensaje ||
                    "Error al conectar con el servidor"
                );
            }

        } else {

            if (!AceptarTerminos) {
                alert("Tenés que aceptar los términos y condiciones");
                return;
            }

            try {
                const respuesta = await axios.post(
                    "http://localhost:3000/api/login",
                    {
                        mail: Correo,
                        pass: Contraseña
                    }
                );

                // Guardar el token y los datos del usuario
                localStorage.setItem("token", respuesta.data.token);
                localStorage.setItem(
                    "usuario",
                    JSON.stringify(respuesta.data.usuario)
                );

                alert(respuesta.data.mensaje);

                setLocation("/inicio");
            } catch (error) {
                console.error(error);

                alert(
                    error.response?.data?.mensaje ||
                    "Error al conectar con el servidor"
                );
            }
        }
    }

    return (
        <div className="pagina">
            <div className="cuadro1">

                <div className="miku">
                    <div className="login-logo">
                        <div className="logo-icono"></div>
                    </div>

                    <div className="bienvenida">
                        <p>
                            El mejor juego de cartas, entra y
                            diviértete en esta linda
                            experiencia con tus amigos o
                            gente competitiva.
                        </p>

                        <p className="texto-inferior">
                            Entrá con tu cuenta y seguí donde lo dejaste.
                            Tus proyectos, notas y equipos te están esperando.
                        </p>
                    </div>
                </div>

                <div className="Login">
                    <p className="titulo-bienvenida">
                        Bienvenido a la página de VOLTERRA
                    </p>

                    <div className="pestanas">
                        <button
                            type="button"
                            className={modo === "login" ? "activo" : ""}
                            onClick={() => setModo("login")}
                        >
                            Iniciar sesión
                        </button>

                        <button
                            type="button"
                            className={modo === "registro" ? "activo" : ""}
                            onClick={() => setModo("registro")}
                        >
                            Crear cuenta
                        </button>
                    </div>

                    {modo === "login" ? (
                        <div className="contenido-formulario">
                            <form onSubmit={manejarEnvio}>
                                <label>Correo electrónico</label>
                                <input
                                    type="email"
                                    value={Correo}
                                    onChange={(evento) => setCorreo(evento.target.value)}
                                    placeholder="correo@ejemplo.com"
                                    required
                                />

                                <label>Contraseña</label>
                                <input
                                    type="password"
                                    value={Contraseña}
                                    onChange={(evento) => setContraseña(evento.target.value)}
                                    placeholder="Ingresá tu contraseña"
                                    required
                                />

                                <label className="login-opcion">
                                    <input
                                        type="checkbox"
                                        checked={Recordarme}
                                        onChange={(evento) => setRecordarme(evento.target.checked)}
                                    />
                                    Recordar
                                </label>

                                <label className="login-opcion">
                                    <input
                                        type="checkbox"
                                        checked={AceptarTerminos}
                                        onChange={(evento) => setAceptarTerminos(evento.target.checked)}
                                    />
                                    Leí y acepto los términos y condiciones
                                </label>

                                <button className="boton-principal" type="submit">
                                    Iniciar sesión
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="contenido-formulario">
                            <form onSubmit={manejarEnvio}>
                                <div className="fila">
                                    <div className="campo">
                                        <label>Nombre</label>
                                        <input
                                            type="text"
                                            value={Nombre}
                                            onChange={(evento) => setNombre(evento.target.value)}
                                            placeholder="Nombre"
                                            required
                                        />
                                    </div>

                                    <div className="campo">
                                        <label>Apellido</label>
                                        <input
                                            type="text"
                                            value={Apellido}
                                            onChange={(evento) => setApellido(evento.target.value)}
                                            placeholder="Apellido"
                                            required
                                        />
                                    </div>
                                </div>

                                <label>Correo electrónico</label>
                                <input
                                    type="email"
                                    value={Correo}
                                    onChange={(evento) => setCorreo(evento.target.value)}
                                    placeholder="correo@ejemplo.com"
                                    required
                                />

                                <label>Contraseña</label>
                                <input
                                    type="password"
                                    value={Contraseña}
                                    onChange={(evento) => setContraseña(evento.target.value)}
                                    placeholder="Creá una contraseña"
                                    required
                                />

                                <label>Repetir contraseña</label>
                                <input
                                    type="password"
                                    value={ConfirmarContraseña}
                                    onChange={(evento) => setConfirmarContraseña(evento.target.value)}
                                    placeholder="Repetí tu contraseña"
                                    required
                                />

                                <label className="login-opcion">
                                    <input
                                        type="checkbox"
                                        checked={AceptarTerminos}
                                        onChange={(evento) => setAceptarTerminos(evento.target.checked)}
                                    />
                                    Acepto los términos y condiciones
                                </label>

                                <button className="boton-principal" type="submit">
                                    Crear cuenta
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
