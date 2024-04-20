export type Restaurant = {
  name: string;
  link: string;
  address: {
    city: string;
    firstLine: string;
    postalCode: string;
    location: {
      type: 'Point';
      coordinates: [number, number];
    };
  };
  cuisines: {
    name: string;
    uniqueName: string;
  }[];
  rating: {
    count: number;
    starRating: number;
    userRating: number | null;
  };
  isOpenForDelivery: boolean;
  isOpenForCollection: boolean;
};

export type GetRestaurantsByPostalCodeResult = {
  restaurants: Restaurant[];
};

export interface RestaurantDataFetcher {
  getRestaurantsByPostalCode: (
    postalCode: string
  ) => Promise<GetRestaurantsByPostalCodeResult>;
}

export interface RestaurantSVGFactory {
  create: (restaurants: Restaurant[], options?: { theme?: string }) => string;
  createNotFound: (postalCode: string, options?: { theme?: string }) => string;
}
