import axios from "axios";

const BASE_API = "http://localhost:8083/";


// Create instance
let instance = axios.create();

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? {token} : '';
    return config;
});

export const login = (email, password) => axios.post(`${BASE_API}user/login`, {
    "email": email,
    "password": password
});

export const register = (email, password) => axios.post(`${BASE_API}user/register`, {
    "email": email,
    "role": "USER",
    "password": password
});

export const addReview = (review, email) => axios.post(`${BASE_API}review/addReview`, JSON.stringify(review),
    { headers: { "Content-Type": "application/json; charset=UTF-8" },
        params: { email: email }
    });
export const getBrands = () => axios.get(`${BASE_API}review/brands`);

export const getProducts = (id) => axios.get(`${BASE_API}review/products`, {params: { brandId: id }});