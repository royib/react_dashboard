import axios from "axios";

const instance = axios.create({
  //baseURL: "https://crk6g.sse.codesandbox.io/"
  baseURL: "https://interview-json-server.herokuapp.com/"
});

export default instance;
