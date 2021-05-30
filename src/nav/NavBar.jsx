import React from "react";
import { Link } from "react-router-dom";

export class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <nav class="navbar navbar-dark bg-dark">
        <Link to="/">
          <h3>PRINCIPAL</h3>
        </Link>
        <Link to="/Trabajos">
          <h6>Ver/Agregar</h6>
          <h3>Trabajos</h3>
        </Link>
        <Link to="/Paises">
          <h6>Ver/Agregar</h6>
          <h3>Paises</h3>
        </Link>
        <Link to="/Ciudades">
          <h6>Ver/Agregar</h6>
          <h3>Ciudades</h3>
        </Link>
        <Link to="/Empresas">
          <h6>Ver/Agregar</h6>
          <h3>Empresas</h3>
        </Link>
        <Link to="/Tiempo">
          <h6>Consultar</h6>
          <h3>Tiempo</h3>
        </Link>
      </nav>
    );
  }
}
