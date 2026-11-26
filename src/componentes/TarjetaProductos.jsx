
export default function TarjetaProductos({
    id,
    tipo,
    nombre,
    descripcion,
    imagen,
    precio,
    cantidad,
    mostrarPrecio,
    onAbrirSobre,
    mostrarBotonAbrir = false
}) {
    let rutaImagen = "";

    if (imagen) {
        if (imagen.startsWith("http")) {
            rutaImagen = imagen;
        } else if (imagen.startsWith("/")) {
            rutaImagen = `http://localhost:3000${imagen}`;
        } else {
            rutaImagen = `http://localhost:3000/imagenes/sobres/${imagen}`;
        }
    }

    return (
        <div className="tarjeta-producto">

            <div className="tarjeta-producto__imagen-contenedor">
                {rutaImagen && (
                    <img
                        src={rutaImagen}
                        alt={nombre}
                    />
                )}
            </div>

            <div className="tarjeta-producto__info">

                <h3>{nombre}</h3>

                <p>{descripcion}</p>

                {mostrarPrecio && (
                    <button
                        type="button"
                        className="tarjeta-producto__precio"
                    >
                        <div className="saldo-icono">
                            <img src="/saldo.png" alt="Saldo" />
                        </div>

                        <span className="tarjeta-producto__numero-precio">
                            {precio}
                        </span>
                    </button>
                )}

                {!mostrarPrecio && cantidad !== undefined && (
                    <p className="cantidad-inventario">
                        Cantidad: {cantidad}
                    </p>
                )}

                {tipo === "sobre" && mostrarBotonAbrir && (
                    <button
                        type="button"
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
