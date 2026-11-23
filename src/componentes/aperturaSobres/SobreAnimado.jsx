import { useState } from "react";
import "../../estilos/apertura.css";

export default function SobreAnimado({
    sobre,
    cartasDisponibles,
    onCerrar
}) {
    const [etapa, setEtapa] = useState("sobre");

    // Determinamos cuántas cartas entrega el sobre
    const cantidadCartas = sobre.rareza === "comun" ? 3 : 5;

    // Elegimos las cartas aleatoriamente
    const cartasObtenidas = [];

    for (let i = 0; i < cantidadCartas; i++) {
        if (cartasDisponibles.length > 0) {
            const indice = Math.floor(
                Math.random() * cartasDisponibles.length
            );

            cartasObtenidas.push(cartasDisponibles[indice]);
        }
    }

    return (
        <div className="apertura-fondo">

            {etapa === "sobre" && (
                <div className="apertura-escena">

                    <div className="sobre-animado">

                        <div className="sobre-cuerpo">
                            <img
                                src={sobre.imagen}
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
                <div
                    className="resultado-apertura"
                    onClick={onCerrar}
                >
                    <h2>¡Sobre abierto!</h2>

                    <p>Estas son las cartas que obtuviste:</p>

                    <div className="cartas-obtenidas">
                        {cartasObtenidas.map((carta, indice) => (
                            <div
                                className="carta-obtenida"
                                key={indice}
                            >
                                <img
                                    src={carta.imagen}
                                    alt={carta.nombre}
                                />

                                <h3>{carta.nombre}</h3>

                                <span>{carta.rareza}</span>
                            </div>
                        ))}
                    </div>

                    <p className="mensaje-continuar">
                        Tocá cualquier parte para continuar
                    </p>
                </div>
            )}

        </div>
    );
}