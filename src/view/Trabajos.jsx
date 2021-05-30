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
  apiDataTrabajos,
  apiDataEmpresas,
  postApiDataTrabajos,
} from "../apis/apiPrueba";

export class Trabajo extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      position: "",
      description: "",
      organizationId: "",
      data: [],
      trabajosFromAPI: [],
      empresasFromAPI: [],
      modalInsertar: false,
    };
  }

  componentDidMount() {
    apiDataEmpresas().then((res) =>
      this.setState({
        empresasFromAPI: res,
      })
    );
    apiDataTrabajos().then((res) =>
      this.setState({
        trabajosFromAPI: res,
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
      "Por favor, Confirma que deseas Eliminar este trabajo ? "
    );
    if (opcion === true) {
      await axios.delete(
        "https://api-fake-pilar-tecno.herokuapp.com/jobs/" + id
      );
      window.location.reload(true);
    }
  };

  insertar = () => {
    postApiDataTrabajos(
      this.state.position,
      this.state.description,
      this.state.organizationId
    ).then((newTrabajo) =>
      this.setState({
        trabajosFromAPI: [...this.state.trabajosFromAPI, newTrabajo],
        modalInsertar: false,
      })
    );
  };

  handleChange = (event) => {
    this.setState({ position: event.target.value });
  };
  handleChange1 = (event) => {
    this.setState({ description: event.target.value });
  };
  handleChange2 = (event) => {
    this.setState({ organizationId: event.target.value });
  };

  render() {
    return (
      <>
        <Container>
          <h1>TRABAJOS</h1>
          <h4>AGREGAR / ELIMINAR / GUARDAR en la API</h4>
          <hr></hr>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Insertar nuevo Trabajo
          </Button>
          <br />
          <Table>
            <thead>
              <tr>
                <th>id</th>
                <th>Trabajo</th>
                <th>Descripcion</th>
                <th>Empresa</th>
              </tr>
            </thead>
            <tbody>
              {this.state.trabajosFromAPI.map((dato) => (
                <tr key={dato}>
                  <td>{dato.id}</td>
                  <td>{dato.position}</td>
                  <td>{dato.description}</td>
                  <td>{dato.organizationId}</td>
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
              <label>Trabajo:</label>
              <input
                id="agregarTrabajo"
                className="form-control"
                name="position"
                type="text"
                placeholder="Ingrese un Trabajo"
                required
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Descripcion:</label>
              <input
                id="agregarDescripcionTrabajo"
                className="form-control"
                name="Description"
                type="text"
                placeholder="Ingrese una descripcion del Trabajo"
                onChange={this.handleChange1}
              />
            </FormGroup>
            <FormGroup>
              <label>Empresa:</label>
              <select
                id="agregarEmpresa"
                className="form-control"
                name="Empresa"
                organizationId="organizationId"
                type="text"
                onChange={this.handleChange2}
              >
                <option>Seleccionar Empresa</option>
                {this.state.empresasFromAPI.map((empresa, index) => (
                  <option value={empresa.id}>{empresa.name}</option>
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
