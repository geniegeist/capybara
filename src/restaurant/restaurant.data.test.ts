import { describe, expect, it } from 'vitest';
import RestaurantData from './restaurant.data';
import HttpFactory from '../lib/httpClient';

describe('RestaurantData', async () => {
  it('fetches restaurants', async () => {
    const httpClient = HttpFactory.create();
    const fetcher = new RestaurantData(httpClient);
    const res = await fetcher.getRestaurantsByPostalCode('EC4M7RF');
    expect(res.restaurants.length).toBe(10);
  });
});
