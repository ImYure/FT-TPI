import { useState, useEffect } from "react";
import "./PerfilUsuario.css";

function PerfilUsuario() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    titulo: "",
    victorias: 0,
    rachas: 0,
    derrotas: 0,
  });

  const [datosCuenta, setDatosCuenta] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
  });

  const [editando, setEditando] = useState(false);

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <div className="perfil-avatar">
          <p>👤</p>
        </div>

        <div className="perfil-info">
          <h2>{usuario.nombre}</h2>
          <p>{usuario.titulo}</p>
        </div>

        <div className="perfil-stats">
          <div className="stat-box">
            <p className="stat-label">Victorias</p>
            <h2 className="stat-valor">{usuario.victorias}</h2>
          </div>

          <div className="stat-box">
            <p className="stat-label">Rachas</p>
            <h2 className="stat-valor">{usuario.rachas}</h2>
          </div>

          <div className="stat-box">
            <p className="stat-label">Derrotas</p>
            <h2 className="stat-valor">{usuario.derrotas}</h2>
          </div>
        </div>
      </div>

      <div className="cuenta-card">
        <div className="cuenta-titulo">
          <p>👤 Informacion de la cuenta</p>
        </div>

        <div className="cuenta-campo">
          <label>Nombre</label>
          <input
            type="text"
            value={datosCuenta.nombre}
            onChange={(e) => setDatosCuenta({ ...datosCuenta, nombre: e.target.value })}
            disabled={!editando}
          />
        </div>

        <div className="cuenta-campo">
          <label>Apellido</label>
          <input
            type="text"
            value={datosCuenta.apellido}
            onChange={(e) => setDatosCuenta({ ...datosCuenta, apellido: e.target.value })}
            disabled={!editando}
          />
        </div>

        <div className="cuenta-campo">
          <label>Correo</label>
          <input
            type="email"
            value={datosCuenta.correo}
            onChange={(e) => setDatosCuenta({ ...datosCuenta, correo: e.target.value })}
            disabled={!editando}
          />
        </div>

        <div className="cuenta-campo">
          <label>Telefono</label>
          <input
            type="text"
            value={datosCuenta.telefono}
            onChange={(e) => setDatosCuenta({ ...datosCuenta, telefono: e.target.value })}
            disabled={!editando}
          />
        </div>

        <div className="cuenta-boton-wrapper">
          <button
            onClick={() => setEditando(!editando)}
            className="cuenta-boton"
          >
            {editando ? "GUARDAR DATOS" : "EDITAR DATOS"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default PerfilUsuario;