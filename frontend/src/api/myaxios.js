import axios from 'axios';
const remoteApi = "https://cors-anywhere.herokuapp.com/https://slow-crepe.glitch.me"
const localApi = "http://localhost:3001"
const api = process.env.NODE_ENV === 'development' ? localApi : remoteApi
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
/**
 * New instance of axios with a custom config.
 */
var myaxios = axios.create({
    baseURL: api,
    timeout: 1000,
    headers: { 'Authorization': token, 
               'Access-Control-Allow-Origin': '*' 
             }
  });

  export default myaxios;