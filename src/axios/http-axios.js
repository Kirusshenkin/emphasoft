import axios from 'axios'
import {store} from '../hoc/Store/Store'

axios.interceptors.request.use(function (config) {
    const token = store.getState().session.token;
    config.headers.Authorization =  token;

    return config;
});

let instance = axios.create({
    baseURL: 'http://emphasoft-test-assignment.herokuapp.com/',
})
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Token ${token}` : '';
    return config;
})

export default instance