import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-netflix-de0a4-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;