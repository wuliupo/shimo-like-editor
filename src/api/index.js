import Vue from 'vue';

export function getDocs(id) {
  return Vue.axios.get(`/api/docs/${id}`);
}

export function updateDocs(id, params) {
  return Vue.axios.put(`/api/docs/${id}`, params);
}

export function createDoc() {
  return Vue.axios.post('/api/docs');
}

export function getDesktop() {
  return Vue.axios.get('/api/docs');
}

export function getContent(id) {
  return Vue.axios.get(`/api/content/${id}`);
}

export function composeContent(id, params) {
  return Vue.axios.post(`/api/content/${id}/compose`, params);
}
