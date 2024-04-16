export type Restaurant = {
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
  cuisines: {
    name: string;
    uniqueName: string;
  }[];
  rating: {
    count: number;
    starRating: number;
    userRating: number | null;
  };
};

export type GetRestaurantsByPostalCodeResult = {
  restaurants: Restaurant[];
};

export interface RestaurantDataFetcher {
  getRestaurantsByPostalCode: (
    postalCode: string
  ) => Promise<GetRestaurantsByPostalCodeResult>;
}
