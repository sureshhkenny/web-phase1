import axios from 'axios';
const instance = axios.create({baseURL: 'http://18.171.8.65:5000/api'});
export default instance