import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://test.shopkart.club/'
    baseURL: 'http://localhost:5000/'
});

export default instance;