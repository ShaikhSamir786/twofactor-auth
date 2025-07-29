import axios from 'axios';

export const api = axios.create({
  baseURL: `/api`, // Use proxy path instead of full URL
  withCredentials: true, // Always send cookies with requests
});