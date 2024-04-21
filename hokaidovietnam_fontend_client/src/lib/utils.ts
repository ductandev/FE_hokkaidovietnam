import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios, { AxiosInstance } from 'axios';

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

const http = new Http().instance

export default http