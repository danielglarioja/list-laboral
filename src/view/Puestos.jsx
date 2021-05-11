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

export default class MiApp extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      modalInsertar: false,
      form: {
        Puesto: "",
        Empresa: "",
        Ciudad: "",
        Pais: "",
      },
      paises: [],
      paisesSelected:'',
      ciudades: [],
      ciudadesSelected:'',
      empresas: [],
      empresasSelected:'',
    };
  }

  componentDidMount() {
    if (localStorage.getItem("data") != null) {
      this.setState({
        data: JSON.parse(localStorage.getItem("data")),
      });
    }
    if (localStorage.getItem("dataPais") != null) {
      this.setState({
        paises: JSON.parse(localStorage.getItem("dataPais")),
      });
    }
    if (localStorage.getItem("dataCiudad") != null) {
      this.setState({
        ciudades: JSON.parse(localStorage.getItem("dataCiudad")),
      });
    }
    if (localStorage.getItem("dataEmpresa") != null) {
      this.setState({
        empresas: JSON.parse(localStorage.getItem("dataEmpresa")),
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
      "Por favor, Confirma que deseas Eliminar este puesto => " + dato.Puesto
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
    var ingresoPuesto = document.querySelector("#agregarPuesto").value;
    var ingresoEmpresa = document.querySelector("#agregarEmpresa").value;
    var ingresoCiudad = document.querySelector("#agregarCiudad").value;
    var ingresoPais = document.querySelector("#agregarPais").value;
    if (
      ingresoPuesto &&
      ingresoEmpresa &&
      ingresoCiudad &&
      ingresoPais !== null
    ) {
      var valorNuevo = { ...this.state.form };
      var lista = this.state.data;
      console.log(lista)
      lista.push(valorNuevo);
      valorNuevo.Pais = this.state.paisesSelected;
      valorNuevo.Ciudad = this.state.ciudadesSelected;
      valorNuevo.Empresa = this.state.empresasSelected;
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

  handleChangePais = (e) =>{
    const pais = e.target.value;
    this.setState({paisesSelected: pais})
  }
  handleChangeCiudad = (e) =>{
    const ciudad = e.target.value;
    this.setState({ciudadesSelected: ciudad})
  }
  handleChangeEmpresa = (e) =>{
    const empresa = e.target.value;
    this.setState({empresasSelected: empresa})
  }

  saveData = () => {
    window.localStorage.setItem("data", JSON.stringify(this.state.data));
  };

  render() {
    return (
      <>
        <Container>
          <h1>PAGINA PRINCIPAL</h1>
          <h4>PUESTOS DE TRABAJO</h4>
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
                <th>Puesto</th>
                <th>Empresa</th>
                <th>Ciudad</th>
                <th>Pais</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato}>
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
                id="agregarPuesto"
                className="form-control"
                name="Puesto"
                type="text"
                placeholder="Agregar un nuevo puesto"
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
                onChange={this.handleChangeEmpresa}
              >
                <option >Seleccionar Empresa</option>
                {this.state.empresas.map((empresa, index) => (
                  <option
                    key={index + 1}
                    value={empresa.Empresa}
                  >
                    {empresa.Empresa}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <label>Ciudad:</label>
              <select
                id="agregarCiudad"
                className="form-control"
                name="Ciudad"
                type="text"
                onChange={this.handleChangeCiudad}
              >
                <option>Seleccionar Ciudad</option>
                {this.state.ciudades.map((ciudad, index) => (
                  <option
                    key={index + 1}
                    value={ciudad.Ciudad}
                  >
                    {ciudad.Ciudad}
                  </option>
                ))}
              </select>
            </FormGroup>

            <FormGroup>
              <label>Pais:</label>
              <select
                id="agregarPais"
                className="form-control"
                name="Pais"
                type="text"
                onChange={this.handleChangePais}
              >
                <option>Seleccionar Pais</option>
                {this.state.paises.map((pais, index) => (
                  <option
                    key={index + 1}
                    value={pais.Pais}
                  >
                    {pais.Pais}
                  </option>
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
