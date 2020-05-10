import axios from "axios";
import authService from "./authService";

export default axios.create({
  baseURL: "http://localhost:4000/api",
  headers: { "x-auth-token": authService.getJwt() },
});
