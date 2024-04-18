import { RequestHandler } from 'express';
import RestaurantData, { InvalidPostcalCodeError } from './restaurant.data';
import HttpClientFactory from '../lib/httpClient';
import { RestaurantSVGFactory } from './restaurant.svg';

const CACHE_MAX_AGE = process.env.CACHE_MAX_AGE ?? 60;
const apiEndpoint = process.env.API_ENDPOINT!;

export const svgRestaurantsByPostalCode: RequestHandler = async (req, res) => {
  const postalCode = req.params.postalCode;
  const fetcher = new RestaurantData(HttpClientFactory.create(), apiEndpoint);
  // TO-DO: validate limit
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

  if (isNaN(limit)) {
    res.status(400).json({ message: 'Limit should be a number' });
    return;
  }

  if (limit > 10) {
    res
      .status(400)
      .json({ message: 'Limit should be less than or equal to 10' });
    return;
  }

  try {
    const data = await fetcher.getRestaurantsByPostalCode(postalCode, limit);
    if (data.restaurants.length === 0) {
      res.status(404).json({ message: 'No restaurants found' });
      return;
    }
    const svg = RestaurantSVGFactory.create(data.restaurants);
    res.setHeader('Content-Type', 'image/svg+xml');
    if (CACHE_MAX_AGE) {
      res.setHeader('Cache-Control', `public, max-age=${CACHE_MAX_AGE}`);
    }
    res.send(svg);
  } catch (e: any) {
    if (e instanceof InvalidPostcalCodeError) {
      res.status(404).json({ message: 'Invalid postal code' });
    } else {
      res.status(500).json({ message: e.message });
    }
  }
};
