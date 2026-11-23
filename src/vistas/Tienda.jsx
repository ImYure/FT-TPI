
import { useState, useEffect } from "react";
import axios from "axios";

import Filtros from "../componentes/Filtros.jsx";
import TiendaNavb from "../componentes/navegacion/TiendaNavb.jsx";
import ListaProductos from "../componentes/ListaProductos.jsx";
import Saldo from "../componentes/Saldo.jsx";

export default function Tienda() {

  const [articulos, setArticulos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [rarezas, setRarezas] = useState([]);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [filtros, setFiltros] = useState({
    tipo: "todos",
    categoria: "todos",
    rareza: [],
    orden: "ninguno"
  });

  // 1. Obtener categorías y rarezas
  useEffect(() => {

    axios.all([
      axios.get("http://localhost:3000/cartas/categorias"),
      axios.get("http://localhost:3000/cartas/rareza")
    ])

      .then(([respuestaCategorias, respuestaRarezas]) => {
        setCategorias(respuestaCategorias.data.categorias);
        setRarezas(respuestaRarezas.data.rarezas);
      })

      .catch((error) => {
        console.error("Error al obtener los filtros:", error);
      });

  }, []);

  // 2. Obtener cartas según los filtros
  useEffect(() => {

    setCargando(true);
    setError("");

    axios.get("http://localhost:3000/cartas", {
      params: {
        categoria: filtros.categoria,
        rareza: filtros.rareza.join(","),
        orden: filtros.orden
      }
    })

      .then((respuesta) => {
        setArticulos(respuesta.data.cartas);
      })

      .catch((error) => {
        console.error("Error al obtener las cartas:", error);
        setError("No se pudieron cargar los artículos.");
      })

      .finally(() => {
        setCargando(false);
      });

  }, [filtros.categoria, filtros.rareza, filtros.orden]);

  return (

    <div className="inicio-contenido tienda">

      <Filtros
        filtros={filtros}
        onChange={setFiltros}
        categorias={categorias}
        rarezas={rarezas}
      />

      <div className="tienda-columna-derecha">

        <div className="inicio-texto">
          <div className="inicio-texto-icono">
            <img src="../public/tienda.png" alt="tienda-icono" />
            <h1>Tienda</h1>
          </div>

          <p>Adquirí cartas, sobres y objetos para tu colección</p>
        </div>

        <TiendaNavb
          tipo={filtros.tipo}
          onChange={(tipo) =>
            setFiltros({
              ...filtros,
              tipo: tipo
            })
          }
        />

        {cargando ? (
          <p>Cargando artículos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : articulos.length === 0 ? (
          <p>No se encontraron cartas.</p>
        ) : (
          <ListaProductos
            articulos={articulos}
            mostrarPrecio={true}
          />
        )}

      </div>

      <Saldo />

    </div>
  );
}
