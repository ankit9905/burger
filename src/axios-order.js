import axios from 'axios';

const instance=axios.create({
    baseURL:'https://burger-c09cf.firebaseio.com/'
});

export default instance;