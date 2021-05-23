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
import { apiDataEmpresas } from "../apis/apiPrueba";

export class Empresa extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      empresasFromAPI: [],
      modalInsertar: false,
      form: {
        Empresa: "",
      },
    };
  }

  componentDidMount() {
    /*if (localStorage.getItem("dataEmpresa") != null) {
      this.setState({
        data: JSON.parse(localStorage.getItem("dataEmpresa")),
      });
    }*/
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

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Por favor, Confirma que deseas Eliminar este puesto => " + dato.Empresa
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

  saveData = () => {
    window.localStorage.setItem("dataEmpresa", JSON.stringify(this.state.data));
  };

  render() {
    return (
      <>
        <Container>
          <h1>EMPRESAS</h1>
          <h4>AGREGAR / ELIMINAR / GUARDAR</h4>
          <hr></hr>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Insertar nuevo Puesto
          </Button>
          <Button color="primary" onClick={this.saveData}>
            Guardar
          </Button>
          <br />
          <Table>
            <thead>
              <tr>
                <th>Empresa</th>
              </tr>
            </thead>
            <tbody>
              {this.state.empresasFromAPI.map((dato) => (
                <tr key={dato}>
                  <td>{dato.empresa}</td>
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
              <label>Empresa:</label>
              <input
                id="agregarEmpresa"
                className="form-control"
                name="Empresa"
                type="text"
                placeholder="Nombre de la Empresa"
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
