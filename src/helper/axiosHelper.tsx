import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../config';

export const get = async (endpoint: string): Promise<AxiosResponse> => {
    return await axios.get(`${BASE_URL}/${endpoint}`, { withCredentials: true });
}

export const post = async (endpoint: string, payload: object): Promise<AxiosResponse> => {
    return await axios.post(`${BASE_URL}/${endpoint}`, payload, { withCredentials: true });
}

export const patch = async (endpoint: string, payload: object): Promise<AxiosResponse> => {
    return await axios.patch(`${BASE_URL}/${endpoint}`, payload, { withCredentials: true });
}
