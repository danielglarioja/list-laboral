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
          <h3>HOME</h3>
        </Link>
        <Link to="/Paises">
          <h3>Paises</h3>
        </Link>
        <Link to="/Ciudades">
          <h3>Ciudades</h3>
        </Link>
        <Link to="/Empresas">
          <h3>Empresas</h3>
        </Link>
      </nav>
    );
  }
}
