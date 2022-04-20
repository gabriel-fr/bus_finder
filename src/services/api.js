import axios from "axios";

const api = axios.create({
  baseURL: "https://dadosabertos.poa.br/api/3/action",
});

export default api;