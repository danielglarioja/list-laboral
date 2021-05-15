import React from "react";
import "./logo.svg";
import "./App.css";
import MiApp from './view/Puestos.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Pais } from "./view/Paises";
import { Ciudad } from "./view/Ciudades";
import { Empresa } from "./view/Empresas";
import { Navbar } from "./componentes/NavBar";
import { NotFoundView } from "./view/notFounView";

function App() {
      return (
      <Router>
        <h2>ACTIVIDAD 2</h2>
        <Navbar></Navbar>
        <Switch> 
          <Route path="/" exact component= {MiApp}></Route>
          <Route path="/Paises" exact component= {Pais}></Route>
          <Route path="/Ciudades" exact component= {Ciudad}></Route>
          <Route path="/Empresas" exact component= {Empresa}></Route>
          <Route component={NotFoundView}></Route>
        </Switch> 
      </Router>
    );
  
}

export default App;
