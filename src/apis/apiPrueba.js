import axios from 'axios'

export const apiDataPaises = async () => {
    try{
        const res = await axios.get(
          "https://api-fake-pilar-tecno.herokuapp.com/countries"
        );
        return res.data
    }catch(err){
        console.error(err);
    }
};
export const apiDataCiudades = async () => {
  try {
    const res = await axios.get(
      "https://api-fake-pilar-tecno.herokuapp.com/places"
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
export const apiDataEmpresas = async () => {
  try {
    const res = await axios.get(
      "https://api-fake-pilar-tecno.herokuapp.com/organizations"
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
export const apiDataTrabajos = async () => {
  try {
    const res = await axios.get(
      "https://api-fake-pilar-tecno.herokuapp.com/jobs"
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};


export const postApiDataPaises = async () => {
  const configRequest = {
    metod: "post",
    url: "https://api-fake-pilar-tecno.herokuapp.com/countries",
    data: {
      id: "",
      name: ""    
    },
  };
    try {
    const res = await axios(configRequest);
    return res.data
  } catch (err) {
    console.error(err);
  }
};

/*console.log(axios
              .post("https://jsonplaceholder.typicode.com/todos",
                  {
                    title:'daniel',
                    body:'Cualquiera',
                    userId: '1',
                    */