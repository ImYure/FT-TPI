import { Link } from "wouter";
export default function TiendaNavb() {
  return (
    <main className="inicio">
      <section className="inicio-contenido">
        <div className="inicio-texto">

          <div className="inicio-texto-icono">
            <img src="../public/tienda.png" alt="tienda-icono" />
            <h1>Tienda</h1>
          </div>

          <p>Adquiri cartas, sobres y objetos para tu coleccón </p>

          <div className="inicio-botones">

            <Link href="/tienda/sobres" className="boton-registro tiendaNavb-boton">
              <span>♙</span>
              Sobres
            </Link>
            <Link href="/tienda/cartas" className="boton-registro tiendaNavb-boton">
              <span>♙</span>
              Cartas
            </Link>
            <Link href="/tienda/consumibles" className="boton-registro tiendaNavb-boton">
              <span>♙</span>
              Consumibles???
            </Link>
            <Link href="/tienda/recarga" className="boton-registro tiendaNavb-boton">
              <span>♙</span>
              Recarga
            </Link>



          </div>
        </div>


      </section>
    </main>
  );
}