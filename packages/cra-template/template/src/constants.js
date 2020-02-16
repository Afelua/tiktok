import axios from "axios";

export const url = 'http://192.168.108.26:8080gfdg';

const config = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data; boundary=---WebKitFormBoundary7MA4YWxkTrZu0gW',
    },
};

const api = axios.create({
    baseURL: url + '/f1'
});


export const sendRequest = (files, onSuccess, onFail) => api.post('/', files, config)
    .then(function (response) {
        return onSuccess(response.data);
    })
    .catch(function (error) {
        // handle error
        return onFail(error)
    });
