import "../estilos/TarjetaCarta.css";

export default function TarjetaCarta({ carta, mostrarPrecio }) {
    return (
        <div className={`carta-item rareza-${carta.rareza}`}>
            <div className="carta-item__interior">
                <div className="carta-item__header">
                    <span className="carta-item__rareza">★ {carta.rareza}</span>
                </div>

                <h3 className="carta-item__nombre">{carta.nombre}</h3>

                <div className="carta-item__imagen">
                    <img src={carta.imagen} alt={carta.nombre} />
                </div>

                <div className="carta-item__stats">
                    <div className="carta-stat">
                        <strong>{carta.vida}</strong>
                        <span>Vida</span>
                    </div>
                    <div className="carta-stat">
                        <strong>{carta.ataque}</strong>
                        <span>Ataque</span>
                    </div>
                    <div className="carta-stat">
                        <strong>{carta.defensa}</strong>
                        <span>Def</span>
                    </div>
                    <div className="carta-stat">
                        <strong>{carta.velocidad}</strong>
                        <span>Vel</span>
                    </div>
                </div>

                <div className="carta-item__habilidad">
                    <h4>{carta.habilidad || "Habilidad Especial"}</h4>
                    <p>{carta.descripcion}</p>
                </div>

                {mostrarPrecio && (
                    <button className="tarjeta-producto__precio">
                        <div className="saldo-icono">
                            <img src="../public/saldo.png" alt="Saldo" />
                        </div>
                        <span className="tarjeta-producto__numero-precio">{carta.precio}</span>
                    </button>
                )}
                
            </div>
        </div>
    );
}