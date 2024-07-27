import { AxiosError, AxiosResponse } from 'axios';

export const handleResponse = <T>(
    resolve: (value: T) => void) => (response: AxiosResponse<T>) =>
        resolve(response.data);

export const handleError = (reject: (reason: Error | AxiosError) => void) =>
    (error: AxiosError) =>
        reject(error);