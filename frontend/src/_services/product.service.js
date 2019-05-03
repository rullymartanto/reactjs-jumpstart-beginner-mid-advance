import {
    authHeader,
    config,
    handleResponse,
    handleError
} from '../_helpers/default';
import axios from 'axios' 

export const productService = {
    DeleteProduct,
    AddProduct,
    UpdateProduct,
    Product,
    ProductGrid,
};

function DeleteProduct(id) {
    return axios({
        method:'DELETE',
        headers: authHeader(),
        url:config.apiUrl + '/api/products/' + id,
      }).then(handleResponse, handleError)
}

function AddProduct(dt) {
    return axios({
        method:'POST',
        headers: authHeader(),
        data: dt,
        url:config.apiUrl + '/api/products/',
      }).then(handleResponse, handleError)
}

function UpdateProduct(dt) {
    return axios({
        method:'PUT',
        headers: authHeader(),
        data: dt,
        url:config.apiUrl + '/api/products/'+ dt.productID,
      }).then(handleResponse, handleError)
}

function Product(id) {
    return axios({
        method:'GET',
        headers: authHeader(),
        url:config.apiUrl + '/api/products/'+ id,
      }).then(handleResponse, handleError)
}

function ProductGrid(page, max, filter) {
    return axios({
        method:'GET',
        headers: authHeader(),
        url:config.apiUrl + '/api/products/page/' + page + '/max/'+ max + '/search/' + filter,
      }).then(handleResponse, handleError)
}




