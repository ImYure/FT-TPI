
import TarjetaProductos from "./TarjetaProductos";
import TarjetaCarta from "./TarjetaCarta";
import TarjetaSobre from "./TarjetaSobre";

export default function ListaProductos({
    articulos,
    mostrarPrecio = false,
    onSeleccionar,
    onComprar,
    onComprarCarta,
    comprandoId
}) {
    return (
        <div className="lista-productos">

            {articulos.map((articulo) => (
                <div
                    key={`${articulo.tipo}-${articulo.id}`}
                    className={onSeleccionar ? "item-seleccionable" : ""}
                    onClick={() => {
                        if (onSeleccionar) {
                            onSeleccionar(articulo);
                        }
                    }}
                >

                    {articulo.tipo === "carta" ? (
                        <TarjetaCarta
                            carta={articulo}
                            mostrarPrecio={mostrarPrecio}
                            onComprar={
                                onComprarCarta
                                    ? (evento) => {
                                        evento.stopPropagation();
                                        onComprarCarta(articulo);
                                    }
                                    : undefined
                            }
                            comprando={comprandoId === articulo.id}
                        />

                    ) : articulo.tipo === "sobre" ? (
                        <TarjetaSobre
                            {...articulo}
                            mostrarPrecio={mostrarPrecio}
                            onComprar={
                                onComprar
                                    ? (evento) => {
                                        evento.stopPropagation();
                                        onComprar(articulo);
                                    }
                                    : undefined
                            }
                            comprando={comprandoId === articulo.id}
                        />

                    ) : (
                        <TarjetaProductos
                            {...articulo}
                            mostrarPrecio={mostrarPrecio}
                        />
                    )}

                </div>
            ))}

        </div>
    );
}
