import { get } from "../request/request.ts";
import { routes } from "../request/config.ts";

const getCard = (cardName) => {
  return get(routes.getCard, {
    options: {
      headers: {},
    },
    params: {
      q: cardName,
    },
    subDirectories: {},
  });
};

export default getCard;
