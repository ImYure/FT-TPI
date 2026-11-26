
import "../estilos/sobresAdmin.css";
import "../estilos/TarjetaSobre.css";

export default function TarjetaSobre({
    id,
    nombre,
    descripcion,
    imagen,
    precio,
    cantidad,
    mostrarPrecio,
    onComprar,
    comprando
}) {
    return (
        <div className="tarjeta-sobre">

            <div className="sobre-visual">
                <div className="sobre-paquete">
                    <div className="sobre-escudo-centro"></div>
                </div>
            </div>

            <div className="tarjeta-sobre__info">
                <h3>{nombre}</h3>

                <p>{descripcion}</p>

                {mostrarPrecio && (
                    <button
                        type="button"
                        className="tarjeta-sobre__precio"
                        onClick={onComprar}
                        disabled={!onComprar || comprando}
                    >
                        <img src="/saldo.png" alt="Saldo" />

                        <span>
                            {comprando ? "Comprando..." : precio}
                        </span>
                    </button>
                )}

                {!mostrarPrecio && cantidad !== undefined && (
                    <p className="cantidad-inventario">
                        Cantidad: {cantidad}
                    </p>
                )}
            </div>

        </div>
    );
}
