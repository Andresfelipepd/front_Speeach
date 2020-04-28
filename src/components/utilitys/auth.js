import router from '../../router/index';
import VueJwtDecode from 'vue-jwt-decode';

const AUTH_TOKEN_KEY = "AUTH_TOKEN";

export const getName = function(){
    const token = getToken();
    if(token){
        const decoded = VueJwtDecode.decode(token);
        return decoded.identity;
    }
    else{
        return 'UNKNOW'
    }
}

export const setToken = function(token){
    localStorage.setItem(AUTH_TOKEN_KEY,token);
}

export const getToken = function(){
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

export const logout = function(){
    localStorage.removeItem(AUTH_TOKEN_KEY);
    router.push('/login')
}

export const isAuthenticated = function(){
    const token = getToken();
    if(token){
        const decoded = VueJwtDecode.decode(token);
        const Name = getName();
        if(new Date() >= new Date(decoded.exp * 1000)){
            return false;
        }
        if (Name && decoded.identity == Name){
            return true;
        }else{
            logout();
            return false;
        }
    }
    return false;   
}