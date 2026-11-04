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

  test("rechaza una contraseña de 7 caracteres", () => {

    // Arrange
    const password = "12345aM"; // exactamente 7 caracteres
    // Act
    const resultado = validarPassword(password);
    // Assert
   expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.LONGITUD);

  });

  //test ya resuelto

  test("acepta una contraseña de 20 caracteres", () => {

    // Arrange
    const password = "123456789a123456789A"; // exactamente 20 caracteres
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado).toEqual({ valida: true, errores: [] });
  });

  test("rechaza una contraseña de 21 caracteres", () => {

    // Arrange
    const password = "123456789a123456789A1"; // exactamente 21 caracteres
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.LONGITUD);
  });
});

describe("validarPassword - reglas de contenido", () => {
  test("rechaza una contraseña sin números", () => {

    // Arrange
    const password = "aaaBBBccc"; // exactamente 9 caracteres sin numero
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.NUMERO);

  });

  test("rechaza una contraseña con un espacio al principio", () => {

    // Arrange
    const password = " 12345678Ab"; // exactamente 10 caracteres con espacio incluido al principio
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.ESPACIOS);

  });

  test("rechaza una contraseña con un espacio en el medio", () => {

    // Arrange
    const password = "12345 678Ab"; // exactamente 10 caracteres con espacio incluido al medio
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.ESPACIOS);

  });

  test("rechaza una contraseña con un espacio al final", () => {

    // Arrange
    const password = "12345678Ab "; // exactamente 10 caracteres con espacio incluido al final
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.ESPACIOS);


  });
});

describe("validarPassword - acumulación de errores", () => {
  test("devuelve 2 errores si faltan mayúscula y número", () => {

    // Arrange
    const password = "abcdefghijk "; // falta mayuscula y numerpo
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores.length).toBe(3);

  });
  test("devuelve 4 errores si viola todas las reglas", () => {
    // Arrange
    const password = " x d "; // falta todo
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores.length).toBe(4);

  });
});

describe("validarPassword - entradas inesperadas", () => {

  test("rechaza una cadena vacía", () => {
    const password = "";
    const resultado = validarPassword(password);
    
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.LONGITUD);
    // Si quieres verificar que contenga varios errores específicos, hazlo en líneas separadas:
    expect(resultado.errores).toContain(MENSAJES.MAYUSCULA);
  });

  test("rechaza null", () => {
    // Arrange
    const password = null; //null
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.TIPO);

  });

  test("rechaza undefined", () => {
    // Arrange
    const password = undefined; //undefined
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.TIPO);

  });

  test("rechaza un número", () => {
    // Arrange
    const password = "1"; //literalmente un numero
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.LONGITUD);

  });
});

describe("validarPassword - caracteres del español", () => {

  test("acepta una contraseña con ñ", () => {
   // Arrange
   const password = 'Nuñez12345';
   // Act
   const resultado = validarPassword(password);
   // Assert
   expect(resultado).toEqual({ valida: true, errores: [] });

  });

  test("acepta una contraseña con acentos", () => {
    // Arrange
    const password = 'áéíóúALO12345';
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado).toEqual({ valida: true, errores: [] });

  });
});

/*
|
| CASOS EXTRA PARA PRACTICAR (OPCIONALES)
| 
*/

describe("validarPassword - casos extra (opcional)", () => {
  test("acepta una contraseña cuya única mayúscula es acentuada (Á, Ñ)"), () => {
    // Arrange
    const password = 'NuÑez12345';
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado).toEqual({ valida: true, errores: [] });
  };

  test("rechaza una contraseña con un tab o salto de línea"), () => {
    // Arrange
    const password = 'Nuñez1 / 2345';
    // Act
    const resultado = validarPassword(password);
    // Assert
    expect(resultado).toEqual({ valida: false, errores: [] });
  };
});

/* ─────────────────────────────────────────────────────────────────────
   DESAFÍO OPCIONAL
   Reescribí los casos de longitud usando `test.each` con una tabla.
   Fijate cómo la tabla del código queda casi igual a la del documento.
   ───────────────────────────────────────────────────────────────────── */