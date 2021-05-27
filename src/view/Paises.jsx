import React from "react";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { apiDataPaises } from "../apis/apiPrueba";
//import {postApiDataPaises} from "../apis/apiPrueba";
import axios from "axios";

export class Pais extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "Alemania",
      data: [],
      paisesFromAPI: [],
      modalInsertar: false,
      form: {
        Pais: "",
      },
    };
  }
  /*updateStateFromAPI = (datos) =>{
    this.setState({
      paisesFromAPI: datos
    })
  }*/

  componentDidMount() {
    /*if (localStorage.getItem("dataPais") != null) {
      this.setState({
        data: JSON.parse(localStorage.getItem("dataPais")),
      });
    }*/
    /* apiData().then(res => this.setState({
      paisesFromAPI: res
    }))*/

    apiDataPaises().then((res) =>
      this.setState({
        paisesFromAPI: res,
      })
    );
  }

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  eliminar = (dato) => {
    axios({
      method: "delete",
      url: "https://api-fake-pilar-tecno.herokuapp.com/countries/4",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  //este original
  /*insertar = () => {
    var ingresoPais = document.querySelector("#agregarPais").value;
    if (ingresoPais !== "") {
      var valorNuevo = { ...this.state.form };
      var lista = this.state.data;
      lista.push(valorNuevo);
      this.setState({ modalInsertar: false, data: lista });
    } else {
      alert("Debes ingresar un Pais");
    }
  };*/
  //este abajo emanuel
  insertar = () => {
    axios({
      method: "post",
      url: "https://api-fake-pilar-tecno.herokuapp.com/countries",
      data: {
        name: "OtroNuncaJamas",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  /*handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };*/
  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  saveData = () => {
    window.localStorage.setItem("dataPais", JSON.stringify(this.state.data));
  };

  render() {
    return (
      <>
        <Container>
          <h1> PAISES</h1>
          <h4>AGREGAR / ELIMINAR / GUARDAR</h4>
          <hr></hr>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Insertar nuevo Pais
          </Button>
          <Button color="primary" onClick={this.saveData}>
            Guardar
          </Button>
          <br />
          <Table>
            <thead>
              <tr>
                <th>id</th>
                <th>Pais</th>
              </tr>
            </thead>
            <tbody>
              {this.state.paisesFromAPI.map((dato) => (
                <tr key={dato}>
                  <td>{dato.id}</td>
                  <td>{dato.name}</td>
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
              <label>Pais:</label>
              <input
                id="agregarPais"
                className="form-control"
                name="name"
                type="text"
                placeholder="Ingresar un Pais"
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
