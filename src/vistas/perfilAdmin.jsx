import { useState } from "react";
import { Link } from "wouter";
import Footer from "../componentes/Footer";
import "../perfilAdmin.css";

export default function PerfilAdmin() {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [rareza, setRareza] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [ataque, setAtaque] = useState("");
  const [defensa, setDefensa] = useState("");
  const [vida, setVida] = useState("");
  const [velocidad, setVelocidad] = useState("");
  const [cartas, setCartas] = useState([]);
  const [editando, setEditando] = useState(null);

  function crearCarta(e) {
    e.preventDefault();

    if (!nombre || !categoria || !rareza || !descripcion || !imagen) {
      alert("Completá todos los campos.");
      return;
    }

    const nuevaCarta = {
      id: editando ? editando : Date.now(),
      nombre,
      categoria,
      rareza,
      descripcion,
      imagen,
      ataque,
      defensa,
      vida,
      velocidad
    };

    if (editando) {
      setCartas(cartas.map(carta =>
        carta.id === editando ? nuevaCarta : carta
      ));
      setEditando(null);
    } else {
      setCartas([...cartas, nuevaCarta]);
    }

    limpiarFormulario();
  }

  function limpiarFormulario() {
    setNombre("");
    setCategoria("");
    setRareza("");
    setDescripcion("");
    setImagen("");
    setAtaque("");
    setDefensa("");
    setVida("");
    setVelocidad("");
  }

  function eliminarCarta(id) {
    setCartas(cartas.filter(carta => carta.id !== id));
  }

  function cargarEdicion(carta) {
    setNombre(carta.nombre);
    setCategoria(carta.categoria);
    setRareza(carta.rareza);
    setDescripcion(carta.descripcion);
    setImagen(carta.imagen);
    setAtaque(carta.ataque);
    setDefensa(carta.defensa);
    setVida(carta.vida);
    setVelocidad(carta.velocidad);
    setEditando(carta.id);
  }

  return (
    <div className="admin-pagina">
      <header className="admin-header">
        <Link href="/" className="admin-escudo" title="Panel Admin">
          <div className="admin-logo-icon"></div>
        </Link>
        <span className="admin-header-text">Admin</span>
      </header>

      <nav className="admin-navbar">
        <Link href="/perfilAdmin" className="admin-opcion activa">
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
        <Link href="/perfilesAdmin" className="admin-opcion">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
          </svg>
          <span>Perfiles</span>
        </Link>
      </nav>

      <main className="admin-contenido">
        <div className="admin-titulo">
          <h2>Administración de cartas</h2>
          <p>Creá, modificá y administrá las cartas del juego.</p>
        </div>

        <div className="admin-columnas">
          <form className="admin-formulario" onSubmit={crearCarta}>
            <div className="admin-form-titulo">
              <h3>{editando ? "Editar carta" : "Crear nueva carta"}</h3>
            </div>

            <label>Vista previa de imagen</label>
            <div className="admin-imagen">
              {imagen && <img src={imagen} alt="Vista previa" />}
              <input
                type="text"
                placeholder="URL de la imagen"
                value={imagen}
                onChange={e => setImagen(e.target.value)}
              />
            </div>

            <label>Nombre de la carta</label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Nombre"
            />

            <div className="admin-dos-columnas">
              <div>
                <label>Categoría</label>
                <select value={categoria} onChange={e => setCategoria(e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="Ataque">Ataque</option>
                  <option value="Defensa">Defensa</option>
                  <option value="Especial">Especial</option>
                </select>
              </div>

              <div>
                <label>Rareza</label>
                <select value={rareza} onChange={e => setRareza(e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="Común">Común</option>
                  <option value="Rara">Rara</option>
                  <option value="Épica">Épica</option>
                  <option value="Legendaria">Legendaria</option>
                </select>
              </div>
            </div>

            <label>Descripción</label>
            <textarea
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              placeholder="Descripción de la carta"
            />

            <h4>Estadísticas</h4>
            <div className="admin-dos-columnas">
              <div>
                <label>Ataque</label>
                <input type="number" value={ataque} onChange={e => setAtaque(e.target.value)} />
              </div>
              <div>
                <label>Defensa</label>
                <input type="number" value={defensa} onChange={e => setDefensa(e.target.value)} />
              </div>
              <div>
                <label>Vida</label>
                <input type="number" value={vida} onChange={e => setVida(e.target.value)} />
              </div>
              <div>
                <label>Velocidad</label>
                <input type="number" value={velocidad} onChange={e => setVelocidad(e.target.value)} />
              </div>
            </div>

            <button type="submit" className="admin-boton-crear">
              {editando ? "Guardar cambios" : "Crear carta"}
            </button>

            {editando && (
              <button type="button" className="admin-cancelar" onClick={() => {
                setEditando(null);
                limpiarFormulario();
              }}>
                Cancelar edición
              </button>
            )}
          </form>

          <section className="admin-listado">
            <h3>Cartas creadas</h3>

            {cartas.length === 0 ? (
              <p className="admin-vacio">Todavía no hay cartas creadas.</p>
            ) : (
              cartas.map(carta => (
                <div className="admin-carta" key={carta.id}>
                  <div className="admin-carta-visual">
                    <div className="admin-carta-marco">
                      <span className="admin-carta-rareza">★ {carta.rareza}</span>
                      <strong className="admin-carta-nombre">{carta.nombre}</strong>
                      <img src={carta.imagen} alt={carta.nombre} />
                    </div>
                  </div>

                  <div className="admin-carta-info">
                    <strong>{carta.nombre}</strong>
                    <span className="admin-carta-subtitulo">{carta.rareza} - {carta.categoria}</span>

                    <div className="admin-estadisticas">
                      <div className="admin-stat">
                        <b>{carta.vida || 0}</b>
                        <span>Vida</span>
                      </div>
                      <div className="admin-stat">
                        <b>{carta.ataque || 0}</b>
                        <span>Ataque</span>
                      </div>
                      <div className="admin-stat">
                        <b>{carta.defensa || 0}</b>
                        <span>Defensa</span>
                      </div>
                      <div className="admin-stat">
                        <b>{carta.velocidad || 0}</b>
                        <span>Velocidad</span>
                      </div>
                    </div>

                    <small>{carta.descripcion}</small>

                    <div className="admin-acciones">
                      <button type="button" onClick={() => cargarEdicion(carta)}>Editar</button>
                      <button type="button" onClick={() => eliminarCarta(carta.id)}>Borrar</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}