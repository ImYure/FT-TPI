
import { useState, useEffect } from "react";
import Filtros from "../componentes/Filtros.jsx";
import ListaProductos from "../componentes/ListaProductos.jsx";
import ListaMazos from "../componentes/mazos/ListaMazos.jsx";
import EditorMazo from "../componentes/mazos/EditorMazo.jsx";
import "../estilos/ListaMazos.css";

const API = "http://localhost:3000";

export default function Mazos() {

  // ==========================================
  // ESTADOS
  // ==========================================

  const [mazos, setMazos] = useState([]);
  const [cartasDisponibles, setCartasDisponibles] = useState([]);
  const [mazoSeleccionado, setMazoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);

  const [filtros, setFiltros] = useState({
    categoria: "todos",
    rareza: [],
    orden: "ninguno"
  });

  const token = localStorage.getItem("token");

  // ==========================================
  // CONFIGURAR LOS ENCABEZADOS
  // ==========================================

  function obtenerHeaders() {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  }

  // ==========================================
  // CARGAR LOS MAZOS DEL USUARIO
  // ==========================================

  async function cargarMazos() {
    try {
      const respuesta = await fetch(`${API}/mazos`, {
        method: "GET",
        headers: obtenerHeaders()
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.mensaje || "No se pudieron cargar los mazos");
      }

      setMazos(datos.mazos || []);

      if (datos.mazos && datos.mazos.length > 0) {
        setMazoSeleccionado((actual) => {
          const existe = datos.mazos.some(
            (mazo) => mazo.id === actual
          );

          return existe ? actual : datos.mazos[0].id;
        });
      } else {
        setMazoSeleccionado(null);
      }

    } catch (error) {
      console.error("Error al cargar los mazos:", error);
      alert(error.message);
    }
  }

  // ==========================================
  // CARGAR LAS CARTAS QUE TIENE EL USUARIO
  // ==========================================

  async function cargarCartas() {
    try {
      const respuesta = await fetch(`${API}/cartas/mis-cartas`, {
        method: "GET",
        headers: obtenerHeaders()
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.mensaje || "No se pudieron cargar las cartas");
      }

      const cartas = (datos.cartas || []).map((carta) => ({
        ...carta,
        tipo: "carta",
        imagen: carta.imagen
          ? `${API}/imagenes/cartas/${carta.imagen}`
          : null
      }));

      setCartasDisponibles(cartas);

    } catch (error) {
      console.error("Error al cargar las cartas:", error);
      alert(error.message);
    }
  }

  // ==========================================
  // CARGAR LOS DATOS AL ENTRAR A LA PÁGINA
  // ==========================================

  useEffect(() => {
    async function iniciar() {

      if (!token) {
        alert("Tenés que iniciar sesión para ver tus mazos.");
        setCargando(false);
        return;
      }

      setCargando(true);

      await Promise.all([
        cargarMazos(),
        cargarCartas()
      ]);

      setCargando(false);
    }

    iniciar();
  }, []);

  // ==========================================
  // BUSCAR EL MAZO SELECCIONADO
  // ==========================================

  const mazoActual = mazos.find(
    (mazo) => mazo.id === mazoSeleccionado
  );

  // ==========================================
  // FILTRAR LAS CARTAS DISPONIBLES
  // ==========================================

  const articulosFiltrados = cartasDisponibles
    .filter((articulo) => {

      const coincideRareza =
        filtros.rareza.length === 0 ||
        filtros.rareza.includes(articulo.rareza);

      const coincideCategoria =
        filtros.categoria === "todos" ||
        articulo.categoria === filtros.categoria;

      return coincideCategoria && coincideRareza;
    })
    .sort((a, b) => {

      if (filtros.orden === "precio") {
        return a.precio - b.precio;
      }

      if (filtros.orden === "reciente") {
        return b.id - a.id;
      }

      return 0;
    });

  // ==========================================
  // AGREGAR CARTA AL MAZO
  // ==========================================

  async function agregarCarta(carta) {

    if (!mazoActual) {
      alert("Primero tenés que seleccionar un mazo.");
      return;
    }

    try {
      const respuesta = await fetch(
        `${API}/mazos/${mazoSeleccionado}/cartas`,
        {
          method: "POST",
          headers: obtenerHeaders(),
          body: JSON.stringify({
            carta_id: carta.id
          })
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.mensaje || "No se pudo agregar la carta");
      }

      await cargarMazos();

    } catch (error) {
      console.error("Error al agregar carta:", error);
      alert(error.message);
    }
  }

  // ==========================================
  // QUITAR CARTA DEL MAZO
  // ==========================================

  async function quitarCarta(cartaId) {

    try {
      const respuesta = await fetch(
        `${API}/mazos/${mazoSeleccionado}/cartas/${cartaId}`,
        {
          method: "DELETE",
          headers: obtenerHeaders()
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.mensaje || "No se pudo quitar la carta");
      }

      await cargarMazos();

    } catch (error) {
      console.error("Error al quitar carta:", error);
      alert(error.message);
    }
  }

  // ==========================================
  // CREAR UN NUEVO MAZO
  // ==========================================

  async function agregarMazo() {

    try {
      const respuesta = await fetch(`${API}/mazos`, {
        method: "POST",
        headers: obtenerHeaders(),
        body: JSON.stringify({
          nombre: `Mazo ${mazos.length + 1}`
        })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.mensaje || "No se pudo crear el mazo");
      }

      await cargarMazos();

      if (datos.mazo) {
        setMazoSeleccionado(datos.mazo.id);
      }

    } catch (error) {
      console.error("Error al crear mazo:", error);
      alert(error.message);
    }
  }

  // ==========================================
  // GUARDAR MAZO
  // ==========================================

  function guardarMazo() {
    alert("¡Tu mazo ya está guardado!");
  }

  // ==========================================
  // MOSTRAR LA PÁGINA
  // ==========================================

  if (cargando) {
    return (
      <main className="vista-mazos">
        <h2>Cargando tus mazos...</h2>
      </main>
    );
  }

  return (
    <main className="vista-mazos">

      <header className="mazos-header">
        <div className="inicio-texto-icono">
          <img src="/tienda.png" alt="mis-mazos-icono" />
          <h1>Mis Mazos</h1>
        </div>

        <p>
          Crea y organiza tus mejores combinaciones para la batalla
        </p>
      </header>

      <ListaMazos
        mazos={mazos}
        mazoSeleccionado={mazoSeleccionado}
        onSeleccionar={setMazoSeleccionado}
        onAgregarMazo={agregarMazo}
      />

      <EditorMazo
        mazo={mazoActual}
        onQuitar={quitarCarta}
        onGuardar={guardarMazo}
      />

      <div className="seccion-disponibles-header">
        <h2>Tus Cartas Disponibles</h2>
      </div>

      <div className="contenido-disponibles-layout">

        <Filtros
          tipo="carta"
          filtros={filtros}
          onChange={setFiltros}
        />

        <ListaProductos
          articulos={articulosFiltrados}
          mostrarPrecio={false}
          onSeleccionar={agregarCarta}
        />

      </div>

    </main>
  );
}
