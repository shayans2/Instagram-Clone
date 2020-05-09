import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

export function loginWithJwt(jwt) {
  Cookies.set("token", jwt, { expires: 1 });
}

export function logout() {
  Cookies.remove("token");
}

export function getJwt() {
  return Cookies.get("token");
}

export function getCurrentUser() {
  try {
    const jwt = Cookies.get("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
