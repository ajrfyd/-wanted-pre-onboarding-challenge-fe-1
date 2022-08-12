import axios from "axios";

const BASE_URL = 'http://localhost:8080';

const baseReqApi = axios.create({
  baseURL: BASE_URL,
});

export default baseReqApi;