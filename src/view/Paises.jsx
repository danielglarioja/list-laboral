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


export class Pais extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      modalInsertar: false,
      form: {
        Pais: "",
      },
    };
  }

  componentDidMount() {
    if (localStorage.getItem("dataPais") != null) {
      this.setState({
        data: JSON.parse(localStorage.getItem("dataPais")),
      });
    }
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
      "Por favor, Confirma que deseas Eliminar este puesto => " + dato.Pais
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
    var ingresoPais = document.querySelector("#agregarPais").value;
    if (ingresoPais !== "") {
      var valorNuevo = { ...this.state.form };
      var lista = this.state.data;
      lista.push(valorNuevo);
      this.setState({ modalInsertar: false, data: lista });
    } else {
      alert("Debes ingresar un Pais");
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
                <th>Pais</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato}>
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
              <label>Pais:</label>
              <input
                id="agregarPais"
                className="form-control"
                name="Pais"
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
