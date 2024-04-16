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

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getRestaurantsByPostalCode(postalCode: string) {
    return this.httpClient
      .get<RestaurantsByPostalCodeResponse>(
        `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postalCode}`
      )
      .then((response) => {
        const res: GetRestaurantsByPostalCodeResult = {
          restaurants: response.data.restaurants.slice(0, 10),
        };

        return res;
      });
  }
}
