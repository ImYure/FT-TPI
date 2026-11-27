
import { useState } from "react";
import "../../estilos/apertura.css";

export default function SobreAnimado({
    sobre,
    cartasObtenidas = [],
    onCerrar
}) {
    const [etapa, setEtapa] = useState("sobre");

    function obtenerImagenSobre() {
        console.log("Imagen del sobre:", sobre.imagen);
        if (!sobre?.imagen) return "";

        if (sobre.imagen.startsWith("http")) {
            return sobre.imagen;
        }

        if (sobre.imagen.startsWith("/")) {
            return `http://localhost:3000${sobre.imagen}`;
        }

        return `http://localhost:3000/imagenes/sobres/${sobre.imagen}`;
    }

    function obtenerImagenCarta(imagen) {
        if (!imagen) return "";

        if (imagen.startsWith("http")) {
            return imagen;
        }

        if (imagen.startsWith("/")) {
            return `http://localhost:3000${imagen}`;
        }

        return `http://localhost:3000/imagenes/cartas/${imagen}`;
    }

    return (
        <div className="apertura-fondo">

            {etapa === "sobre" && (
                <div className="apertura-escena">

                    <div className="sobre-animado">

                        <div className="sobre-cuerpo">
                            <img
                                src={obtenerImagenSobre()}
                                alt={sobre.nombre}
                            />
                        </div>

                        <div
                            className="sobre-costura"
                            onAnimationEnd={() => setEtapa("resultado")}
                        ></div>

                        <div className="sobre-brillo"></div>

                    </div>

                </div>
            )}

            {etapa === "resultado" && (
                <div className="resultado-apertura">

                    <h2>¡Sobre abierto!</h2>

                    <p>Estas son las cartas que obtuviste:</p>

                    {cartasObtenidas.length > 0 ? (

                        <div className="cartas-obtenidas">

                            {cartasObtenidas.map((carta, indice) => (
                                <div
                                    className="carta-obtenida"
                                    key={`${carta.id}-${indice}`}
                                >

                                    <img
                                        src={obtenerImagenCarta(carta.imagen)}
                                        alt={carta.nombre}
                                    />

                                    <h3>{carta.nombre}</h3>

                                    <span>{carta.rareza}</span>

                                </div>
                            ))}

                        </div>

                    ) : (

                        <p>
                            Todavía no se recibieron las cartas de la apertura.
                        </p>

                    )}

                    <button
                        type="button"
                        className="tarjeta-producto__abrir"
                        onClick={onCerrar}
                    >
                        Continuar
                    </button>

                </div>
            )}

        </div>
    );
}
