import axios, { AxiosResponse } from 'axios';
const REACT_APP_SERVER_URL = 'http://13.251.40.215/api';

const increaseCounterUrl = `${REACT_APP_SERVER_URL}/increaseCounter`;
const getCounterUrl = `${REACT_APP_SERVER_URL}/getCounter`;
const getAbelminerVersionUrl = `${REACT_APP_SERVER_URL}/getAbelminerVersion`;

// Function to fetch the counter value
export async function getCounter(): Promise<number> {
    return axios.get<{ counter: number }>(getCounterUrl)
        .then((response: AxiosResponse<{ counter: number }>) => {
            console.log('Response:', response.data);
            return response.data.counter; // Return the counter value
        })
        .catch((error: unknown) => {
            console.error('Error:', error);
            throw error;
        });
}

// Function to upadate the counter value
export async function updateCounter(): Promise<{ message: string }> {
    return axios.post<{ message: string }>(increaseCounterUrl)
        .then((response: AxiosResponse<{ message: string }>) => {
            console.log('Response:', response.data);
            return response.data; // Return the entire response object
        })
        .catch((error: unknown) => {
            console.error('Error:', error);
            throw error;
        });
}

// Function to get Abelminer Version
export async function getAbelminerVersion(): Promise<{ version: string }> {
    return axios.get<{ version: string }>(getAbelminerVersionUrl)
        .then((response: AxiosResponse<{ version: string }>) => {
            console.log('Response:', response.data.version);
            return response.data; // Return the entire response object
        })
        .catch((error: unknown) => {
            console.error('Error:', error);
            throw error;
        });
}