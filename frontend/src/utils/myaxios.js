import axios from 'axios';
const api = "http://localhost:3001"
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
  
var myaxios = axios.create({
    baseURL: api,
    timeout: 1000,
    headers: { 'Authorization': 'milsonei' }
  });

  export default myaxios;