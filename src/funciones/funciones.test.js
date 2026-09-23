import { saludar, sumar,sumar2 } from "./funciones";
import { EsmayorDeEdad } from './funciones.js'
import {describe, test, it, expect} from "vitest"

describe("sumar", ()=>{

 test("devuelve 8 cuando suma 5 y 3", ()=>{
        const a = 5
        const b = 3

        const resultado = sumar(a,b)
        
        expect(resultado).toBe(8);
    })

    test("devuelve 0 cuando se suman dos 0", ()=>{
        const c = 0
        const d = 0

        const resultado = sumar2(c,d)
        
        expect(resultado).toBe(0);
    })

     test("devuelve true cuando la edad es 20", ()=>{
        const edad = 20

        const resultado = EsmayorDeEdad(edad)
        
        expect(resultado).toBe(true);
    })


     test("devuelve false cuando la edad es 17", ()=>{
        const edad = 17

        const resultado = EsmayorDeEdad(edad)
        
        expect(resultado).toBe(false);
    })


     test("devuelve hola,ana cuando el nombre es ana", ()=>{
        const nombre = "ana"

        const resu = saludar(nombre)
        
        expect(resu).toBe("hola, ana!");
    })
})