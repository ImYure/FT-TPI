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
  test("acepta una contraseña de 20 caracteres",() => {
    //arrange
    const contraseña = "Qwertyuiopasdfghjkl1"

    //act
    const resultado = validarPassword(contraseña)

    //assert
    expect(resultado).toEqual({ valida: true, errores:[] })

  })


  test("rechaza una contraseña de 7 caracteres", () => {
    //arrange
    const contraseña = "Abcdef1"

    //act
    const resultado = validarPassword(contraseña)

    //assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.LONGITUD);
  })

  test("rechaza una contraseña de 21 caracteres", () => {
  //arrange
    const contraseña = "Qwertyuiopasdfghjklñ2"

    //act
    const resultado = validarPassword(contraseña)

    //assert
    expect(resultado.valida).toBe(false);
expect(resultado.errores).toContain(MENSAJES.LONGITUD);
  })
});




describe("validarPassword - reglas de contenido", () => {
  test("rechaza una contraseña sin números", () =>{
      //arrange
    const contraseña = "Awertyuiopasdfghjklñ"

    //act
    const resultado = validarPassword(contraseña)

    //assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.NUMERO);
  })

  test("rechaza una contraseña con un espacio al principio", () => {
         //arrange
    const contraseña = " 1Awertyuiopasdfghjklñ"

    //act
    const resultado = validarPassword(contraseña)

    //assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.ESPACIOS);
  })

  test("rechaza una contraseña con un espacio en el medio", () =>{
      //arrange
    const contraseña = " Awertyuiop1 asdfghjklñ"

    //act
    const resultado = validarPassword(contraseña)

    //assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.ESPACIOS);
  })

  test("rechaza una contraseña con un espacio al final", () => {
      //arrange
    const contraseña = " Awertyuiopasdfghjklñ1 "

    //act
    const resultado = validarPassword(contraseña)

    //assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.ESPACIOS);
  })
});



describe("validarPassword - acumulación de errores", () => {
  test("devuelve 2 errores si faltan mayúscula y número", () =>{
       //arrange
    const contraseña = "awertyuiopasdfghjklñ"

    //act
    const resultado = validarPassword(contraseña)

    //assert
    expect(resultado.valida).toBe(false);
  expect(resultado.errores).toHaveLength(2);
  expect(resultado.errores).toContain(MENSAJES.MAYUSCULA);
  expect(resultado.errores).toContain(MENSAJES.NUMERO);

  })


  test("devuelve 4 errores si viola todas las reglas", () =>{
       //arrange
    const contraseña = " awert "

    //act
    const resultado = validarPassword(contraseña)

    //assert
  expect(resultado.valida).toBe(false);
  expect(resultado.errores).toHaveLength(4);
  expect(resultado.errores).toContain(MENSAJES.LONGITUD);
  expect(resultado.errores).toContain(MENSAJES.MAYUSCULA);
  expect(resultado.errores).toContain(MENSAJES.NUMERO);
  expect(resultado.errores).toContain(MENSAJES.ESPACIOS);
  })
});




describe("validarPassword - entradas inesperadas", () => {
  test("rechaza una cadena vacía sin lanzar excepción", () =>{

        //arrange
    const contraseña =""

    //act
    const resultado = validarPassword(contraseña)

    //assert
  expect(resultado.valida).toBe(false);
  expect(resultado.errores).toContain(MENSAJES.LONGITUD);
  expect(resultado.errores).toContain(MENSAJES.MAYUSCULA);
  expect(resultado.errores).toContain(MENSAJES.NUMERO);
  })


  test("rechaza null sin lanzar excepción",() => {
      //arrange
    const contraseña =null

    //act
    const resultado = validarPassword(contraseña)

    //assert
  expect(resultado.valida).toBe(false);
 expect(resultado.errores).toContain(MENSAJES.TIPO)
  })



  test("rechaza undefined sin lanzar excepción", () => {

       //arrange
    const contraseña =undefined

    //act
    const resultado = validarPassword(contraseña)

    //assert
  expect(resultado.valida).toBe(false);
 expect(resultado.errores).toContain(MENSAJES.TIPO)

  })



  test("rechaza un número sin lanzar excepción", () => {

    
       //arrange
    const contraseña =123456789

    //act
    const resultado = validarPassword(contraseña)

    //assert
  expect(resultado.valida).toBe(false);
 expect(resultado.errores).toContain(MENSAJES.TIPO)

  })
});




describe("validarPassword - caracteres del español", () => {
  test("acepta una contraseña con ñ", () => {
       //arrange
    const contraseña = "Capitanñuloricoosi1"

    //act
    const resultado = validarPassword(contraseña)

    //assert
expect(resultado).toEqual({ valida: true, errores: [] });

  })

  test.todo("acepta una contraseña con acentos", () => {

    //arrange
    const contraseña = "Capitanñuloricós11"

    //act
    const resultado = validarPassword(contraseña)

    //assert
  expect(resultado).toEqual({ valida: true, errores: [] });


  })
});


describe("validarPassword - casos extra (opcional)", () => {
  test("acepta una contraseña cuya única mayúscula es acentuada (Á, Ñ)", () => {
        //arrange
    const contraseña =  "Águeronicolas011"

    //act
    const resultado = validarPassword(contraseña)

    //assert
expect(resultado).toEqual({ valida: true, errores: [] });

  })

  test("rechaza una contraseña con un tab o salto de línea", () => {
          //arrange

    const contraseña =  "Águer\t011"

    //act
    const resultado = validarPassword(contraseña)

    //assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.ESPACIOS);
  });
});

/* ─────────────────────────────────────────────────────────────────────
   DESAFÍO OPCIONAL
   Reescribí los casos de longitud usando `test.each` con una tabla.
   Fijate cómo la tabla del código queda casi igual a la del documento.
   ───────────────────────────────────────────────────────────────────── */
