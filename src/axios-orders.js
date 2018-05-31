import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://segun-react-burger.firebaseio.com/'
});

export default instance;