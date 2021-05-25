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
import { apiDataTrabajos, apiDataEmpresas } from "../apis/apiPrueba";

export class Trabajo extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      trabajosFromAPI: [],
      empresasFromAPI: [],
      modalInsertar: false,
      form: {
        id: "",
        Trabajo: "",
        Descripcion: "",
        Empresa: "",
      },
    };
  }

  componentDidMount() {
    /*if (localStorage.getItem("dataCiudad") != null) {
      this.setState({
        data: JSON.parse(localStorage.getItem("dataCiudad")),
      });
    }*/
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

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Por favor, Confirma que deseas Eliminar este trabajo => " + dato.position
    );
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      // eslint-disable-next-line array-callback-return
      arreglo.map((registro) => {
        if (dato === registro) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var ingresoEmpresa = document.querySelector("#agregarEmpresa").value;
    if (ingresoEmpresa !== "") {
      var valorNuevo = { ...this.state.form };
      var lista = this.state.data;
      lista.push(valorNuevo);
      this.setState({ modalInsertar: false, data: lista });
    } else {
      alert("Debes ingresar un trabajo");
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

  saveData = () => {
    window.localStorage.setItem("dataTrabajo", JSON.stringify(this.state.data));
  };

  render() {
    return (
      <>
        <Container>
          <h1>TRABAJOS</h1>
          <h4>AGREGAR / ELIMINAR / GUARDAR</h4>
          <hr></hr>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Insertar nuevo Trabajo
          </Button>
          <Button color="primary" onClick={this.saveData}>
            Guardar
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
              <label>id:</label>
              <input
                id="agregarId"
                className="form-control"
                name="id"
                type="text"
                placeholder="Ingresar un id"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Trabajo:</label>
              <input
                id="agregarTrabajo"
                className="form-control"
                name="Trabajo"
                type="text"
                placeholder="Ingrese un Trabajo"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Descripcion:</label>
              <input
                id="agregarDescripcionTrabajo"
                className="form-control"
                name="Descripcion"
                type="text"
                placeholder="Ingrese una descripcion del Trabajo"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Empresa:</label>
              <select
                id="agregarEmpresa"
                className="form-control"
                name="Empresa"
                type="text"
                onChange={this.handleChange}
              >
                <option>Seleccionar Empresa</option>
                {this.state.empresasFromAPI.map((empresa, index) => (
                  <option value={empresa.name}>{empresa.name}</option>
                ))}
              </select>
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
