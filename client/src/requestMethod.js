import axios from "axios";

const BASE_URL = "http://localhost:6500/api/";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
  .currentUser.token;

export const publicRequest = axios.create({
  baseUrl: BASE_URL,
});

export const userRequest = axios.create({
  baseUrl: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
