import TarjetaProductos from "./TarjetaProductos";
import TarjetaCarta from "./TarjetaCarta";

export default function ListaProductos({ articulos, mostrarPrecio = false, onSeleccionar }) {
    return (
        <div className="lista-productos">
            {articulos.map((articulo) => (
                <div
                    key={articulo.id}
                    className={onSeleccionar ? "item-seleccionable" : ""}
                    onClick={() => onSeleccionar && onSeleccionar(articulo)}
                >
                    {articulo.tipo === "carta" ? (
                        <TarjetaCarta
                            carta={articulo}
                            mostrarPrecio={mostrarPrecio}
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