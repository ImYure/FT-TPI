export default function TarjetaProductos({
    id,
    tipo,
    nombre,
    descripcion,
    imagen,
    precio
}) {
    return (
        <div className="tarjeta-producto">
            <div className="tarjeta-producto__imagen-contenedor">
                <img src={imagen} alt={nombre} />
            </div>

            <div className="tarjeta-producto__info">
                <h3>{nombre}</h3>
                <p>{descripcion}</p>

                <div className="tarjeta-producto__precio">
                    <div className="saldo-icono">
                        <img src="../public/saldo.png" alt="Saldo" />
                    </div>
                    <span className="tarjeta-producto__numero-precio">{precio}</span>
                </div>
            </div>
        </div>
    );
}
