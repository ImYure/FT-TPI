import { useState, useEffect } from "react";
import "../../estilos/PerfilUsuario.css";

import PerfilAdmin from "./perfilAdmin";
import SobresAdmin from "./sobresAdmin";
import PerfilesAdmin from "./perfilesAdmin";

function PerfilUsuario() {

  // Comprobar el rol del usuario
  const datosSesion = JSON.parse(
    localStorage.getItem("usuario") || "null"
  );

  const esAdmin = Number(datosSesion?.rol_id) === 1;

  // Pestaña administrativa seleccionada
  const [seccionAdmin, setSeccionAdmin] = useState("cartas");

  // Datos de la cuenta
  const [datosCuenta, setDatosCuenta] = useState({
    nombre: "",
    apellido: "",
    mail: "",
    titulo: "",
  });

  const [editando, setEditando] = useState(false);

  // Obtener datos del usuario
  useEffect(() => {
    if (!datosSesion?.id) return;

    fetch(`http://localhost:3000/perfil/${datosSesion.id}`)
    .then((respuesta) => {
        if (!respuesta.ok) {
            throw new Error("Error al obtener el perfil");
        }

        return respuesta.json();
    })
    .then((datos) => {
        const cuenta = datos.usuarios[0];

        if (cuenta) {
            setDatosCuenta(cuenta);
        }
    })
    .catch((error) => {
        console.error("Error al cargar el perfil:", error);
    });
  }, [datosSesion?.id]);

  // Guardar datos personales
  const guardarDatos = () => {
    fetch(`http://localhost:3000/perfil/${datosSesion.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosCuenta),
    })
      .then((respuesta) => respuesta.text())
      .then((mensaje) => {
        console.log(mensaje);
        setEditando(false);
      })
      .catch((error) => {
        console.error("Error al guardar los datos:", error);
      });
  };

  // Guardar título
  const guardarTitulo = () => {
    fetch(`http://localhost:3000/perfil/titulo/${datosSesion.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: datosCuenta.titulo,
      }),
    })
      .then((respuesta) => respuesta.text())
      .then((mensaje) => {
        console.log(mensaje);
      })
      .catch((error) => {
        console.error("Error al guardar el título:", error);
      });
  };

  return (
    <div className="perfil-container">

      {/* TARJETA DEL PERFIL: JUGADORES Y ADMINISTRADORES */}
      <div className="perfil-card">

        <div className="perfil-avatar">
          <p>👤</p>
        </div>

        <div className="perfil-info">
          <h2>{datosCuenta.nombre}</h2>

          <select
            className="titulo-select"
            value={datosCuenta.titulo || "Principiante"}
            onChange={(e) =>
              setDatosCuenta({
                ...datosCuenta,
                titulo: e.target.value,
              })
            }
          >
            <option value="Principiante">Principiante</option>
            <option value="Coleccionista">Coleccionista</option>
            <option value="Experto en cartas">Experto en cartas</option>
            <option value="Gran coleccionista">
              Gran coleccionista
            </option>
          </select>

          <button
            onClick={guardarTitulo}
            className="titulo-boton"
          >
            Guardar Título
          </button>
        </div>

      </div>

      {/* INFORMACIÓN DE CUENTA DEL JUGADOR */}
      {!esAdmin && (
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
                  nombre: e.target.value,
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
                  apellido: e.target.value,
                })
              }
              disabled={!editando}
            />
          </div>

          <div className="cuenta-campo">
            <label>Correo</label>
            <input
              type="email"
              value={datosCuenta.mail}
              onChange={(e) =>
                setDatosCuenta({
                  ...datosCuenta,
                  mail: e.target.value,
                })
              }
              disabled={!editando}
            />
          </div>

          <div className="cuenta-boton-wrapper">
            <button
              onClick={() => {
                if (editando) {
                  guardarDatos();
                } else {
                  setEditando(true);
                }
              }}
              className="cuenta-boton"
            >
              {editando ? "GUARDAR DATOS" : "EDITAR DATOS"}
            </button>
          </div>

        </div>
      )}

      {/* PANEL EXCLUSIVO DEL ADMINISTRADOR */}
      {esAdmin && (
        <div className="admin-panel-integrado">

          {/* INFORMACIÓN DE CUENTA */}
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
                    nombre: e.target.value,
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
                    apellido: e.target.value,
                  })
                }
                disabled={!editando}
              />
            </div>

            <div className="cuenta-campo">
              <label>Mail</label>
              <input
                type="email"
                value={datosCuenta.mail}
                onChange={(e) =>
                  setDatosCuenta({
                    ...datosCuenta,
                    mail: e.target.value,
                  })
                }
                disabled={!editando}
              />
            </div>

            <div className="cuenta-boton-wrapper">
              <button
                onClick={() => {
                  if (editando) {
                    guardarDatos();
                  } else {
                    setEditando(true);
                  }
                }}
                className="cuenta-boton"
              >
                {editando ? "GUARDAR DATOS" : "EDITAR DATOS"}
              </button>
            </div>

          </div>

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
              display: seccionAdmin === "cartas" ? "block" : "none",
            }}
          >
            <PerfilAdmin integrado={true} />
          </div>

          {/* ADMINISTRACIÓN DE SOBRES */}
          <div
            style={{
              display: seccionAdmin === "sobres" ? "block" : "none",
            }}
          >
            <SobresAdmin integrado={true} />
          </div>

          {/* ADMINISTRACIÓN DE PERFILES */}
          <div
            style={{
              display: seccionAdmin === "perfiles" ? "block" : "none",
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