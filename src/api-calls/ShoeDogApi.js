import axios from "axios";

const BASE_API = "http://localhost:8083/";

export const login = (email, password) => axios.post(`${BASE_API}user/login`, {
    "email": email,
    "role": "USER",
    "password": password
});

export const register = (email, password) => axios.post(`${BASE_API}user./register`, {
    "email": email,
    "role": "USER",
    "password": password
});
export const getBrands = () => axios.get(`${BASE_API}brands`);

export const getProducts = (id) => axios.get(`${BASE_API}products`, {params: { brandId: id }});