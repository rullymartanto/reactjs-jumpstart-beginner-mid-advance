import {
    authHeader,
    config,
    handleResponse,
    handleError
} from '../_helpers/default';
import axios from 'axios' 
// let token = localStorage.getItem('token');
// axios.defaults.headers.common['Authorization'] =token;

export const userService = {
    RegisterUser,
    User,
    login,
    logout,
    UserGrid,
};

function RegisterUser(user) {
    return axios({
        method:'POST',
        // headers: authHeader(),
        data: user,
        url:config.apiUrl + '/api/auth/register',
      }).then(handleResponse, handleError)
}

function login(email, password) {
    return axios({ 
        method: 'post',
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // },
        url: config.apiUrl + '/api/auth/login',
        data: { email, password }
      })
      .then(handleResponse, handleError)
      .then(res => {
        if (res.data) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', res.data.token);
        }

        return res;
    });
}


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
}

function User(id) {
    return axios({
        method:'get',
        headers: authHeader(),
        url:config.apiUrl + '/api/users/'+ id,
      }).then(handleResponse, handleError)
}

function UserGrid(data) {
    return axios({
        method:'get',
        headers: authHeader(),
        url:config.apiUrl + '/api/users',
      }).then(handleResponse, handleError)
}




