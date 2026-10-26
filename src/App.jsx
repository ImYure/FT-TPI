import "./App.css";
import { Router, Route, Switch } from 'wouter';
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./componentes/Header";
import Navb from "./componentes/Navb";

export default function App() {

  return (
    <div className="App">

      <Router>
        <Switch>

        </Switch>
        <Route>
          <div className="Error404">
            <h1>404</h1>

            <h2>Página no encontrada</h2>

            <p>
              Lo sentimos, la página que intentás visitar no existe o fue movida.
            </p>

            <p>
              Utilizá el menú superior para volver al inicio o navegar hacia otra sección.
            </p>
          </div>
        </Route>
      </Router>
    </div>
  );
}