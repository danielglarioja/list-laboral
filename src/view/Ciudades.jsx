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
import {apiDataCiudades, apiDataPaises} from "../apis/apiPrueba";

export class Ciudad extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      ciudadesFromAPI: [],
      paisesFromAPI: [],
      modalInsertar: false,
      form: {
        id: "",
        Ciudad: "",
        Pais: ""
      },
    };
  }

  componentDidMount() {
    /*if (localStorage.getItem("dataCiudad") != null) {
      this.setState({
        data: JSON.parse(localStorage.getItem("dataCiudad")),
      });
    }*/
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

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Por favor, Confirma que deseas Eliminar esta Ciudad => " + dato.Ciudad
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
    var ingresoCiudad = document.querySelector("#agregarCiudad").value;
    if (ingresoCiudad !== "") {
      var valorNuevo = { ...this.state.form };
      var lista = this.state.data;
      lista.push(valorNuevo);
      this.setState({ modalInsertar: false, data: lista });
    } else {
      alert("Debes ingresar una Ciudad");
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
    window.localStorage.setItem("dataCiudad", JSON.stringify(this.state.data));
  };

  render() {
    return (
      <>
        <Container>
          <h1>CIUDADES</h1>
          <h4>AGREGAR / ELIMINAR / GUARDAR</h4>
          <hr></hr>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Insertar nueva Ciudad
          </Button>
          <Button color="primary" onClick={this.saveData}>
            Guardar
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
              <label>Ciudad:</label>
              <input
                id="agregarCiudad"
                className="form-control"
                name="Ciudad"
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
                type="text"
                onChange={this.handleChange}
              >
                <option>Seleccionar Pais</option>
                {this.state.paisesFromAPI.map((pais, index) => (
                  <option value={pais.name}>{pais.name}</option>
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
