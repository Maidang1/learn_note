import axios from 'axios';

export default (req) =>  axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    cookie: req.get('cookie') || '',
  },
});
