export default function TiendaNavb({
  tipo = "todos",
  onChange = () => { },
  titulo = "Tienda",
  descripcion = "Adquirí cartas, sobres y objetos para tu colección"
}) {
  return (
    <main className="inicio">
      <section className="inicio-contenido">
        <div className="inicio-texto">

          <div className="inicio-botones">

            <button
              type="button"
              onClick={() => onChange("sobre")}
              className={`boton-registro tiendaNavb-boton ${tipo === "sobre" ? "activo" : ""}`}
            >
              <span>♙</span>
              Sobres
            </button>

            <button
              type="button"
              onClick={() => onChange("carta")}
              className={`boton-registro tiendaNavb-boton ${tipo === "carta" ? "activo" : ""}`}
            >
              <span>♙</span>
              Cartas
            </button>

            <button
              type="button"
              onClick={() => onChange("todos")}
              className={`boton-registro tiendaNavb-boton ${tipo === "todos" ? "activo" : ""}`}
            >
              <span>♙</span>
              Todos
            </button>

          </div>
        </div>
      </section>
    </main>
  );
}