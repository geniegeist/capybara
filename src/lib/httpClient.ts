import axios from 'axios';
import { HttpClientFactory } from '../types/http-client';

const factory: HttpClientFactory = {
  create: () => {
    return axios;
  },
};

export default factory;
