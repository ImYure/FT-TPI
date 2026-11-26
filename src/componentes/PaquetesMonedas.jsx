
import { useState, useEffect } from "react";
import axios from "axios";

export default function PaquetesMonedas({ actualizarSaldo }) {

  const [paquetes, setPaquetes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [comprando, setComprando] = useState(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {

    axios.get("http://localhost:3000/productos")

      .then((respuesta) => {
        setPaquetes(respuesta.data);
      })

      .catch((error) => {
        console.error("Error al cargar los paquetes:", error);
        setError("No se pudieron cargar los paquetes de monedas.");
      })

      .finally(() => {
        setCargando(false);
      });

  }, []);

  function comprarPaquete(paquete) {

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Tenés que iniciar sesión para comprar monedas.");
      return;
    }

    const confirmar = window.confirm(
      `¿Querés comprar ${paquete.nombre} por $${Number(paquete.precio_unitario).toLocaleString("es-AR")}?`
    );

    if (!confirmar) {
      return;
    }

    setComprando(paquete.id);
    setError("");
    setMensaje("");

    axios.post(
      "http://localhost:3000/productos/comprar",
      {
        producto_id: paquete.id,
        codigo_simulacion: "VOL-APROBADO"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

      .then((respuesta) => {

        if (respuesta.data.estado === "aprobado") {

          setMensaje(
            `¡Compra aprobada! Recibiste ${respuesta.data.monedas} monedas.`
          );

          actualizarSaldo();

        } else {

          setError("La compra fue rechazada.");

        }

      })

      .catch((error) => {

        console.error("Error al comprar:", error);

        setError(
          error.response?.data?.mensaje ||
          "No se pudo realizar la compra."
        );

      })

      .finally(() => {
        setComprando(null);
      });

  }

  if (cargando) {
    return <p>Cargando paquetes...</p>;
  }

  return (

    <section className="paquetes-monedas">

      <div className="paquetes-monedas__encabezado">
        <h2>Paquetes de monedas</h2>
        <p>Elegí el paquete que querés agregar a tu billetera.</p>
      </div>

      {error && (
        <p className="paquetes-monedas__error">
          {error}
        </p>
      )}

      {mensaje && (
        <p className="paquetes-monedas__mensaje">
          {mensaje}
        </p>
      )}

      <div className="paquetes-monedas__lista">

        {paquetes.map((paquete) => (

          <article
            className="paquete-moneda"
            key={paquete.id}
          >

            <div className="paquete-moneda__icono">
              🪙
            </div>

            <h3>{paquete.nombre}</h3>

            <p className="paquete-moneda__cantidad">
              {Number(paquete.cantidad_monedas).toLocaleString("es-AR")} monedas
            </p>

            <p className="paquete-moneda__precio">
              ${Number(paquete.precio_unitario).toLocaleString("es-AR")}
            </p>

            <button
              type="button"
              onClick={() => comprarPaquete(paquete)}
              disabled={comprando !== null}
              className="paquete-moneda__boton"
            >
              {comprando === paquete.id
                ? "Procesando..."
                : "Comprar paquete"}
            </button>

          </article>

        ))}

      </div>

      <p className="paquetes-monedas__aclaracion">
        Compra simulada para demostración escolar. No se realiza ningún cobro real.
      </p>

    </section>

  );
}
