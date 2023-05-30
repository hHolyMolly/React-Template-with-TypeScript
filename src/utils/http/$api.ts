import axios, { AxiosInstance } from 'axios';

const BASE_URL: string = '/';
const timeout: number = 1; // second

const $api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * timeout,
});

export default $api;
