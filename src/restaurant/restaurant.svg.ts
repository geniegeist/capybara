import escapeXML from '../util/escapeXML';
import {
  RestaurantSVGFactory as Factory,
  Restaurant,
} from './restaurant.types';

export const RestaurantSVGFactory: Factory = {
  create(restaurants: Restaurant[]): string {
    return `
      <svg width="500px" height="${
        restaurants.length * 70
      }px" xmlns="http://www.w3.org/2000/svg">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml"> 
            <style> 
              .container {
                border-radius: 8px;
                font-family: Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif;
                font-weight: normal;
                font-size: 12px;
              }

              .container p {
                margin: 0;
                padding: 0;
              }
            </style>

            <div class="container">
              ${restaurants
                .map((restaurant) => {
                  return `
                  <div style="background-color: white; height: 70px; padding: 0 1em;">
                    <div style="display: flex; flex-direction: row; ">
                      <p style="font-weight: 500">${escapeXML(
                        restaurant.name
                      )}</p>
                      <div style="margin-left: auto; display: flex; flex-direction: row;">
                        <p>${restaurant.rating.starRating}</p>
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FF7F00" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="star"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/><path d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18z"/></g></g></svg>
                        </div>
                      </div>
                    </div>
                    <p>${escapeXML(restaurant.address.firstLine)}, ${escapeXML(
                    restaurant.address.city
                  )} ${restaurant.address.postalCode}</p>
                    <p>${restaurant.cuisines
                      .map((cuisine) => escapeXML(cuisine.name))
                      .join(', ')}</p>
                  </div>
                `;
                })
                .join('')}
            </div>
          </div>
        </foreignObject>
      </svg>
    `;
  },
};
