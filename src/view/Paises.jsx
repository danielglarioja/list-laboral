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
import { apiDataPaises, postApiDataPaises } from "../apis/apiPrueba";
import axios from "axios";

export class Pais extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      data: [],
      paisesFromAPI: [],
      modalInsertar: false,
    };
  }

  componentDidMount() {
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

  eliminar = async (id) => {
    var opcion = window.confirm(
      "Por favor, Confirma que deseas Eliminar este pais ? "
    );
    if (opcion === true) {
      await axios.delete(
        "https://api-fake-pilar-tecno.herokuapp.com/countries/" + id
      );
      window.location.reload(true);
    }
  };

  insertar = () => {
    postApiDataPaises(this.state.name).then((newCountry) =>
      this.setState({
        paisesFromAPI: [...this.state.paisesFromAPI, newCountry],
        modalInsertar: false,
      })
    );
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <>
        <Container>
          <h1> PAISES</h1>
          <h4>AGREGAR / ELIMINAR / GUARDAR en la API</h4>
          <hr></hr>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Insertar nuevo Pais
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
                    <Button
                      color="danger"
                      onClick={() => this.eliminar(dato.id)}
                    >
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
                id="id"
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
              Enviar a la API
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
