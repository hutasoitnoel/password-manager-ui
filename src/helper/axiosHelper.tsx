import axios, { AxiosResponse } from 'axios';
import { BASE_URL, OCR_SERVICE_BASE_URL } from '../config';
import _ from 'lodash';

export const get = async (endpoint: string, query?: object): Promise<AxiosResponse> => {
    let url = `${BASE_URL}/${endpoint}`

    if (!_.isEmpty(query)) {
        url += '?'
        for (const [key, value] of Object.entries(query)) {
            url += `${key}=${value}&`
        }
    }

    return await axios.get(url, { withCredentials: true });
}

export const post = async (endpoint: string, payload: object): Promise<AxiosResponse> => {
    return await axios.post(`${BASE_URL}/${endpoint}`, payload, { withCredentials: true });
}

export const patch = async (endpoint: string, payload: object): Promise<AxiosResponse> => {
    return await axios.patch(`${BASE_URL}/${endpoint}`, payload, { withCredentials: true });
}

export const axiosDelete = async (endpoint: string): Promise<AxiosResponse> => {
    return await axios.delete(`${BASE_URL}/${endpoint}`, { withCredentials: true });
}

export const performOCR = async (payload: object): Promise<AxiosResponse> => {
    return await axios.post(`${OCR_SERVICE_BASE_URL}/upload`, payload, { withCredentials: true });
}