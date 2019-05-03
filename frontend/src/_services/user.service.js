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
    User,
    login,
    logout,
    UpdatePassword,
    UserByRole,
    UserGrid,
    AddUser,
    UpdateUser,
    getUserImage,
};

function UpdateUser(user) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
    };

    return fetch(config.apiUrl + '/api/User/Update', requestOptions)
        .then(handleResponse, handleError)
}

function AddUser(user) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
    };

    return fetch(config.apiUrl + '/api/User/Register/', requestOptions)
        .then(handleResponse, handleError)
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

function UpdatePassword(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(config.apiUrl + '/api/User/UpdatePassword/', requestOptions)
        .then(handleResponse, handleError)
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


function UserByRole(data) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/User/' + data, requestOptions)
        .then(handleResponse, handleError)
}

function getUserImage(id, type) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/UserImage/' + id + '/' + type, requestOptions)
        .then(handleResponse, handleError)
        .then(function (response) {
            return response;
        });
}

// function DeleteUser(username) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeaderContent()
//     };

//     return fetch(config.apiUrl + '/api/User/Remove/', requestOptions)
//         .then(handleResponse, handleError)
// }


