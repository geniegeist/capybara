import { HttpClient } from '../types/http-client';
import type {
  GetRestaurantsByPostalCodeResult,
  RestaurantDataFetcher,
} from './restaurant.types';
import NodeCache from 'node-cache';

type RestaurantPayload = {
  id: string;
  name: string;
  uniqueName: string;
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
  isOpenNowForCollection: boolean;
  isOpenNowForDelivery: boolean;
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
  cache: NodeCache; // TO-DO: independency injection for better unit testing

  constructor(httpClient: HttpClient, apiEndpoint: string) {
    this.httpClient = httpClient;
    this.apiEndpoint = apiEndpoint;
    this.cache = new NodeCache({ stdTTL: 60 * 10 }); // 10 minutes
  }

  async getRestaurantsByPostalCode(
    postalCode: string,
    limit = 10,
    options?: { orderby?: string }
  ) {
    const handleRestaurantsData = (payload: RestaurantPayload[]) => {
      const restaurants = payload.slice(0, limit).map((restaurant) => {
        return {
          ...restaurant,
          link: `https://www.just-eat.co.uk/restaurants-${restaurant.uniqueName}`,
          isOpenForDelivery: restaurant.isOpenNowForDelivery,
          isOpenForCollection: restaurant.isOpenNowForCollection,
        };
      });

      if (options?.orderby === 'rating') {
        restaurants.sort((a, b) => {
          if (a.rating.starRating === null) {
            return 1;
          }

          if (b.rating.starRating === null) {
            return -1;
          }

          return b.rating.starRating - a.rating.starRating;
        });
      }

      const res: GetRestaurantsByPostalCodeResult = {
        restaurants,
      };

      return res;
    };

    if (this.cache.has(postalCode.toLowerCase())) {
      const payload = this.cache.get(
        postalCode.toLowerCase()
      ) as RestaurantPayload[];
      return handleRestaurantsData(payload);
    }

    return this.httpClient
      .get<RestaurantsByPostalCodeResponse>(`${this.apiEndpoint}/${postalCode}`)
      .then((response) => {
        this.cache.set(postalCode.toLowerCase(), response.data.restaurants);
        return handleRestaurantsData(response.data.restaurants);
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
