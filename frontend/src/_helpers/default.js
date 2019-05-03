
export const config = {
    apiUrl: 'http://localhost:3100',
    webUrl: '/',
};


// export function authHeader() {
//     let token = JSON.parse(localStorage.getItem('token'));

//     if (token) {
//         return { 'Authorization': 'Basic ' + btoa(config.apiKey + ":" + token),'Content-Type': 'application/json'  };
//     } else {
//         return {};
//     }
// }

export function authHeader() {
    let token = localStorage.getItem('token');

    if (token) {
        return { 'Authorization': 'Bearer ' + token,'Content-Type': 'application/json'  };
    } else {
        return {};
    }
}


export function NewGuid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

export function numberWithCommas(x) {
    if (parseInt(x)) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
        return x;
    }
}

export function handleResponse(response) {
    return new Promise((resolve, reject) => {
        resolve(response);
    });
}

export function handleError(error) {
    return Promise.reject(error);
}