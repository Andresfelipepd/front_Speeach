import axios from 'axios';
import router from '../router/index'
import { getToken, isAuthenticated, logout } from '../components/utilitys/auth';
import { BACKEND } from './constans';

export const api1 = axios.create({
    baseURL: BACKEND,
    headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

api1.interceptors.request.use(function(req){
    if(!isAuthenticated()){
        logout();
        router.push('/');
    }
    else{
        req.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return req
})

api1.interceptors.response.use(res => {
    return res;
}, err => {
    if(err.response){
        const { status } = err.response;
        if(status === 401 || status === 422){
            logout();
        }
    } else {
        err.response = {
            data: "Error de conexión con el servidor"
        }
    }
    return Promise.reject(err)
})
