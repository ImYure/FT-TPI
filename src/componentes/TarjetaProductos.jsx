
export default function TarjetaProductos({
    id,
    tipo,
    nombre,
    descripcion,
    imagen,
    precio,
    mostrarPrecio,
    onAbrirSobre,
    mostrarBotonAbrir = false
}) {
    return (
        <div className="tarjeta-producto">

            <div className="tarjeta-producto__imagen-contenedor">
                <img src={imagen} alt={nombre} />
            </div>

            <div className="tarjeta-producto__info">
                <h3>{nombre}</h3>
                <p>{descripcion}</p>

                {mostrarPrecio && (
                    <button className="tarjeta-producto__precio">
                        <div className="saldo-icono">
                            <img src="/saldo.png" alt="Saldo" />
                        </div>

                        <span className="tarjeta-producto__numero-precio">
                            {precio}
                        </span>
                    </button>
                )}

                {tipo === "sobre" && mostrarBotonAbrir && (
                    <button
                        className="tarjeta-producto__abrir"
                        onClick={() => onAbrirSobre?.(id)}
                    >
                        Abrir sobre
                    </button>
                )}
            </div>

        </div>
    );
}
