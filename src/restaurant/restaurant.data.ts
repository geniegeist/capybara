import { HttpClient } from '../types/http-client';
import type {
  GetRestaurantsByPostalCodeResult,
  RestaurantDataFetcher,
} from './restaurant.types';

type RestaurantPayload = {
  id: string;
  name: string;
  address: {
    city: string;
    firstLine: string;
    postalCode: string;
    location: {
      type: 'Point';
      coordinates: [number, number];
    };
  };
  rating: {
    count: number;
    starRating: number;
    userRating: number | null;
  };
  cuisines: {
    name: string;
    uniqueName: string;
  }[];
};

type RestaurantsByPostalCodeResponse = {
  data: {
    metaData: any;
    restaurants: RestaurantPayload[];
  };
};

export default class RestaurantData implements RestaurantDataFetcher {
  httpClient: HttpClient;
  apiEndpoint: string;

  constructor(httpClient: HttpClient, apiEndpoint: string) {
    this.httpClient = httpClient;
    this.apiEndpoint = apiEndpoint;
  }

  async getRestaurantsByPostalCode(postalCode: string, limit = 10) {
    return this.httpClient
      .get<RestaurantsByPostalCodeResponse>(`${this.apiEndpoint}/${postalCode}`)
      .then((response) => {
        const res: GetRestaurantsByPostalCodeResult = {
          restaurants: response.data.restaurants.slice(0, limit),
        };

        return res;
      })
      .catch((error: any) => {
        if (error.response) {
          if (error.response.status === 404) {
            // TO-DO: error handling
          }
        }

        throw error;
      });
  }
}

export class InvalidPostcalCodeError extends Error {
  constructor() {
    super('Invalid postal code');
  }
}
