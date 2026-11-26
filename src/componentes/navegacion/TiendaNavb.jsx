
export default function TiendaNavb({
  tipo = "todos",
  onChange = () => { }
}) {
  return (
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

      <button
        type="button"
        onClick={() => onChange("monedas")}
        className={`boton-registro tiendaNavb-boton ${tipo === "monedas" ? "activo" : ""}`}
      >
        <span>🪙</span>
        Monedas
      </button>

    </div>
  );
}
