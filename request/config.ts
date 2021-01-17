// Default Headers will be applied to all requests
const defaultHeaders = {
  "Content-Type": "application/json",
};

// BaseURL
const baseURL = "https://api.magicthegathering.io/v1/cards";

// Routes
//Configued routes for the request
const routes = {
  getCard: `https://api.scryfall.com/cards/search`,
};

export { baseURL, defaultHeaders, routes };
