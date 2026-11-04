import { describe, test, expect } from "vitest";
import {
    esPar,
    formatearPrecio,
    iniciales,
    contarPalabras,
} from "./funciones.js";

/* ═══════════════════════════════════════════════════════════════════
   EJERCICIO 0 - Primeros tests unitarios

   El primer bloque esta RESUELTO como ejemplo.
   Completa los tres que faltan siguiendo el mismo patron AAA.

   Corre `npm run test:watch` y trabaja con el resultado a la vista.
   ═══════════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────────────
// RESUELTO - usalo de modelo
// ─────────────────────────────────────────────────────────────────────
describe("esPar", () => {
    test("devuelve true cuando el numero es par", () => {
        // Arrange
        const numero = 4;

        // Act
        const resultado = esPar(numero);

        // Assert
        expect(resultado).toBe(true);
    });

    test("devuelve false cuando el numero es impar", () => {
        expect(esPar(7)).toBe(false);
    });

    test("considera al cero como par", () => {
        expect(esPar(0)).toBe(true);
    });

    test("funciona con numeros negativos", () => {
        expect(esPar(-4)).toBe(true);
        expect(esPar(-3)).toBe(false);
    });
});

// ─────────────────────────────────────────────────────────────────────
// EJERCICIO 1
// Escribi al menos 5 tests. Acordate de:
//   - un caso simple (1500)
//   - un caso con decimales (1500.5)
//   - el cero
//   - un negativo
//   - un numero grande, con dos separadores de miles (1234567)
// ─────────────────────────────────────────────────────────────────────
describe("formatearPrecio", () => {
    test("formatea un monto entero con separador de miles", () => {
        expect(formatearPrecio(1500)).toBe("$ 1.500");
    });

    test("formatea un monto con decimales", () => {
        //Arrange
        const monto = 1500.5;

        //Act
        const resultado = formatearPrecio(monto);

        //Assert
        expect(resultado).toBe("$ 1.500,50");
    });

    test("formatea el cero", () => {
        //Arrange
        const monto = 0;

        //Act
        const resultado = formatearPrecio(monto);

        //Assert
        expect(resultado).toBe("$ 0");
    });

    test("formatea un monto negativo", () => {
        //Arrange
        const monto = -200;

        //Act
        const resultado = formatearPrecio(monto);

        //Assert
        expect(resultado).toBe("-$ 200");
    });

    test("usa dos separadores de miles en montos de siete cifras", () => {
        //Arrange
        const monto = 1234567

        //Act
        const resultado = formatearPrecio(monto)

        //Assert
        expect(resultado).toBe("$ 1.234.567")
    });
});


// ─────────────────────────────────────────────────────────────────────
// EJERCICIO 2
// Pensa: que pasa con un nombre de una sola palabra? Y con espacios de mas?
// Y con un string vacio?
// ─────────────────────────────────────────────────────────────────────


describe("iniciales", () => {
    test("devuelve las iniciales de un nombre y dos apellidos", () => {
        //Arrange
        const nombres = "ana maria lopez";

        //Act
        const resultado = iniciales(nombres);

        //Assert
        expect(resultado).toBe("A.M.L.")
    });

    test("funciona con un nombre de una sola palabra", () => {
        //Arrange
        const nombre = "Ana"

        //Act
        const resultado = iniciales(nombre)

        //Assert
        expect(resultado).toBe("A.")
    });

    test("ignora los espacios de mas", () => {
        //Arrange
        const nombre = "Ana  Maria  Lopez"

        //Act
        const resultado = iniciales(nombre)

        //Assert
        expect(resultado).toBe("A.M.L.")
    });
    test("devuelve una cadena vacia si el nombre esta vacio", () => {
        //Arrange
        const nombre = ""

        //Act
        const resultado = iniciales(nombre)

        //Assert
        expect(resultado).toBe("")
    });
});

// ─────────────────────────────────────────────────────────────────────
// EJERCICIO 3
// Pensa en los casos extremos de un texto: vacio, solo espacios, una palabra,
// varias palabras separadas por muchos espacios, saltos de linea.
// ─────────────────────────────────────────────────────────────────────
describe("contarPalabras", () => {
    test("cuenta las palabras de una frase", () => {
        //Arrange
        const texto = "Hatsune Miku"

        //Act
        const resultado = contarPalabras(texto)

        //Assert
        expect(resultado).toBe(2)
    });

    test("devuelve 0 con un texto vacio", () => {
        //Arrange
        const texto = ""

        //Act
        const resultado = contarPalabras(texto)

        //Assert
        expect(resultado).toBe(0)
    });

    test("devuelve 0 con un texto de solo espacios", () => {
        //Arrange
        const texto = "   "

        //Act
        const resultado = contarPalabras(texto)

        //Assert
        expect(resultado).toBe(0)
    });

    test("no cuenta de mas si hay varios espacios seguidos", () => {
        //Arrange
        const texto = "Hatsune   Miku"

        //Act
        const resultado = contarPalabras(texto)

        //Assert
        expect(resultado).toBe(2)
    });

    test("cuenta bien si hay saltos de linea", () => {
        //Arrange
        const texto = "Hatsune\nMiku\nAzure";

        //Act
        const resultado = contarPalabras(texto)

        //Assert
        expect(resultado).toBe(3)
    });

});
