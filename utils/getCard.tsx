import { get } from "../request/request";
import { routes } from "../request/config";

const getCard = (cardName: any) => {
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
