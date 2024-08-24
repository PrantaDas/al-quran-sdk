import { AxiosError, AxiosResponse } from 'axios';

/**
 * Handles the response from an Axios request.
 *
 * @template T - The type of the response data.
 * @param resolve - The function to call to resolve the promise with the response data.
 * @returns A function that takes an Axios response and resolves the promise with the response data.
 */
export const handleResponse = <T>(
    resolve: (value: T) => void) => (response: AxiosResponse<T>) =>
        resolve(response.data);


/**
 * Handles an error from an Axios request.
 *
 * @param reject - The function to call to reject the promise with the error.
 * @returns A function that takes an Axios error and rejects the promise with the error.
 */
export const handleError = (reject: (reason: Error | AxiosError) => void) =>
    (error: AxiosError) =>
        reject(error);