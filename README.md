# README Restaurants

**Our mission:** create a global food discovery service for hungry developers 🍕

![Restauranta](https://capybara-gq2i.onrender.com/api/v1/restaurants/bypostalcode/EC4M7RF/svg)

## What is this?

This is a simple REST API that allows you to embed restaurants into your Github README.

Endpoint: `https://capybara-gq2i.onrender.com/api/v1/restaurants/bypostalcode/:postal_code/svg`

Usage:

```
![Restaurants for postal code EC4M7RF](https://capybara-gq2i.onrender.com/api/v1/restaurants/bypostalcode/EC4M7RF/svg)
```

### Demo

Want to try this out with your own postcode? Here is a playground for you: [Just create a new issue](https://github.com/geniegeist/capybara/issues/new/choose), enter the postcode and discover restaraunts while browsing for Github repository :)

### Is this production ready?

Sure, I truely believe this will revolutionize Github and turn it into a global food discovery service for hungry developers.

### Known issues

- Only works with UK postcodes

## API

### Available parameters

All parameters are optional.

#### limit

- number of restaurants to display
- default is 10
- max is 10

Example: `https://capybara-gq2i.onrender.com/api/v1/restaurants/bypostalcode/m11ag/svg?limit=1`

![Restauranta](https://capybara-gq2i.onrender.com/api/v1/restaurants/bypostalcode/m11ag/svg?limit=1)

#### orderby

- possible values: `rating`
- note that it first selects restaurants, then orders them (it does not order all restaurants by rating and then select them)

Example: `https://capybara-gq2i.onrender.com/api/v1/restaurants/bypostalcode/ox1/svg?orderby=rating`

![Restauranta](https://capybara-gq2i.onrender.com/api/v1/restaurants/bypostalcode/ox1/svg?orderby=rating&limit=3)
