import axios from "axios"

export const BaseURL = 'https://www.correos.gob.sv:8000/api/v1/rastrear-paquete/'

export const correosService = axios.create({
    baseURL: BaseURL,
})