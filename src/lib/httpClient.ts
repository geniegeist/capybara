import axios from 'axios';
import { HttpClientFactory as Factory } from '../types/http-client';

const HttpClientFactory: Factory = {
  create: () => {
    return axios;
  },
};

export default HttpClientFactory;
