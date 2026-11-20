export default function EditorMazo({ mazo, onQuitar, onGuardar }) {
  if (!mazo) return null;

  // Expandir cartas según su cantidad para mostrar hasta 8 cartas en fila
  const cartasExpandidas = mazo.cartas.flatMap((carta) =>
    Array.from({ length: carta.cantidad }, (_, idx) => ({
      ...carta,
      slotKey: `${carta.id}-${idx}`
    }))
  );

  const slots = Array.from({ length: 8 }, (_, i) => cartasExpandidas[i] || null);

  return (
    <section className="tablero-mazo-wrapper">
      <div className="tablero-mazo-caja">
        <div className="grid-ocho-cartas">
          {slots.map((carta, idx) =>
            carta ? (
              <div key={carta.slotKey} className="slot-carta ocupada">
                <span className="badge-rareza">{carta.rareza || "Común"}</span>
                <p className="nombre-carta-mazo">{carta.nombre}</p>
                {carta.imagen && (
                  <img src={carta.imagen} alt={carta.nombre} className="img-carta-mazo" />
                )}
                <button
                  type="button"
                  className="btn-quitar-carta"
                  onClick={() => onQuitar(carta.id)}
                  title="Quitar carta"
                >
                  ×
                </button>
              </div>
            ) : (
              <div key={`vacio-${idx}`} className="slot-carta vacia">
                <span>Vacío</span>
              </div>
            )
          )}
        </div>
      </div>

      <div className="acciones-mazo">
        <button
          type="button"
          className="btn-guardar-mazo"
          onClick={() => onGuardar?.(mazo)}
        >
          Guardar Mazo
        </button>
      </div>
    </section>
  );
}