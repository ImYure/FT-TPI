import { describe, test, expect, assert } from "vitest";
import { esPar, formatearPrecio, iniciales, contarPalabras } from "./funciones.js";



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


//─────────────────────────────────────────────────────────────────────
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
    //arrange
    const monto=1500


    //Act
    const resultado= formatearPrecio(monto)

    //Assert
    expect(resultado).toBe("$ 1.500");
  });

  test("formatea un monto con decimales",()=>{
   //arrange
    const monto=1500.5

    //Act
    const resultado= formatearPrecio(monto)

    //Assert
    expect(resultado).toBe("$ 1.500,50");

  })


  test("formatea el cero",() => {
    //arrange
    const monto=0

    //Act
    const resultado= formatearPrecio(monto)

    //Assert
    expect(resultado).toBe("$ 0");
  })

  test("formatea un monto negativo", () => {
     //arrange
    const monto= -200

    //Act
    const resultado= formatearPrecio(monto)

    //Assert
    expect(resultado).toBe("-$ 200");
  })

  test("usa dos separadores de miles en montos de siete cifras", () => {
     //arrange
    const monto=1234567

    //Act
    const resultado= formatearPrecio(monto)

    //Assert
    expect(resultado).toBe("$ 1.234.567");

  })
});

// ─────────────────────────────────────────────────────────────────────
// EJERCICIO 2
// Pensa: que pasa con un nombre de una sola palabra? Y con espacios de mas?
// Y con un string vacio?
// ─────────────────────────────────────────────────────────────────────
describe("iniciales", () => {
  test("devuelve las iniciales de un nombre y dos apellidos", () =>{
    //arrange
    const nombre= "mauro chanampa meneses"

    //act
    const resultado= iniciales(nombre)

    //assert
    expect(resultado).toBe("M.C.M.")

  })


  test("funciona con un nombre de una sola palabra",()=>{
        //arrange
    const nombre= "pan"

    //act
    const resultado= iniciales(nombre)

    //assert
    expect(resultado).toBe("P.")


  });


  test("ignora los espacios de mas",() => {
    //arrange
    const nombre= "valentin chanampa meneses"

    //act
    const resultado= iniciales(nombre)

    //assert
    expect(resultado).toBe("V.C.M.")

  });


  test("devuelve una cadena vacia si el nombre esta vacio", () =>{

       //arrange
    const nombre= ""

    //act
    const resultado= iniciales(nombre)

    //assert
    expect(resultado).toBe("")
  });
});

// ─────────────────────────────────────────────────────────────────────
// EJERCICIO 3
// Pensa en los casos extremos de un texto: vacio, solo espacios, una palabra,
// varias palabras separadas por muchos espacios, saltos de linea.
// ─────────────────────────────────────────────────────────────────────
describe("contarPalabras", () => {
  test("cuenta las palabras de una frase", () =>{

       //arrange
    const nombre= "leon kennedy"

    //act
    const resultado= contarPalabras(nombre)

    //assert
    expect(resultado).toBe(2)

  });


  test("devuelve 0 con un texto vacio", () =>{
       //arrange
    const vacio= ""

    //act
    const resultado= contarPalabras(vacio)

    //assert
    expect(resultado).toBe(0)

  });


  test("devuelve 0 con un texto de solo espacios", () =>{

     //arrange
    const nombre= "       "

    //act
    const resultado= contarPalabras(nombre)

    //assert
    expect(resultado).toBe(0)


  });


  test("no cuenta de mas si hay varios espacios seguidos", () =>{

      //arrange
    const nombre= "chris  redfield  corporacion"

    //act
    const resultado= contarPalabras(nombre)

    //assert
    expect(resultado).toBe(3)
    
  });


  test("cuenta bien si hay saltos de linea", () =>{
     //arrange
  const nombre= "chris\nredfield\ncorporacion"

    //act
    const resultado= contarPalabras(nombre)

    //assert
    expect(resultado).toBe(3)
  
  });
});