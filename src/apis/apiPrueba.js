import axios from "axios";

export const apiDataPaises = async () => {
  try {
    const res = await axios.get(
      "https://api-fake-pilar-tecno.herokuapp.com/countries"
    );
    return res.data;
  } catch (err) {
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
//POST
export const postApiDataPaises = async (paisName) => {
  const config = {
    method: "post",
    url: "https://api-fake-pilar-tecno.herokuapp.com/countries",
    data: {
      name: paisName,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios(config);
  return response.data;
};

export const postApiDataCiudades = async (ciudadName, paisId) => {
  const config = {
    method: "post",
    url: "https://api-fake-pilar-tecno.herokuapp.com/places",
    data: {
      name: ciudadName,
      countrieId: paisId,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios(config);
  return response.data;
};

export const postApiDataEmpresas = async (empresaName, ciudadId) => {
  const config = {
    method: "post",
    url: "https://api-fake-pilar-tecno.herokuapp.com/organizations",
    data: {
      name: empresaName,
      placeId: ciudadId,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios(config);
  return response.data;
};

export const postApiDataTrabajos = async (
  trabajoName,
  descripcionJobs,
  empresaId
) => {
  const config = {
    method: "post",
    url: "https://api-fake-pilar-tecno.herokuapp.com/jobs",
    data: {
      position: trabajoName,
      description: descripcionJobs,
      organizationId: empresaId,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios(config);
  return response.data;
};
