/**
 * Main router for the REST API
 */
import { Router } from 'express';
import { svgRestaurantsByPostalCode } from '../restaurant/restaurant.controller';

export default function createRouter() {
  const router = Router();

  router.get('/', (req, res) => {
    res.send('REST API up');
  });

  router
    .route('/restaurants/bypostalcode/:postalCode/svg')
    .get(svgRestaurantsByPostalCode);

  return router;
}
