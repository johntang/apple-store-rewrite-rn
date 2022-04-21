import { FETCHING_TIMEOUT, BASE_URL } from './config';
var qs = require('qs');
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  // console.log(response);
  if (response instanceof Error) {
    throw response;
  }
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Check if any error in the netwrok response
 *
 * @param {object} responseJSON A response from a network request
 * @return {object|undefined} Returns either the response, or throws an error
 */

function checkResponse(responseJSON) {
  return responseJSON;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */

const requestUrl = {
  topHundrenFree: BASE_URL + 'rss/topfreeapplications/limit=100/json',
  topTenGross: BASE_URL + 'rss/topgrossingapplications/limit=10/json',
  getSpecificApp: BASE_URL + 'lookup',
};

async function request(url, datum) {
  const finalUrl = `${url}?${qs.stringify(datum)}`;
  console.log('final', finalUrl);

  const response = await fetchWithTimeout(
    fetch(finalUrl, {
      method: 'GET',
    }),
    FETCHING_TIMEOUT,
  );
  const statusResult = checkStatus(response);
  const jsonResult = await parseJSON(statusResult);
  return checkResponse(jsonResult);
}

function fetchWithTimeout(fetchPromise, timeout) {
  let abortFn = null;
  const abortPromise = new Promise((resolve, reject) => {
    abortFn = () => {
      reject(
        new Error(
          '網路出現異常，請重試。\nConnection error occurs. Please try again.',
        ),
      );
    };
  });

  const abortablePromise = Promise.race([fetchPromise, abortPromise]);

  setTimeout(() => {
    abortFn();
  }, timeout);

  return abortablePromise;
}

export { requestUrl, request };
