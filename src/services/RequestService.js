const axios = require('axios');

const API_HOST = process.env.REACT_APP_API_HOST;

const request = (requestType, endpoint, params, body) => {
    console.log({
        logType: 'REQUEST',
        requestType,
        endpoint,
        params,
        body,
    });

    return axios({
        url: `${API_HOST}${endpoint}`,
        headers: {
            'Content-Type': 'application/json',
        },
        method: requestType,
        data: body,
        params,
    });
};

const get = (endpoint, params, body) => request('get', endpoint, params, body);

const post = (endpoint, params, body) => request('post', endpoint, params, body);

export const RequestService = {
    get,
    post,
};