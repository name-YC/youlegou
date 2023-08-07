import axios from 'axios';
const  requests = axios.create({
    baseURL: 'http://localhost:8801',   //引入接口
    timeout: 20000,
});
export default requests
