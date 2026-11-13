import TarjetaProductos from "./TarjetaProductos";

export default function ListaProductos({ articulos }) {

    return (
        <div className="lista-productos">
            {articulos.map((articulo) =>
                <TarjetaProductos
                    key={articulo.id}
                    id={articulo.id}
                    tipo={articulo.tipo}
                    nombre={articulo.nombre}
                    descripcion={articulo.descripcion}
                    imagen={articulo.imagen}
                    precio={articulo.precio}
                />
            )}
        </div>
    );
}