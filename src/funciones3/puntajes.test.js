import { describe, test, expect } from "vitest";
import {
  calcularPuntaje,
  medalla,
  bonusPorTiempo,
  podio,
  formatearTiempo,
  validarNombre,
  ERRORES,
} from "./puntajes.js";

/* ═══════════════════════════════════════════════════════════════════
   PRÁCTICA - El ranking de un videojuego

   Son seis ejercicios y un desafío, de más a menos ayuda:
     EJERCICIO 1         te damos los casos          → escribís los tests
     EJERCICIO 2         te damos casi todos         → los dos últimos los pensás vos
     EJERCICIO 3         la función tiene un error   → lo encontrás con un test
     EJERCICIOS 4, 5, 6  no te damos ningún caso     → los elegís vos
     DESAFÍO FINAL       queda un error más          → y no te decimos dónde

   Lo que tiene que hacer cada función está en el comentario que tiene
   arriba, en `puntajes.js`. Leé el comentario, no el código.

   Al final del archivo hay una verificación y seis preguntas.
   ═══════════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────────────
// EJERCICIO 1
// El primer test está resuelto: usalo de modelo.
// Reemplazá cada `test.todo` por un test de verdad.
// ─────────────────────────────────────────────────────────────────────
describe("calcularPuntaje", () => {
  test("suma 10 puntos por cada acierto cuando no hay errores", () => {
    // Arrange
    const aciertos = 3;
    const errores = 0;

    // Act
    const resultado = calcularPuntaje(aciertos, errores);

    // Assert
    expect(resultado).toBe(30);
  });

  test("resta 5 puntos por cada error", () => {
      // Arrange
    const aciertos = 0;
    const errores = 5;

    // Act
    const resultado = calcularPuntaje(aciertos, errores);

    // Assert
    expect(resultado).toBe(0);
  })

  test("devuelve 0 cuando no hay aciertos ni errores", () => {
        // Arrange
    const aciertos = 0;
    const errores = 0;

    // Act
    const resultado = calcularPuntaje(aciertos, errores);

    // Assert
    expect(resultado).toBe(0);
  });
  test("devuelve 0 cuando los errores restan justo lo mismo que suman los aciertos", () => {
    // Arrange
    const aciertos = 0;
    const errores = 30;

    // Act
    const resultado = calcularPuntaje(aciertos, errores);

    // Assert
    expect(resultado).toBe(0);

  });


  test("devuelve 0, y no un número negativo, cuando los errores restan más de lo que suman los aciertos" , () => {

 // Arrange
    const aciertos = 2;
    const errores = 5;

    // Act
    const resultado = calcularPuntaje(aciertos, errores);

    // Assert
    expect(resultado).toBe(0);
  });
});

// ─────────────────────────────────────────────────────────────────────
// EJERCICIO 2
// Mirá bien QUÉ puntajes se eligieron: no son cualquiera.
// Hay un caso "del medio" de cada medalla, y después los puntajes
// donde la medalla CAMBIA: el último de una y el primero de la siguiente.
// ─────────────────────────────────────────────────────────────────────
describe("medalla", () => {
  test("devuelve 'bronce' con un puntaje de 250", () => {
    expect(medalla(250)).toBe("bronce");
  });

  test("devuelve 'sin medalla' con un puntaje de 50", () => {


 const puntaje = 50

    const resultado = medalla(puntaje)

    expect(resultado).toBe("sin medalla")


  });
  test("devuelve 'plata' con un puntaje de 700", () =>{

    const puntaje = 700

    const resultado = medalla(puntaje)

    expect(resultado).toBe("plata")

  });
  
  test("devuelve 'oro' con un puntaje de 3000", () => {

    const puntaje = 3000

    const resultado = medalla(puntaje)

    expect(resultado).toBe("oro")
  });

  test("devuelve 'sin medalla' con 99 puntos (le falta uno para bronce)", () => {
    const puntaje = 99

    const resultado = medalla(puntaje)

    expect(resultado).toBe("sin medalla")

  });

  test("devuelve 'bronce' con exactamente 100 puntos", () => {
  
    const puntaje = 100

    const resultado= medalla(puntaje)

    expect(resultado).toBe("bronce")

  });

  test("devuelve 'bronce' con 499 puntos (le falta uno para plata)", () => {

    const puntaje = 499

    const resultado = medalla(puntaje)

    expect(resultado).toBe("bronce")

  });

  test("devuelve 'plata' con exactamente 500 puntos", () =>{

    const puntaje = 500

    const resultado = medalla(puntaje)

    expect(resultado).toBe("plata")

  })


  test("devuelve 'plata' cuando  con 999 puntos (le falta uno para oro)" , () => {

    const puntaje = 999

    const resultado = medalla(puntaje)

    expect(resultado).toBe("plata")  
})


test("devuelve 'oro' cuando  con 1000 puntos", () => {

    const puntaje = 1000

    const resultado = medalla(puntaje)

    expect(resultado).toBe("oro")  
})
  });
// ─────────────────────────────────────────────────────────────────────
// EJERCICIO 3 - Cazar el error
// La función `bonusPorTiempo` tiene UN error: en algún caso no hace lo
// que dice su comentario. No te decimos en cuál.
//
//   1. Escribí los tests que te parezcan necesarios (al menos 4 más).
//      Elegí los valores como en el ejercicio 2.
//   2. Si están todos en verde, todavía no lo encontraste: te falta un caso.
//   3. Cuando uno se ponga en ROJO, antes de tocar nada preguntate:
//      ¿está mal mi test o está mal el código?
//      El que manda es el comentario de la función.
//   4. Recién ahí arreglá `puntajes.js` y mirá cómo el test pasa a verde.
// ─────────────────────────────────────────────────────────────────────
describe("bonusPorTiempo", () => {
  test("da 500 puntos de bonus si el nivel se termina en 30 segundos", () => {
    expect(bonusPorTiempo(30)).toBe(500);
  });

  test("da 200 puntos de bonus si el nivel se termina en 61 segundos", () => {

    const segundos= 61

    const resultado = bonusPorTiempo(segundos)

    expect(resultado).toBe(200)
  })
  

 test("da 200 puntos de bonus si el nivel se termina en 80 segundos", () => {

    const segundos= 80

    const resultado = bonusPorTiempo(segundos)

    expect(resultado).toBe(200)
  })


 test("da 500 puntos de bonus si el nivel se termina en 40 segundos", () => {

    const segundos= 40

    const resultado = bonusPorTiempo(segundos)

    expect(resultado).toBe(500)
  })


  test("da 0 puntos de bonus si el nivel se termina en 140 segundos", () => {

    const segundos= 140

    const resultado = bonusPorTiempo(segundos)

    expect(resultado).toBe(0)
  })

});

// ─────────────────────────────────────────────────────────────────────
// EJERCICIO 4
// Acá el Arrange ya no es un número suelto: hay que armar la lista.
// Y como la función devuelve un array, se compara con `toEqual`.
//
// Escribí al menos 4 tests más. Preguntas para elegir los casos:
//   - ¿Y si hay exactamente 3 jugadores?
//   - ¿Y si hay menos de 3?
//   - ¿Y si la lista está vacía?
//   - ¿Y si el que más puntos tiene está último en la lista?
//   - ¿Y si...? (uno que se te ocurra a vos)
// ─────────────────────────────────────────────────────────────────────
describe("podio", () => {
  test("devuelve los nombres de los 3 jugadores con más puntos, de mayor a menor", () => {
    // Arrange
    const jugadores = [
      { nombre: "Ana", puntos: 300 },
      { nombre: "Beto", puntos: 900 },
      { nombre: "Caro", puntos: 500 },
      { nombre: "Dani", puntos: 100 },
    ];

    // Act
    const resultado = podio(jugadores);

    // Assert
    expect(resultado).toEqual(["Beto", "Caro", "Ana"]);
  });

   test("devuelve los nombres de los 3 jugadores con más puntos, de mayor a menor", () => {
      // Arrange
    const jugadores = [
      { nombre: "Caro", puntos: 500 },
      { nombre: "Beto", puntos: 900 },
       { nombre: "Dani", puntos: 100 },
    ];

    // Act
    const resultado = podio(jugadores);

    // Assert
    expect(resultado).toEqual(["Beto", "Caro", "Dani"]);
   })

   test("devuelve el nombre de 1 solo jugador con mas puntos de mayor a menor", () =>{

    const jugadores = [
    { nombre:  "Caro",  puntos:  500},
    ]
    
    const resultado = podio(jugadores)

    expect(resultado).toEqual(["Caro"]);
   })


   test("devuelve un array vacio si no hay jugadores",() => {

    const jugadores = []

    const resultado = podio(jugadores)

    expect(resultado).toEqual([]);
   })

   test("devuelve el podio correcto si el jugador con mas puntos esta ultimo en la lista", () => {

    const jugadores = [
      {nombre: "Dani", puntos: 100},
      {nombre: "Ana", puntos: 300},
       { nombre: "Caro", puntos: 500 },
      {nombre: "Beto", puntos: 900}, 
    ]

    const resultado = podio(jugadores)

    expect(resultado).toEqual(["Beto", "Caro", "Ana"])
   })

   test("devuelve a los mejores 2 jugadores con mas puntos", () => {

    const jugadores = [
      {nombre: "Beto", puntos: 900},
       {nombre: "Caro", puntos: 500},
    ]

    const resultado = podio(jugadores)

    expect(resultado).toEqual(["Beto", "Caro"]);
   })


});



// ─────────────────────────────────────────────────────────────────────
// EJERCICIO 5
// Escribí al menos 5 tests más. Preguntas para elegir los casos:
//   - ¿Y con 0 segundos?
//   - ¿Y con menos de un minuto?
//   - ¿Y con un minuto justo?
//   - ¿Y cuando sobran menos de 10 segundos?
//   - ¿Y con más de 10 minutos?
// ─────────────────────────────────────────────────────────────────────
describe("formatearTiempo", () => {
  test("devuelve '1:15' cuando pasaron 75 segundos", () => {
    expect(formatearTiempo(75)).toBe("1:15");
  });


test("devuelve '0:00' cuando pasaron 0 segundos", () => {

  const horas = 0 

  const resultado = formatearTiempo(horas)

  expect(resultado).toBe("0:00")
})

test("devuelve '0:20' cuando pasaron 20 segundos", () => {

  const horas = 20 

  const resultado = formatearTiempo(horas)

  expect(resultado).toBe("0:20")
})

test("devuelve '1:00' cuando pasaron 60 segundos", () => {

  const horas = 60 

  const resultado = formatearTiempo(horas)

  expect(resultado).toBe("1:00")
})


test("devuelve '1:05' cuando sobran menos de 10 segundos (65 segundos)", () => {

  const horas = 65 

  const resultado = formatearTiempo(horas)

  expect(resultado).toBe("1:05")
})

test("devuelve '10:50' cuando pasan más de 10 minutos (650 segundos)", () => {
   
  const horas = 650

  const resultado = formatearTiempo(horas)

  expect(resultado).toBe("10:50")
  });

});

// ─────────────────────────────────────────────────────────────────────
// EJERCICIO 6
// Esta función devuelve un objeto, igual que `validarPassword`.
//
// Escribí al menos 6 tests más. Para elegir los casos:
//   - La longitud tiene DOS extremos. ¿Qué nombres probás en cada uno?
//   - Cada regla por separado: un nombre que rompa ESA regla y cumpla
//     las otras dos. Si rompe dos a la vez, no sabés cuál lo rechazó.
//   - ¿Y uno que rompa dos reglas? ¿Cuántos errores tiene que devolver?
//   - ¿Y el nombre vacío?
// ─────────────────────────────────────────────────────────────────────
describe("validarNombre", () => {
  test("acepta un nombre de 6 caracteres que empieza con letra y no tiene espacios", () => {
    // Arrange
    const nombre = "Rayo99";

    // Act
    const resultado = validarNombre(nombre);

    // Assert
    expect(resultado).toEqual({ valido: true, errores: [] });
  });

  test("rechaza un nombre con un espacio en el medio", () => {
    const resultado = validarNombre("Rayo 99");

    expect(resultado.valido).toBe(false);
    expect(resultado.errores).toContain(ERRORES.ESPACIOS);
  });

  test("acepta un nombre de 3 caracteres" , () => {

    const nombre = "ABC"

    const resultado = validarNombre(nombre)

    expect(resultado).toEqual({valido : true, errores: []});
  })

 test("acepta un nombre de 12 caracteres y con mayuscula" , () => {

    const nombre = "leonkennedya"

    const resultado = validarNombre(nombre)

    expect(resultado).toEqual({valido : true, errores: []});
  })


   test("devuelve dos errores", () => {

    const nombre = "A "; 

    // Act
    const resultado = validarNombre(nombre);

    // Assert
    expect(resultado).toEqual({valido: false, errores: [ERRORES.LONGITUD, ERRORES.ESPACIOS]})
  })

  
   test("rechaza nombres vacios", () => {

    const nombre = ""; 

    
    const resultado = validarNombre(nombre);

  expect(resultado).toEqual({valido: false,   errores: [ERRORES.LONGITUD, ERRORES.INICIAL]})
  })
});

/* ═══════════════════════════════════════════════════════════════════
   DESAFÍO FINAL - el segundo error

   En alguna de las funciones de los ejercicios 4, 5 y 6 hay escondido
   UN error más. Esta vez no te decimos en cuál.

   Si tenés todo en verde, todavía no lo encontraste: a alguno de esos
   tres ejercicios le falta un caso. Volvé y agregalo.

   Ojo: un error es cuando la función hace algo DISTINTO de lo que dice
   su comentario. Si el comentario no dice qué pasa en un caso, eso no
   es un error: es una pregunta para anotar (ver la pregunta 6).

   Cuando lo encuentres, lo mismo que en el ejercicio 3: primero el
   test en rojo, después el arreglo en `puntajes.js`.

   ───────────────────────────────────────────────────────────────────
   PREGUNTAS - respondé acá mismo, dentro de este comentario

   1. Ejercicio 3: ¿con qué valor de `segundos` encontraste el error?  ______
      ¿Qué devolvía la función?  ______   ¿Qué tenía que devolver?  ______

   2. ¿Qué cambiaste en `puntajes.js` para arreglarlo?
      _______________________________________________________

   3. Antes de encontrarlo, ¿cuántos tests de `bonusPorTiempo` tenías en
      verde?  ______
      Estaban en verde y el error estaba igual. ¿Por qué no lo detectaban?
      _______________________________________________________

   4. Desafío final: ¿en qué función estaba el segundo error?  ____________
      ¿Con qué entrada lo encontraste?  ____________
      ¿Qué tiene en común esa entrada con la de la pregunta 1?
      _______________________________________________________

   5. Verificación: ¿cuántos tests se pusieron en rojo?  ______
      ¿Cuál o cuáles?
      _______________________________________________________

   6. Ejercicio 4: si dos jugadores tienen los mismos puntos, ¿cuál de los
      dos va primero en el podio? ¿Lo dice el comentario de la función?
      _______________________________________________________
   ═══════════════════════════════════════════════════════════════════ */
