
import { useState } from "react";
import "../../estilos/PerfilUsuario.css";

import PerfilAdmin from "./perfilAdmin";
import SobresAdmin from "./sobresAdmin";
import PerfilesAdmin from "./perfilesAdmin";

function PerfilUsuario() {

  // Comprobar el rol del usuario
  const datosSesion = JSON.parse(localStorage.getItem("usuario") || "null");
  const esAdmin = Number(datosSesion?.rol_id) === 1;

  // Pestaña administrativa seleccionada
  const [seccionAdmin, setSeccionAdmin] = useState("cartas");

  // Datos del perfil del jugador
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

      {/* ================================= */}
      {/* PERFIL NORMAL DEL JUGADOR */}
      {/* ================================= */}

      {!esAdmin && (
        <>
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
              <p>👤 Información de la cuenta</p>
            </div>

            <div className="cuenta-campo">
              <label>Nombre</label>
              <input
                type="text"
                value={datosCuenta.nombre}
                onChange={(e) =>
                  setDatosCuenta({
                    ...datosCuenta,
                    nombre: e.target.value
                  })
                }
                disabled={!editando}
              />
            </div>

            <div className="cuenta-campo">
              <label>Apellido</label>
              <input
                type="text"
                value={datosCuenta.apellido}
                onChange={(e) =>
                  setDatosCuenta({
                    ...datosCuenta,
                    apellido: e.target.value
                  })
                }
                disabled={!editando}
              />
            </div>

            <div className="cuenta-campo">
              <label>Correo</label>
              <input
                type="email"
                value={datosCuenta.correo}
                onChange={(e) =>
                  setDatosCuenta({
                    ...datosCuenta,
                    correo: e.target.value
                  })
                }
                disabled={!editando}
              />
            </div>

            <div className="cuenta-campo">
              <label>Teléfono</label>
              <input
                type="text"
                value={datosCuenta.telefono}
                onChange={(e) =>
                  setDatosCuenta({
                    ...datosCuenta,
                    telefono: e.target.value
                  })
                }
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
        </>
      )}

      {/* ================================= */}
      {/* PANEL EXCLUSIVO DEL ADMINISTRADOR */}
      {/* ================================= */}

      {esAdmin && (
        <div className="admin-panel-integrado">

          {/* NAVEGACIÓN ADMINISTRATIVA */}
          <nav className="admin-tabs">

            <button
              className={
                seccionAdmin === "cartas"
                  ? "admin-tab activo"
                  : "admin-tab"
              }
              onClick={() => setSeccionAdmin("cartas")}
            >
              Cartas
            </button>

            <button
              className={
                seccionAdmin === "sobres"
                  ? "admin-tab activo"
                  : "admin-tab"
              }
              onClick={() => setSeccionAdmin("sobres")}
            >
              Sobres
            </button>

            <button
              className={
                seccionAdmin === "perfiles"
                  ? "admin-tab activo"
                  : "admin-tab"
              }
              onClick={() => setSeccionAdmin("perfiles")}
            >
              Perfiles
            </button>

          </nav>

          {/* ADMINISTRACIÓN DE CARTAS */}
          <div
            style={{
              display: seccionAdmin === "cartas" ? "block" : "none"
            }}
          >
            <PerfilAdmin integrado={true} />
          </div>

          {/* ADMINISTRACIÓN DE SOBRES */}
          <div
            style={{
              display: seccionAdmin === "sobres" ? "block" : "none"
            }}
          >
            <SobresAdmin integrado={true} />
          </div>

          {/* ADMINISTRACIÓN DE PERFILES */}
          <div
            style={{
              display: seccionAdmin === "perfiles" ? "block" : "none"
            }}
          >
            <PerfilesAdmin integrado={true} />
          </div>

        </div>
      )}

    </div>
  );
}

export default PerfilUsuario;
