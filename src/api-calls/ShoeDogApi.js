import axios from "axios";
import {useSelector} from "react-redux";

const BASE_API = "http://localhost:8083/";



export const login = (email, password) => axios.post(`${BASE_API}user/login`, {
    "email": email,
    "password": password
});

export const register = (email, password, firstName, lastName) => axios.post(`${BASE_API}user/register`, {
    "email": email,
    "role": "USER",
    "password": password,
    "firstName": firstName,
    "lastName": lastName
});

export const updateUser = (email, firstName, lastName, about, token) => axios.post(`${BASE_API}user/update`, {
    "email": email,
    "firstName": firstName,
    "lastName": lastName,
    "about": about
},
    { headers: {
        "Authorization": token}});

export const addReview = (review, email, token) => axios.post(`${BASE_API}review/addReview`, JSON.stringify(review),
    { headers: { "Content-Type": "application/json; charset=UTF-8",
        "Authorization": token},
        params: { email: email }
    });

export const addProduct = (product, role, token) => axios.post(`${BASE_API}review/addModel`, JSON.stringify(product),
    { headers: { "Content-Type": "application/json; charset=UTF-8",
            "Authorization": token},
        params: { role: role }
    });
export const approveProduct = (id, token) => axios.post(`${BASE_API}admin/approveProduct`, {
    params: { id: id },
    headers: {
        "Authorization": token
    }
});
export const deleteReview = (reviewId, token) => axios.delete(`${BASE_API}admin/deleteReview`, {
    params: { reviewId: reviewId },
    headers: {
        "Authorization": token
    }
});

export const deleteProduct = (id, token) => axios.delete(`${BASE_API}admin/deleteProduct`, {
    params: { id: id },
    headers: {
        "Authorization": token
    }
});
export const getBrands = (token) => axios.get(`${BASE_API}review/brands`, { headers: {
        "Authorization": token}});

export const getProducts = (id, token) => axios.get(`${BASE_API}review/products`, {params: { brandId: id }, headers: {
    "Authorization": token}});

export const getRequests = (token) => axios.get(`${BASE_API}admin/requests`, { headers: {
        "Authorization": token}});

export const getUserDetails = (email, token) => axios.get(`${BASE_API}user/details`, {params: { email: email }, headers: {
        "Authorization": token}});

export const getReviews = () => axios.get(`${BASE_API}review/all`, );

export const getUserReviews = (email, token) => axios.get(`${BASE_API}review/myReviews`, {params: { email: email }, headers: {
        "Authorization": token}});