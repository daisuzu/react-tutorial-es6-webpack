import axios from 'axios';

export default class api {
  static getComments() {
    return axios.get('/api/comments');
  }

  static postComment(data) {
    return axios.post('/api/comments', data);
  }
}
