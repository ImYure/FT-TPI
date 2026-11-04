import { useState } from "react";
import "./login.css";

function Login() {

    const [Correo, setCorreo] = useState("");
    const [Contraseña, setContraseña] = useState("");

    return (
        <div className="cuadro1">

        <div className="miku">

        <p>El mejor juego de cartas, entra y diviertete en esta linda experiencia con tus amigos o gente competitiva.</p>


        </div>



        <div className="Login">
          <p>Bienvenido a la pagina de homosexuales</p>
            <h1>iniciar sesion</h1>
                 <h1>Registrarse</h1>
            <form>
                <label>Correo electronico</label>
                <input
                type="email"
                value={Correo}
                onChange={(evento) => setCorreo(evento.target.value)}
                placeholder ="ingresa tu correo"
       />
                <label>Contraseña</label>
                <input
                    type="password"
                value={Contraseña}
                onChange={(evento) => setContraseña(evento.target.value)}
                placeholder="ingreso la contraseña"
            />

                <button type="submit">iniciar sesion</button>
            </form>
        </div>
    </div>
    );
}
export default Login;

