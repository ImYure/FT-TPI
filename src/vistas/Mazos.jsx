import { useState } from "react";
import Filtros from "../componentes/Filtros.jsx";
import ListaProductos from "../componentes/ListaProductos.jsx";
import articulosDefault from "../datos/articulos.js";
import ListaMazos from "../componentes/mazos/ListaMazos.jsx";
import EditorMazo from "../componentes/mazos/EditorMazo.jsx";
import "../estilos/ListaMazos.css";

export default function Mazos() {
  // 1. Crear los mazos iniciales
  const [mazos, setMazos] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      nombre: `Mazo ${i + 1}`,
      cartas: []
    }))
  );

  // 2. Guardar el mazo seleccionado
  const [mazoSeleccionado, setMazoSeleccionado] = useState(1);

  // 3. Estados de los filtros
  const [filtros, setFiltros] = useState({
    categoria: "todos",
    rareza: [],
    orden: "ninguno"
  });

  // 4. Buscar el mazo seleccionado
  const mazoActual = mazos.find(
    (mazo) => mazo.id === mazoSeleccionado
  );

  // 5. Filtrar únicamente cartas
  const articulosFiltrados = articulosDefault
    .filter((articulo) => {
      const esCarta = articulo.tipo === "carta";

      const coincideRareza =
        filtros.rareza.length === 0 ||
        filtros.rareza.includes(articulo.rareza);

      const coincideCategoria =
        filtros.categoria === "todos" ||
        articulo.categoria === filtros.categoria;

      return esCarta && coincideCategoria && coincideRareza;
    })
    .sort((a, b) => {
      if (filtros.orden === "precio") return a.precio - b.precio;
      if (filtros.orden === "reciente") return b.id - a.id;
      return 0;
    });

  // 6. Agregar una carta al mazo seleccionado (límite de 8)
  function agregarCarta(carta) {
    if (!mazoActual) return;

    const cantidadActual = mazoActual.cartas.reduce(
      (total, item) => total + item.cantidad,
      0
    );

    if (cantidadActual >= 8) {
      alert("Este mazo ya tiene 8 cartas.");
      return;
    }

    setMazos(
      mazos.map((mazo) => {
        if (mazo.id !== mazoSeleccionado) return mazo;

        const cartaExistente = mazo.cartas.find(
          (item) => item.id === carta.id
        );

        if (cartaExistente) {
          return {
            ...mazo,
            cartas: mazo.cartas.map((item) =>
              item.id === carta.id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            )
          };
        }

        return {
          ...mazo,
          cartas: [...mazo.cartas, { ...carta, cantidad: 1 }]
        };
      })
    );
  }

  // 7. Quitar una copia de una carta
  function quitarCarta(cartaId) {
    setMazos(
      mazos.map((mazo) => {
        if (mazo.id !== mazoSeleccionado) return mazo;

        return {
          ...mazo,
          cartas: mazo.cartas
            .map((carta) =>
              carta.id === cartaId
                ? { ...carta, cantidad: carta.cantidad - 1 }
                : carta
            )
            .filter((carta) => carta.cantidad > 0)
        };
      })
    );
  }

  // 8. Crear un nuevo mazo adicional
  function agregarMazo() {
    const nuevoId =
      mazos.length > 0 ? Math.max(...mazos.map((m) => m.id)) + 1 : 1;

    const nuevoMazo = {
      id: nuevoId,
      nombre: `Mazo ${nuevoId}`,
      cartas: []
    };

    setMazos([...mazos, nuevoMazo]);
    setMazoSeleccionado(nuevoId);
  }

  // 9. Guardar mazo
  function guardarMazo(mazoGuardado) {
    console.log("Mazo guardado:", mazoGuardado);
  }

  return (
    <main className="vista-mazos">
      <header className="mazos-header">
        <div className="inicio-texto-icono">
          <img src="/tienda.png" alt="mis-mazos-icono" />
          <h1>Mis Mazos</h1>
        </div>
        <p>Crea y organiza tus mejores combinaciones para la batalla</p>
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