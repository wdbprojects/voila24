import axios from "axios";
const productionURL = "https://strapi-store-server.onrender.com/api";

const customFetch = axios.create({
  baseURL: productionURL,
});

export { customFetch };
