
export default function EditorMazo({ mazo, onQuitar, onGuardar }) {
  if (!mazo) return null;

  const cartasExpandidas = mazo.cartas.flatMap((carta) =>
    Array.from({ length: carta.cantidad }, (_, idx) => ({
      ...carta,
      slotKey: `${carta.id}-${idx}`
    }))
  );

  const slots = Array.from(
    { length: 8 },
    (_, i) => cartasExpandidas[i] || null
  );

  return (
    <section className="tablero-mazo-wrapper">

      <div className="tablero-mazo-caja">

        <div className="encabezado-mazo">
          <h2>{mazo.nombre}</h2>
          <p>{cartasExpandidas.length}/8 cartas</p>
        </div>

        <div className="grid-ocho-cartas">

          {slots.map((carta, idx) =>
            carta ? (

              <div key={carta.slotKey} className="slot-carta ocupada">

                <span className="badge-rareza">
                  ★ {carta.rareza || "Común"}
                </span>

                <p className="nombre-carta-mazo">
                  {carta.nombre}
                </p>

                {carta.imagen && (
                  <img
                    src={carta.imagen}
                    alt={carta.nombre}
                    className="img-carta-mazo"
                  />
                )}

                <div className="estadisticas-carta">

                  <div className="estadistica-carta">
                    <strong>{carta.vida ?? 0}</strong>
                    <span>Vida</span>
                  </div>

                  <div className="estadistica-carta">
                    <strong>{carta.ataque ?? 0}</strong>
                    <span>Ataque</span>
                  </div>

                  <div className="estadistica-carta">
                    <strong>{carta.defensa ?? 0}</strong>
                    <span>Def</span>
                  </div>

                  <div className="estadistica-carta">
                    <strong>{carta.velocidad ?? 0}</strong>
                    <span>Vel</span>
                  </div>

                </div>

                <div className="habilidad-carta">
                  <h4>Habilidad Especial</h4>
                  <p>{carta.descripcion || "Sin descripción"}</p>
                </div>

                <p className="cantidad-carta-mazo">
                  Cantidad: {carta.cantidad}
                </p>

                <button
                  type="button"
                  className="btn-quitar-carta"
                  onClick={() => onQuitar(carta.id)}
                  title="Quitar una copia"
                >
                  ×
                </button>

              </div>

            ) : (

              <div key={`vacio-${idx}`} className="slot-carta vacia">
                <span>Espacio vacío</span>
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
