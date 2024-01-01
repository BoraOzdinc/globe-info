import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://restfulcountries.com/api/v1/countries/',
    headers: { "Authorization": "Bearer 478|OXVbGWmXuGs1DdSvxB7d4J7o4On7sCMdqIEsb6Nq" }
});

export const fetcher = (url: string) => api.get(url).then((res) => res.data);