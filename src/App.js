import React from "react";
import "./logo.svg";
import "./App.css";
import MiApp from './view/Puestos.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Pais } from "./view/Paises";
import { Ciudad } from "./view/Ciudades";
import { Empresa } from "./view/Empresas";
import { Navbar } from "./nav/NavBar";
import { NotFoundView } from "./view/notFounView";
import {TiempoActual} from "./view/Tiempo";
import {Trabajo} from "./view/Trabajos";

function App() {
      return (
        <Router>
          <h2>ACTIVIDAD FINAL</h2>
          <Navbar />
          <Switch>
            <Route path="/" exact component={MiApp}></Route>
            <Route path="/Trabajos" exact component={Trabajo}></Route>
            <Route path="/Paises" exact component={Pais}></Route>
            <Route path="/Ciudades" exact component={Ciudad}></Route>
            <Route path="/Empresas" exact component={Empresa}></Route>
            <Route path="/Tiempo" exact component={TiempoActual}></Route>
            <Route component={NotFoundView}></Route>
          </Switch>
        </Router>
      );
  
}

export default App;
