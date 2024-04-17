import cuisineToEmoji from '../util/cuisineToEmoji';
import escapeXML from '../util/escapeXML';
import {
  RestaurantSVGFactory as Factory,
  Restaurant,
} from './restaurant.types';

export const RestaurantSVGFactory: Factory = {
  create(restaurants: Restaurant[]): string {
    return `
      <svg width="500px" height="${
        restaurants.length * 90 + 20
      }px" xmlns="http://www.w3.org/2000/svg">
        <foreignObject width="100%" height="${restaurants.length * 90 + 20}px">
          <div xmlns="http://www.w3.org/1999/xhtml" style="height: 100%;"> 
            <style> 
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translate3d(0, 40%, 0);
                }
                to {
                  opacity: 1;
                  transform: none;
                }
              }

              .container {
                border-radius: 8px;
font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
                font-weight: 500;
                font-size: 12px;
                padding: 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;
              }

              .container p {
                margin: 0;
                padding: 0;
              }

              .item {
                padding: 0.5em 1em;
                opacity: 0;
              }

              .item.animated {
                animation-name: fadeInUp;
                animation-duration: 0.75s;
                animation-fill-mode: forwards;
              }

              ${restaurants
                .map(
                  (_, i) =>
                    `.item.animated:nth-child(${i + 1}) { animation-delay: ${
                      i * 0.2
                    }s; }`
                )
                .join('')}
            </style>

            <div class="container">
              ${restaurants
                .map((restaurant) => {
                  return `
                  <div class="item animated">
                    <div style="display: flex; flex-direction: row;">
                      <p style="font-weight: bold;">${escapeXML(
                        restaurant.name
                      )}</p>
                      <div style="margin-left: auto; display: flex; flex-direction: row;">
                        <p>${restaurant.rating.starRating}</p>
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FF7F00" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="star"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/><path d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18z"/></g></g></svg>
                        </div>
                      </div>
                    </div>
                    <p style="color: rgba(0,0,0,0.8);">${escapeXML(
                      restaurant.address.firstLine
                    )}, ${escapeXML(restaurant.address.city)} ${
                    restaurant.address.postalCode
                  }</p>
                    <div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 4px; align-items: stretch; margin-top: 4px;">${restaurant.cuisines
                      .map(
                        (cuisine) =>
                          `<span style="font-size: 0.8em; color: rgba(0,0,0,0.8); background-color: #efefef; padding: 4px; border-radius: 1em; display: flex; align-items: center;">${escapeXML(
                            cuisine.name
                          )}${
                            cuisineToEmoji(cuisine.uniqueName)
                              ? ` ${cuisineToEmoji(cuisine.uniqueName)}`
                              : ''
                          }</span>`
                      )
                      .join('')}</div>
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
