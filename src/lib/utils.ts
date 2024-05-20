import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios, { AxiosInstance } from 'axios';
import { ACCESS_TOKEN_KEY } from "@/Auth/AuthProvider";

const TOKEN = localStorage.getItem(ACCESS_TOKEN_KEY) || "";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const URL = process.env.REACT_APP_API_URL

class Http {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
}

class HttpGuard {
    instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                "authorization": `bearer ${TOKEN}`
            },
        })
    }
}

const http = new Http().instance
const httpGuard = new HttpGuard().instance

export { http, httpGuard }