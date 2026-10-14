import { describe, test, expect } from "vitest";
import { validarPassword, MENSAJES } from "./password.js";

// ─────────────────────────────────────────────────────────────────────
// RESUELTO - dos ejemplos, uno de cada tipo
// ─────────────────────────────────────────────────────────────────────
describe("validarPassword - casos válidos", () => {
  test("acepta una contraseña en el límite inferior de longitud (8)", () => {
    // Arrange
    const password = "Abc1234x"; // exactamente 8 caracteres

    // Act
    const resultado = validarPassword(password);

    // Assert
    expect(resultado).toEqual({ valida: true, errores: [] });
  });
});

describe("validarPassword - casos inválidos", () => {
  test("rechaza una contraseña sin mayúsculas", () => {
    const resultado = validarPassword("abc1234x");

    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.MAYUSCULA);
  });
});

// ─────────────────────────────────────────────────────────────────────
// TU TURNO
//
// Como mínimo tienen que estar:
//
//   VALORES LÍMITE de longitud
//     - 7 caracteres  (uno menos que el mínimo)
//     - 8 caracteres  (mínimo, ya resuelto arriba)
//     - 20 caracteres (máximo)
//     - 21 caracteres (uno más que el máximo)
//
//   PARTICIÓN por cada regla de contenido
//     - sin mayúscula (ya resuelto)
//     - sin número
//     - con espacio (al principio, en el medio y al final: ¿son el mismo caso?)
//
//   ACUMULACIÓN de errores
//     - una contraseña que viole 2 reglas devuelve 2 errores
//     - una contraseña que viole las 4 reglas devuelve 4 errores
//
//   CASOS DE LA VIDA REAL
//     - cadena vacía
//     - null / undefined
//     - un número en lugar de un string
//     - una contraseña con ñ o acentos
// ─────────────────────────────────────────────────────────────────────

describe("validarPassword - valores límite de longitud", () => {

  test.todo("rechaza una contraseña de 7 caracteres", () => {

    // Arrange
    const password = "12345Ab"; // exactamente 7 caracteres
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado).toEqual({ valida: false, errores: [] });

  });

  //test ya resuelto

  test.todo("acepta una contraseña de 20 caracteres", () => {
   
    // Arrange
    const password = "123456789a123456789A"; // exactamente 20 caracteres
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado).toEqual({ valida: true, errores: [] });
  });

  test.todo("rechaza una contraseña de 21 caracteres", () => {

    // Arrange
    const password = "123456789a123456789A1"; // exactamente 21 caracteres
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado).toEqual({ valida: true, errores: [] });
  });
});

describe("validarPassword - reglas de contenido", () => {
  test.todo("rechaza una contraseña sin números", () => {

    // Arrange
    const password = "Abcdefghi"; // exactamente 9 caracteres sin numero
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado).toEqual({ valida: false, errores: [] });

  });

  test.todo("rechaza una contraseña con un espacio al principio", () => {

    // Arrange
    const password = " 12345678Ab"; // exactamente 10 caracteres con espacio incluido al principio
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado).toEqual({ valida: false, errores: [] });

  });

  test.todo("rechaza una contraseña con un espacio en el medio", () => {
    
    // Arrange
    const password = "12345 678Ab"; // exactamente 10 caracteres con espacio incluido al medio
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado).toEqual({ valida: false, errores: [] });

  });

  test.todo("rechaza una contraseña con un espacio al final", () => {

    // Arrange
    const password = "12345678Ab "; // exactamente 10 caracteres con espacio incluido al final
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado).toEqual({ valida: false, errores: [] });


  });
});

describe("validarPassword - acumulación de errores", () => {
  test.todo("devuelve 2 errores si faltan mayúscula y número", () => {
    
    // Arrange
    const password = "abcdefghijk "; // falta mayuscula y numerpo
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado).toEqual({ valida: false, errores: [] });

  });
  test.todo("devuelve 4 errores si viola todas las reglas", () => {
    // Arrange
    const password = " x d "; // falta todo
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado).toEqual({ valida: false, errores: [] });

  });
});

describe("validarPassword - entradas inesperadas", () => {
  test.todo("rechaza una cadena vacía sin lanzar excepción", () => {
    // Arrange
    const password = " x d "; // falta todo
    // Act
    const resultado = validarPassword(password);
    // Assert
    //expect??
  });
  test.todo("rechaza null sin lanzar excepción", () => {
    // Arrange
    // Act
    // Assert

  });
  test.todo("rechaza undefined sin lanzar excepción", () => {
    // Arrange
    // Act
    // Assert

  });
  test.todo("rechaza un número sin lanzar excepción", () => {
    // Arrange
    // Act
    // Assert

  });
});

describe("validarPassword - caracteres del español", () => {
  test.todo("acepta una contraseña con ñ", () => {
    // Arrange
    // Act
    // Assert

  });
  test.todo("acepta una contraseña con acentos", () => {
    // Arrange
    // Act
    // Assert

  });
});

/*
|
| CASOS EXTRA PARA PRACTICAR (OPCIONALES)
| 
*/

describe("validarPassword - casos extra (opcional)", () => {
  test.todo("acepta una contraseña cuya única mayúscula es acentuada (Á, Ñ)");
  test.todo("rechaza una contraseña con un tab o salto de línea");
});

/* ─────────────────────────────────────────────────────────────────────
   DESAFÍO OPCIONAL
   Reescribí los casos de longitud usando `test.each` con una tabla.
   Fijate cómo la tabla del código queda casi igual a la del documento.
   ───────────────────────────────────────────────────────────────────── */
