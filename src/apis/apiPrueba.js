import axios from 'axios'

export const apiDataPaises = async () => {
    try{
        const res = await axios.get(
          "https://my-json-server.typicode.com/danielglarioja/fake-api-paises/paisesApi"
        );
        return res.data
    }catch(err){
        console.error(err);
    }
};
export const apiDataCiudades = async () => {
  try {
    const res = await axios.get(
      "https://my-json-server.typicode.com/danielglarioja/fake-api-paises/ciudadesApi"
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
export const apiDataEmpresas = async () => {
  try {
    const res = await axios.get(
      "https://my-json-server.typicode.com/danielglarioja/fake-api-paises/empresasApi"
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
export const apiDataPuestos = async () => {
  try {
    const res = await axios.get(
      "https://my-json-server.typicode.com/danielglarioja/fake-api-paises/puestosApi"
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};


/*export const postApiDataPaises = async () => {
  const configRequest = {
    metod: "post",
    url: "https://my-json-server.typicode.com/danielglarioja/fake-api-paises/paisesApi",
    data: {
      pais: ""    
    },
  };
    try {
    const res = await axios(configRequest);
    return res.data
  } catch (err) {
    console.error(err);
  }
};*/

/*console.log(axios
              .post("https://jsonplaceholder.typicode.com/todos",
                  {
                    title:'daniel',
                    body:'Cualquiera',
                    userId: '1',
                    */