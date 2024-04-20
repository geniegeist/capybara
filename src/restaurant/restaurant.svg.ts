import cuisineToEmoji from '../util/cuisineToEmoji';
import escapeXML from '../util/escapeXML';
import RestaurantTheme from './restaurant.theme';
import { RestaurantSVGFactory as Factory } from './restaurant.types';

export const RestaurantSVGFactory: Factory = {
  create(restaurants, options): string {
    const theme = RestaurantTheme[options?.theme ?? 'default'];

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
              a {
                color: inherit;
                text-decoration: none; /* no underline */
              }

              .container {
                border-radius: 8px;
font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
                font-weight: 500;
                font-size: 12px;
                padding: 0;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: 100%;
                background-color: ${theme.container.bgColor};
                color: ${theme.primaryFontColor};
              }

              .container p {
                margin: 0;
                padding: 0;
              }

              .item {
                padding: 0.5em 1em;
                opacity: 0;
                border-radius: 8px;
                cursor: pointer;
                transition: background-color 0.3s;
              }

              .item:hover {
                background-color: ${theme.container.darkerBgColor};
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
                    <a href="${restaurant.link}" target="_blank" style="">
                    <div style="display: flex; flex-direction: row; align-items: center;">
                      <p style="font-weight: bold;">${escapeXML(
                        restaurant.name
                      )}</p>
                      ${
                        restaurant.isOpenForDelivery ||
                        restaurant.isOpenForCollection
                          ? `<p style="opacity: 0.7; margin-left: 0.5em; color: ${theme.tertiaryFontColor}"> / Open</p>
                        <div style="opacity: 0.7; margin-left: 0.5em; width:8px; height: 8px; background-color: #0abb72; border-radius: 4px;" />`
                          : `<p style="opacity: 0.7; margin-left: 0.5em; color: ${theme.tertiaryFontColor}"> / Closed</p>
                        <div style="opacity: 0.7; margin-left: 0.5em; width:8px; height: 8px; background-color: #FF4130; border-radius: 4px;" />
`
                      }
                      <div style="margin-left: auto; display: flex; flex-direction: row;">
                        <p style="color: ${theme.starFontColor}">
                          ${restaurant.rating.starRating}
                        </p>
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FF7F00" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="star"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/><path d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18z"/></g></g></svg>
                        </div>
                      </div>
                    </div>
                    <p style="color: ${theme.secondaryFontColor};">${escapeXML(
                    restaurant.address.firstLine
                  )}, ${escapeXML(restaurant.address.city)} ${
                    restaurant.address.postalCode
                  }</p>
                    <div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 4px; align-items: stretch; margin-top: 4px;">${restaurant.cuisines
                      .map(
                        (cuisine) =>
                          `<span style="font-size: 0.8em; color: ${
                            theme.tertiaryFontColor
                          }; background-color: ${
                            theme.container.darkerBgColor
                          }; padding: 4px; border-radius: 1em; display: flex; align-items: center;">${escapeXML(
                            cuisine.name
                          )}${
                            cuisineToEmoji(cuisine.uniqueName)
                              ? ` ${cuisineToEmoji(cuisine.uniqueName)}`
                              : ''
                          }</span>`
                      )
                      .join('')}
                      </div>
                      </a>
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

  createNotFound(postalCode, options) {
    const theme = RestaurantTheme[options?.theme ?? 'default'];

    return `
      <svg width="500px" height="${
        90 + 20
      }px" xmlns="http://www.w3.org/2000/svg">
        <foreignObject width="100%" height="${90 + 20}px">
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
                justify-content: space-around;
                height: 100%;
                background-color: ${theme.container.bgColor};
                color: ${theme.primaryFontColor};
              }

              .container p {
                margin: 0;
                padding: 0;
              }

              .item {
                padding: 0.5em 1em;
                opacity: 0;
                border-radius: 8px;
                transition: background-color 0.3s;
              }

              .item.animated {
                animation-name: fadeInUp;
                animation-duration: 0.75s;
                animation-fill-mode: forwards;
              }
            </style>

            <div class="container">
              <div class="item animated">
                <div style="display: flex; flex-direction: column; align-items: center;">
                  <p style="font-weight: bold; font-size: 1.5rem; margin-bottom: 0.25em; color: ${
                    theme.primaryFontColor
                  }">404 ${`(╯°□°)╯`}</p>
                  <p style="color: ${
                    theme.secondaryFontColor
                  }">No restaurants found for ${postalCode}</p>
                </div>
              </div>
            </div>
          </div>
        </foreignObject>
      </svg>
    `;
  },
};
