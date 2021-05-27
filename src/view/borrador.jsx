//CODIGO AGREGA PAIS SOLO HARKCODEADO
//*********
import React from "react";
/*import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import {apiDataPaises} from "../apis/apiPrueba";
import {postApiDataPaises} from "../apis/apiPrueba"*/
import axios from "axios";

export class Pais extends React.Component {
  state = {
    name: "",
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    /*axios.post(`https://api-fake-pilar-tecno.herokuapp.com/countries`, { countries })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });*/

    /*axios.post('https://api-fake-pilar-tecno.herokuapp.com/countries', {  "name": ""})*/

    axios({
      method: "post",
      url: "https://api-fake-pilar-tecno.herokuapp.com/countries",
      data: {
        name: "",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
