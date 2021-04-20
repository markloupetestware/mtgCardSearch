import queryString from "query-string";
import { defaultHeaders } from "./config";

// A simple union type for the API Methods available.
type APIMethod = "GET" | "POST" | "PUT" | "DELETE";

/**
 * Abstracted API request funcion that fetches a provided URL with the passed options
 * @param APIMethod - string of method type
 * @param config - object of headers and params to pass to fetch
 * @returns {promise} - fetched promise
 */
const APIRequest = (method: APIMethod) => (
  resource: string,
  { options = { headers: {} }, params = {}, subDirectories = {} }: any = {}
) => {
  // Generate the final Options Object
  const requestOptions = {
    method,
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  };
  // Create the URL based on passed in URL + subDirectories + queryParams
  const queryStringParams = { ...params };
  const subDirObjKeys = Object.keys(subDirectories);
  const subDirObjvalues = Object.values(subDirectories);

  const addSubDirectories = subDirObjKeys.map((item, index) => {
    return `/${item}/${subDirObjvalues[index]}`;
  });
  const urlWithSubDirectories = Object.keys(subDirectories).length
    ? `${resource}${addSubDirectories}`
    : `${resource}`;

  const url = Object.keys(params).length
    ? `${urlWithSubDirectories}?${queryString.stringify(queryStringParams)}`
    : `${urlWithSubDirectories}`;

  // Start our request
  return fetch(url, requestOptions)
    .then((response: any) => {
      const contentType = response.headers.get("content-type");
      // If the response is not okay (meaning its not a 2XX response), then we need to pull out any error message and reject
      if (!response.ok) {
        // If its a JSON response, then base our assumptions on that
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then((json: any) => {
            // If the JSON has an error message, throw an error with that message.
            if (json.message || json.msg || json.error) {
              return Promise.reject(json.message || json.msg || json.error);
            }
            // Otherwise, just reject with the response code and status text
            return Promise.reject(
              `${response.status} - ${response.statusText}`
            );
          });
          // If its not a JSON error response, just reject with the text response we receive.
        } else {
          return response.text().then((text: any) => Promise.reject(text));
        }
      }

      // If we get here, it means its a successful 2XX response. So reolve the promise with the result.
      // This is likely where you'd want to hook in more "middleware" for dealing with generic offline
      // or cacheing if not using a library to do it for you.
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then((data: any) =>
          //success object returned here
          Promise.resolve({
            payload: data,
            success: response.ok,
            status: response.status,
          })
        );
      } else {
        return response.text().then((text: any) => Promise.resolve(text));
      }
    })
    .catch((error) => Promise.reject(error.message || error));
};

// Exported simple HTTP Verb functions to use in your API specific code.
export const get = APIRequest("GET");
export const put = APIRequest("PUT");
export const post = APIRequest("POST");
export const del = APIRequest("DELETE");
