
export default function ListaMazos({
  mazos,
  mazoSeleccionado,
  onSeleccionar,
  onAgregarMazo
}) {
  return (
    <div className="selector-mazos">

      {mazos.map((mazo, index) => {
        const totalCartas = mazo.cartas.reduce(
          (acc, item) => acc + item.cantidad,
          0
        );

        const activo = mazoSeleccionado === mazo.id;

        return (
          <button
            key={mazo.id}
            type="button"
            title={`${mazo.nombre} (${totalCartas}/8 cartas)`}
            className={`pill-mazo ${activo ? "activo" : "circulo"}`}
            onClick={() => onSeleccionar(mazo.id)}
          >
            {activo ? mazo.nombre : index + 1}
          </button>
        );
      })}

      {/* BOTÓN PARA AGREGAR UN NUEVO MAZO */}
      <button
        type="button"
        className="pill-mazo circulo"
        onClick={onAgregarMazo}
        title="Crear un nuevo mazo"
      >
        +
      </button>

    </div>
  );
}
