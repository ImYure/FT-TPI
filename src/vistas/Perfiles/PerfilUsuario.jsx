import { useState, useEffect } from "react";
import "../../estilos/PerfilUsuario.css";
import { Router } from "wouter";

function PerfilUsuario() {
  const [datosCuenta, setDatosCuenta] = useState({
    nombre: "",
    apellido: "",
    mail: "",
    nombre_usuario: "",
    titulo: "",
  });

  const [editando, setEditando] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/perfil/1")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setDatosCuenta(datos.usuarios[0]);
      });
  }, []);

  const guardarDatos = () => {
    fetch("http://localhost:3000/perfil/1", {
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
      });
  };

  const guardarTitulo = () => {
    fetch("http://localhost:3000/perfil/titulo/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo: datosCuenta.titulo }),
    })
      .then((respuesta) => respuesta.text())
      .then((mensaje) => {
        console.log(mensaje);
      });
  };

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <div className="perfil-avatar">
          <p>👤</p>
        </div>

        <div className="perfil-info">
          <h2>{datosCuenta.nombre_usuario}</h2>

          <select className="titulo-select"
            value={datosCuenta.titulo}
            onChange={(e) =>
              setDatosCuenta({ ...datosCuenta, titulo: e.target.value })
            }
          >
            <option value="Principiante">Principiante</option>
            <option value="Coleccionista">Coleccionista</option>
            <option value="Experto en cartas">Experto en cartas</option>
            <option value="Gran coleccionista">Gran coleccionista</option>
          </select>
          <button onClick={guardarTitulo} className="titulo-boton">Guardar Titulo</button>
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
            onChange={(e) =>
              setDatosCuenta({ ...datosCuenta, nombre: e.target.value })
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
              setDatosCuenta({ ...datosCuenta, apellido: e.target.value })
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
              setDatosCuenta({ ...datosCuenta, mail: e.target.value })
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
    </div>
  );
}
export default PerfilUsuario;
