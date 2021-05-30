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
import axios from "axios";
import {
  apiDataCiudades,
  apiDataPaises,
  postApiDataCiudades,
} from "../apis/apiPrueba";

export class Ciudad extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      countrieId: "",
      data: [],
      ciudadesFromAPI: [],
      paisesFromAPI: [],
      modalInsertar: false,
    };
  }

  componentDidMount() {
    apiDataCiudades().then((res) =>
      this.setState({
        ciudadesFromAPI: res,
      })
    );
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
      "Por favor, Confirma que deseas Eliminar esta Ciudad ? "
    );
    if (opcion === true) {
      await axios.delete(
        "https://api-fake-pilar-tecno.herokuapp.com/places/" + id
      );
      window.location.reload(true);
    }
  };

  insertar = () => {
    postApiDataCiudades(this.state.name, this.state.countrieId).then(
      (newCiudad) =>
        this.setState({
          ciudadesFromAPI: [...this.state.ciudadesFromAPI, newCiudad],
          modalInsertar: false,
        })
    );
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleChange1 = (event) => {
    this.setState({ countrieId: event.target.value });
  };

  render() {
    return (
      <>
        <Container>
          <h1>CIUDADES</h1>
          <h4>AGREGAR / ELIMINAR / GUARDAR en la API</h4>
          <hr></hr>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Insertar nueva Ciudad
          </Button>
          <br />
          <Table>
            <thead>
              <tr>
                <th>id</th>
                <th>Ciudad</th>
                <th>Pais</th>
              </tr>
            </thead>
            <tbody>
              {this.state.ciudadesFromAPI.map((dato) => (
                <tr key={dato}>
                  <td>{dato.id}</td>
                  <td>{dato.name}</td>
                  <td>{dato.countrieId}</td>
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
              <label>Ciudad:</label>
              <input
                id="agregarCiudad"
                className="form-control"
                name="name"
                type="text"
                placeholder="En que ciudad?"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Pais:</label>
              <select
                id="agregarPais"
                className="form-control"
                name="Pais"
                countrieId="countrieId"
                type="text"
                onChange={this.handleChange1}
              >
                <option>Seleccionar Pais</option>
                {this.state.paisesFromAPI.map((pais, index) => (
                  <option value={pais.id}>{pais.name}</option>
                ))}
              </select>
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
