import React from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  {
    id: 1,
    Puesto: "Mern Stack",
    Empresa: "Telefonica",
    Ciudad: "Madrid",
    Pais: "España",
  },
  {
    id: 2,
    Puesto: "Sr Development Frontend",
    Empresa: "Mercado Libre",
    Ciudad: "Buenos Aires",
    Pais: "Argentina",
  },
  {
    id: 3,
    Puesto: "Full Stack developer",
    Empresa: "Google",
    Ciudad: "California",
    Pais: "Estados Unidos",
  },
];

class App extends React.Component {
  state = {
    data: data,
    modalInsertar: false,
    form: {
      id: "",
      Puesto: "",
      Empresa: "",
      Ciudad: "",
      Pais: "",
    },
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Estás Seguro que deseas Eliminar este puesto " + dato.Puesto
    );
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var ingresodatos = document.querySelector("#agregarnuevo").value;
    var ingresodatos2 = document.querySelector("#agregarnuevo2").value;
    var ingresodatos3 = document.querySelector("#agregarnuevo3").value;
    var ingresodatos4 = document.querySelector("#agregarnuevo4").value;
    if (ingresodatos && ingresodatos2 && ingresodatos3 && ingresodatos4 != "") {
      var valorNuevo = { ...this.state.form };
      valorNuevo.id = this.state.data.length + 1;
      var lista = this.state.data;
      lista.push(valorNuevo);
      this.setState({ modalInsertar: false, data: lista });
    } else {
      alert("Debes completar todos los campos");
    }
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <>
        <Container>
          <h1>Trabajo de Daniel</h1>
          <hr></hr>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Insertar nuevo Puesto
          </Button>
          <br />
          <Table>
            <thead>
              <tr>
                <th>Puesto</th>
                <th>Empresa</th>
                <th>Ciudad</th>
                <th>Pais</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.Puesto}</td>
                  <td>{dato.Empresa}</td>
                  <td>{dato.Ciudad}</td>
                  <td>{dato.Pais}</td>
                  <td>
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalBody>
            <FormGroup>
              <label>Puesto:</label>
              <input
                id="agregarnuevo"
                className="form-control"
                name="Puesto"
                type="text"
                placeholder="Agrega el nuevo puesto"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Empresa:</label>
              <input
                id="agregarnuevo2"
                className="form-control"
                name="Empresa"
                type="text"
                placeholder="Nombre de la Empresa"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Ciudad:</label>
              <input
                id="agregarnuevo3"
                className="form-control"
                name="Ciudad"
                type="text"
                placeholder="En que ciudad?"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Pais:</label>
              <input
                id="agregarnuevo4"
                className="form-control"
                name="Pais"
                type="text"
                placeholder="En que Pais?"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
