import { RequestHandler } from 'express';
import RestaurantData, { InvalidPostcalCodeError } from './restaurant.data';
import HttpClientFactory from '../lib/httpClient';
import { RestaurantSVGFactory } from './restaurant.svg';

export const svgRestaurantsByPostalCode: RequestHandler = async (req, res) => {
  const postalCode = req.params.postalCode;
  const fetcher = new RestaurantData(HttpClientFactory.create());

  try {
    const data = await fetcher.getRestaurantsByPostalCode(postalCode, 10);
    if (data.restaurants.length === 0) {
      res.status(404).json({ message: 'No restaurants found' });
      return;
    }
    const svg = RestaurantSVGFactory.create(data.restaurants);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  } catch (e: any) {
    if (e instanceof InvalidPostcalCodeError) {
      res.status(404).json({ message: 'Invalid postal code' });
    } else {
      res.status(500).json({ message: e.message });
    }
  }
};
