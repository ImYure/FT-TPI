
import "./App.css";
import { Router, Route, Switch } from "wouter";

import Header from "./componentes/Header";
import Navb from "./componentes/Navb";
import Footer from "./componentes/Footer";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navb />

        <main className="contenido">
          <Switch>
            <Route path="/inventario">
              <h1>inventario</h1>
            </Route>
            <Route path="/pvp">
              <h1>pvp(no andara)</h1>
            </Route>
            <Route path="/inicio">
              <h1>Inicio</h1>
            </Route>
            <Route path="/tienda">
              <h1>Tienda</h1>
            </Route>
            <Route path="/perfil">
              <h1>perfil</h1>
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
