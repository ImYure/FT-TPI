import "../App.css";
import cartasInicio from "../assets/cartas.inicio.png";

function Inicio() {
  return (
    <main className="inicio">
      <section className="inicio-contenido">
        <div className="inicio-texto">
          <h1>
            Todas tus cartas y colecciones en un solo
            <span> lugar</span>
          </h1>

          <p>
            El mejor sitio web para tus peleas favoritas y colecciones de cartas.
          </p>

          <div className="inicio-botones">
            <button>Ver mis sobres</button>
            <button>Ver mis cartas</button>
          </div>

          <div className="inicio-estadisticas">
            <div>
              <h2>67mil</h2>
              <p>Usuarios registrados</p>
            </div>

            <div>
              <h2>6.7/10</h2>
              <p>Valoracion</p>
            </div>

            <div>
              <h2>24/7</h2>
              <p>Siempre disponible</p>
            </div>
          </div>
        </div>

        <div className="inicio-imagen">
          <img
            src={cartasInicio}
            alt="Cartas coleccionables del juego"
          />
        </div>
      </section>
    </main>
  );
}

export default Inicio;