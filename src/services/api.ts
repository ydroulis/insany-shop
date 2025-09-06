import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.insany.co/api",
    headers: {
        "Content-Type": "application/json",
    },
});