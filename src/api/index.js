import http from '../utils/http';

export function getDocs(id) {
    return http.get(`/api/docs/${id}`);
}

export function updateDocs(id, params) {
    return http.put(`/api/docs/${id}`, params);
}

export function createDoc() {
    return http.post('/api/docs');
}

export function getDesktop() {
    return http.get('/api/docs');
}

export function getContent(id) {
    return http.get(`/api/content/${id}`);
}

export function composeContent(id, params) {
    return http.post(`/api/content/${id}`, params);
}
