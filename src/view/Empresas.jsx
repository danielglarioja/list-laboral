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
  apiDataEmpresas,
  postApiDataEmpresas,
} from "../apis/apiPrueba";

export class Empresa extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      placeId: "",
      data: [],
      ciudadesFromAPI: [],
      empresasFromAPI: [],
      modalInsertar: false,
    };
  }

  componentDidMount() {
    apiDataCiudades().then((res) =>
      this.setState({
        ciudadesFromAPI: res,
      })
    );
    apiDataEmpresas().then((res) =>
      this.setState({
        empresasFromAPI: res,
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
      "Por favor, Confirma que deseas Eliminar esta Empresa ? "
    );
    if (opcion === true) {
      await axios.delete(
        "https://api-fake-pilar-tecno.herokuapp.com/organizations/" + id
      );
      window.location.reload(true);
    }
  };

  insertar = () => {
    postApiDataEmpresas(this.state.name, this.state.placeId).then(
      (newEmpresa) =>
        this.setState({
          empresasFromAPI: [...this.state.empresasFromAPI, newEmpresa],
          modalInsertar: false,
        })
    );
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleChange1 = (event) => {
    this.setState({ placeId: event.target.value });
  };

  render() {
    return (
      <>
        <Container>
          <h1>EMPRESAS</h1>
          <h4>AGREGAR / ELIMINAR / GUARDAR en la API</h4>
          <hr></hr>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Insertar nueva Empresa
          </Button>
          <br />
          <Table>
            <thead>
              <tr>
                <th>id</th>
                <th>Empresa</th>
                <th>Ciudad</th>
              </tr>
            </thead>
            <tbody>
              {this.state.empresasFromAPI.map((dato) => (
                <tr key={dato}>
                  <td>{dato.id}</td>
                  <td>{dato.name}</td>
                  <td>{dato.placeId}</td>
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
              <label>Empresa:</label>
              <input
                id="agregarEmpresa"
                className="form-control"
                name="name"
                type="text"
                placeholder="Nombre de la Empresa"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Ciudad:</label>
              <select
                id="agregarCiudad"
                className="form-control"
                name="Ciudad"
                placeId="placeId"
                type="text"
                onChange={this.handleChange1}
              >
                <option>Seleccionar Ciudad</option>
                {this.state.ciudadesFromAPI.map((ciudad, index) => (
                  <option value={ciudad.id}>{ciudad.name}</option>
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
