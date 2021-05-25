import React from 'react';

export const WeatherForm = (props) => (
  <div className="card card-body">
    <form onSubmit={props.getWeather}>
      <div className="form-group">
        <input
          type="text"
          name="city"
          placeholder="Ingresa una Ciudad"
          className="form-control"
          autoFocus
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="country"
          placeholder="Nombre o codigo de Pais. Ej: uk Reino Unido, AR Argentina"
          className="form-control"
        />
      </div>
      <button className="btn btn-success btn-block">
        Ver datos del tiempo
      </button>
      <div className="form-group">
       Informacion extraida de la API de Open Weather <br />
        https://openweathermap.org/api
      </div>
    </form>
    
  </div>
);
