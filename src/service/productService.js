import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/products`;

export const findProducts = () => {
    return axios.get(API);
}

export const updateProduct = (id, updatedProduct) => {
    return axios.put(`${API}/${id}`, updatedProduct);
}

export const deleteProduct = id => {
    return axios.delete(`${API}/${id}`);
}

export const createProduct = product => {
    return axios.post(API, product);
}