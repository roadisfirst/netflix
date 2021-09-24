import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.tvmaze.com/api'
});

export default instance;