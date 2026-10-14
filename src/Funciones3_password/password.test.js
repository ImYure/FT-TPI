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
  test.todo("acepta una contraseña de 20 caracteres");
  test.todo("rechaza una contraseña de 7 caracteres");
  test.todo("rechaza una contraseña de 21 caracteres");
});

describe("validarPassword - reglas de contenido", () => {
  test.todo("rechaza una contraseña sin números");
  test.todo("rechaza una contraseña con un espacio al principio");
  test.todo("rechaza una contraseña con un espacio en el medio");
  test.todo("rechaza una contraseña con un espacio al final");
});

describe("validarPassword - acumulación de errores", () => {
  test.todo("devuelve 2 errores si faltan mayúscula y número");
  test.todo("devuelve 4 errores si viola todas las reglas");
});

describe("validarPassword - entradas inesperadas", () => {
  test.todo("rechaza una cadena vacía sin lanzar excepción");
  test.todo("rechaza null sin lanzar excepción");
  test.todo("rechaza undefined sin lanzar excepción");
  test.todo("rechaza un número sin lanzar excepción");
});

describe("validarPassword - caracteres del español", () => {
  test.todo("acepta una contraseña con ñ");
  test.todo("acepta una contraseña con acentos");
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
