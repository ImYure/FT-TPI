import "./App.css";
import { Router, Route, Switch } from "wouter";
import Header from "./componentes/Header";
import Navb from "./componentes/Navb";
import Footer from "./componentes/Footer";

import Inicio from "./vistas/Inicio";
import Tienda from "./vistas/Tienda";
import Pvp from "./vistas/Pvp";
import Perfil from "./vistas/Perfil";
import Inventario from "./vistas/inventario";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navb />

        <main className="contenido">
          <Switch>

            <Route path="/inventario">
              <Inventario />
            </Route>

            <Route path="/pvp">
              <Pvp />
            </Route>

            <Route path="/">
              <Inicio />
            </Route>

            <Route path="/inicio">
              <Inicio />
            </Route>

            <Route path="/tienda">
              <Tienda />
            </Route>
            
            <Route path="/perfil">
              <Perfil />
            </Route>

            <Route>
              <div className="Error404">
                <h1>404</h1>
                <h2>Página no encontrada</h2>
                <p>
                  Lo sentimos, la página que intentás visitar
                  no existe o fue movida.
                </p>
              </div>
            </Route>
          </Switch>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
