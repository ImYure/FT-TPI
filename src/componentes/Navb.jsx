 import { Link } from "wouter";

export default function Navb(){
    return(
        <div className="wouter">
            <Link className="opcion" href="/"><h1>Inventario</h1></Link>
            <Link className="opcion" href="/"><h1>pvp(no andara)</h1></Link>
            <Link className="opcion" href="/"><h1>inicio</h1></Link>
            <Link className="opcion" href="/"><h1>Tienda</h1></Link>
            <Link className="opcion" href="/"><h1>Perfil</h1></Link>
        </div>
    )
}