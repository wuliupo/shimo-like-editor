import axios from 'axios';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const http = axios.create({
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
});

http.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
);

// Add a response interceptor
http.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
);

export default http;
