 import { Link } from "wouter";

export default function Header(){
    return(
        <div className="wouter">
            <Link className="opcion" href="/"><h1>iniciar sesionn</h1></Link>
            <Link className="opcion" href="/"><h1>Perfil</h1></Link>
        </div>
    )
}