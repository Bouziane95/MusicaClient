import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api",
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getAllBands(endpoint) {
    return service.get(endpoint);
  },

  getOneBand(id) {
    return service.get("/bands/"+id);
  },

  getUserBands(endpoint) {
    // return service
    //   .get("/:id/bands")
    //   .then((res) => res.data)
    //   .catch(errorHandler);
    return service.get(endpoint);
  },

  createBand(data){
    return service.post ("/bands", data);
  },

  updateBand(endpoint, data) {
    console.log(endpoint)
    return service.patch(endpoint, data);
  },

  deleteBand(endpoint) {
    return service.delete(endpoint);
  },

  getAllUsers(endpoint) {
    return service.get(endpoint);
  },

  getOneUser(id) {
    return service.get("/users/" + id);
  },

  createUser(endpoint, data) {
    return service.post(endpoint, data);
  },

  updateUser(endpoint, data) {
    return service.patch(endpoint, data);
  },

  deleteUser(endpoint, data) {
    return service.delete(endpoint, data);
  },
}