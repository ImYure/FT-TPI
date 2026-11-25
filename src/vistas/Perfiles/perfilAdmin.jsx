
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "wouter";
import Footer from "../../componentes/navegacion/Footer";
import "../../estilos/perfilAdmin.css";

const API_CARTAS = "http://localhost:3000/cartas";

export default function PerfilAdmin({ integrado = false }) {

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [rareza, setRareza] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState(""); const [precio, setPrecio] = useState("");
  const [ataque, setAtaque] = useState("");
  const [defensa, setDefensa] = useState("");
  const [vida, setVida] = useState("");
  const [velocidad, setVelocidad] = useState("");
  const [critico, setCritico] = useState("");

  const [cartas, setCartas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [rarezas, setRarezas] = useState([]);

  const [editando, setEditando] = useState(null);

  // Obtener el token del administrador
  function obtenerConfig() {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  // Cargar cartas desde MySQL
  async function cargarCartas() {
    try {
      const respuesta = await axios.get(API_CARTAS);

      setCartas(respuesta.data.cartas);

    } catch (error) {
      console.error("Error al cargar cartas:", error);
      alert("No se pudieron cargar las cartas.");
    }
  }

  // Cargar categorías desde MySQL
  async function cargarCategorias() {
    try {
      const respuesta = await axios.get(`${API_CARTAS}/categorias`);

      setCategorias(respuesta.data.categorias);

    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  }

  // Cargar rarezas desde MySQL
  async function cargarRarezas() {
    try {
      const respuesta = await axios.get(`${API_CARTAS}/rareza`);

      setRarezas(respuesta.data.rarezas);

    } catch (error) {
      console.error("Error al cargar rarezas:", error);
    }
  }

  // Ejecutar las cargas cuando se abre el componente
  useEffect(() => {
    cargarCartas();
    cargarCategorias();
    cargarRarezas();
  }, []);

  // Crear o editar una carta

  async function crearCarta(e) {
    e.preventDefault();

    if (
      !nombre.trim() ||
      !categoria ||
      !rareza ||
      !descripcion.trim() ||
      (!imagen && editando === null) ||
      precio === "" ||
      ataque === "" ||
      defensa === "" ||
      vida === "" ||
      velocidad === "" ||
      critico === ""
    ) {
      alert("Completá todos los campos.");
      return;
    }

    const datos = new FormData();

    datos.append("nombre", nombre);
    datos.append("categoria_id", categoria);
    datos.append("rareza_id", rareza);
    datos.append("descripcion", descripcion);
    datos.append("precio", precio);
    datos.append("ataque", ataque);
    datos.append("defensa", defensa);
    datos.append("vida", vida);
    datos.append("velocidad", velocidad);
    datos.append("critico", critico || 0);

    if (imagen) {
      datos.append("imagen", imagen);
    }

    try {
      if (editando !== null) {
        await axios.put(
          `${API_CARTAS}/${editando}`,
          datos,
          obtenerConfig()
        );

        alert("Carta modificada correctamente.");
      } else {
        await axios.post(
          API_CARTAS,
          datos,
          obtenerConfig()
        );

        alert("Carta creada correctamente.");
      }

      limpiarFormulario();
      setEditando(null);
      cargarCartas();

    } catch (error) {
      console.error("Error al guardar carta:", error);

      alert(
        error.response?.data?.mensaje ||
        "No se pudo guardar la carta."
      );
    }
  }


  // Limpiar formulario
  function limpiarFormulario() {
    setNombre("");
    setCategoria("");
    setRareza("");
    setDescripcion("");
    setImagen(null);
    setVistaPrevia("");
    setPrecio("");
    setAtaque("");
    setDefensa("");
    setVida("");
    setVelocidad("");
    setCritico("");
  }

  // Eliminar carta de MySQL
  async function eliminarCarta(id) {

    const confirmar = window.confirm(
      "¿Estás seguro de que querés eliminar esta carta?"
    );

    if (!confirmar) return;

    try {

      await axios.delete(
        `${API_CARTAS}/${id}`,
        obtenerConfig()
      );

      alert("Carta eliminada correctamente.");

      if (editando === id) {
        setEditando(null);
        limpiarFormulario();
      }

      cargarCartas();

    } catch (error) {
      console.error("Error al eliminar carta:", error);

      alert(
        error.response?.data?.mensaje ||
        "No se pudo eliminar la carta."
      );
    }
  }

  // Cargar los datos de una carta en el formulario
  function cargarEdicion(carta) {
    setNombre(carta.nombre);
    setCategoria(String(carta.categoria_id));
    setRareza(String(carta.rareza_id));
    setDescripcion(carta.descripcion || "");
    setImagen(null);
    setVistaPrevia(
      carta.imagen
        ? `http://localhost:3000/imagenes/cartas/${carta.imagen}`
        : ""
    );
    setPrecio(String(carta.precio));
    setAtaque(String(carta.ataque));
    setDefensa(String(carta.defensa));
    setVida(String(carta.vida));
    setVelocidad(String(carta.velocidad));
    setCritico(String(carta.critico ?? 0));

    setEditando(carta.id);
  }

  return (
    <div className="admin-pagina">

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

          <Link href="/perfilAdmin" className="admin-opcion activa">
            <svg width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11l9-8 9 8" />
              <path d="M5 10v10h5v-6h4v6h5V10" />
            </svg>

            <span>Cartas</span>
          </Link>

          <Link href="/sobresAdmin" className="admin-opcion">
            <svg width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
            </svg>

            <span>Sobres</span>
          </Link>

          <Link href="/perfilesAdmin" className="admin-opcion">
            <svg width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
            </svg>

            <span>Perfiles</span>
          </Link>

        </nav>
      )}

      <main className="admin-contenido">

        <div className="admin-titulo">
          <h2>Administración de cartas</h2>
          <p>Creá, modificá y administrá las cartas del juego.</p>
        </div>

        <div className="admin-columnas">

          <form className="admin-formulario" onSubmit={crearCarta}>

            <div className="admin-form-titulo">
              <h3>
                {editando !== null ? "Editar carta" : "Crear nueva carta"}
              </h3>
            </div>

            <label>Imagen de la carta</label>

            <input
              type="file"
              accept="image/png, image/jpeg, image/webp, image/gif, image/avif" onChange={(e) => {
                const archivo = e.target.files[0];

                if (archivo) {
                  setImagen(archivo);
                  setVistaPrevia(URL.createObjectURL(archivo));
                }
              }}
            />

            {vistaPrevia && (
              <img
                src={vistaPrevia}
                alt="Vista previa"
                className="sobre-imagen-preview"
              />
            )}

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

                <select
                  value={categoria}
                  onChange={e => setCategoria(e.target.value)}
                >
                  <option value="">Seleccionar</option>

                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Rareza</label>

                <select
                  value={rareza}
                  onChange={e => setRareza(e.target.value)}
                >
                  <option value="">Seleccionar</option>

                  {rarezas.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.nombre}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <label>Descripción</label>

            <textarea
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              placeholder="Descripción de la carta"
            />

            <label>Precio</label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={precio}
              onChange={e => setPrecio(e.target.value)}
              placeholder="Precio de la carta"
            />

            <h4>Estadísticas</h4>

            <div className="admin-dos-columnas">

              <div>
                <label>Ataque</label>
                <input
                  type="number"
                  min="0"
                  value={ataque}
                  onChange={e => setAtaque(e.target.value)}
                />
              </div>

              <div>
                <label>Defensa</label>
                <input
                  type="number"
                  min="0"
                  value={defensa}
                  onChange={e => setDefensa(e.target.value)}
                />
              </div>

              <div>
                <label>Vida</label>
                <input
                  type="number"
                  min="0"
                  value={vida}
                  onChange={e => setVida(e.target.value)}
                />
              </div>

              <div>
                <label>Velocidad</label>
                <input
                  type="number"
                  min="0"
                  value={velocidad}
                  onChange={e => setVelocidad(e.target.value)}
                />
              </div>
              <div>
                <label>Crítico</label>
                <input
                  type="number"
                  min="0"
                  value={critico}
                  onChange={(e) => setCritico(e.target.value)}
                  required
                />
              </div>


            </div>

            <button type="submit" className="admin-boton-crear">
              {editando !== null ? "Guardar cambios" : "Crear carta"}
            </button>

            {editando !== null && (
              <button
                type="button"
                className="admin-cancelar"
                onClick={() => {
                  setEditando(null);
                  limpiarFormulario();
                }}
              >
                Cancelar edición
              </button>
            )}

          </form>

          <section className="admin-listado">

            <h3>Cartas creadas</h3>

            {cartas.length === 0 ? (

              <p className="admin-vacio">
                Todavía no hay cartas creadas.
              </p>

            ) : (

              cartas.map(carta => (

                <div className="admin-carta" key={carta.id}>

                  <div className="admin-carta-visual">

                    <div className="admin-carta-marco">

                      <span className="admin-carta-rareza">
                        ★ {carta.rareza}
                      </span>

                      <strong className="admin-carta-nombre">
                        {carta.nombre}
                      </strong>

                      {carta.imagen && (
                        <img
                          src={`http://localhost:3000/imagenes/cartas/${carta.imagen}`}
                          alt={carta.nombre}
                        />
                      )}

                    </div>

                  </div>

                  <div className="admin-carta-info">

                    <strong>{carta.nombre}</strong>

                    <span className="admin-carta-subtitulo">
                      {carta.rareza} - {carta.categoria}
                    </span>

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

                    <strong>Precio: ${carta.precio}</strong>

                    <div className="admin-acciones">

                      <button
                        type="button"
                        onClick={() => cargarEdicion(carta)}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => eliminarCarta(carta.id)}
                      >
                        Borrar
                      </button>

                    </div>

                  </div>

                </div>

              ))

            )}

          </section>

        </div>

      </main>

      {!integrado && <Footer />}

    </div>
  );
}
