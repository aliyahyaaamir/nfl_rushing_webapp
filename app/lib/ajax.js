import _merge from 'lodash/merge';
import _isEmpty from 'lodash/isEmpty';

const defaultFetchOptions = { mode: 'no-cors' };

/**
 * Prepare the URL against which the request will be made
 * @param {string} endpoint The path on which to make the request
 * @param {Object} params The additional URI parameters to pass into the request
 */
function prepareUrl(endpoint, params = {}) {
  let url = endpoint;
  if (!_isEmpty(params)) {
    const joinedParams = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    url += `?${joinedParams}`;
  }
  return encodeURI(url);
}

/**
 * Ensure that if the status of the response indicates that it was not successful,
 * an Error is thrown so it can be handled appropriately
 * @param {Object} response
 */
function throwIfError(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Ensure that if the method is not allowed, the user recieves an alert message
 * @param {Object} response
 */
function alertIfMethodNotAllowed(response) {
  if (response.status === 405) {
    alert('This functionality has been temporarily disabled.'); // eslint-disable-line no-alert
  }
}

/**
 * Pull out the JSON body of the response and parses it.
 * @param {Object} response
 */
function parseJson(response) {
  return response.json();
}

/**
 * Make a GET request
 * @param {string} endpoint The path on which to make the request
 * @param {Object} params The additional URI parameters to pass into the request
 */
export function getRequest(endpoint, params = {}) {
  const url = prepareUrl(endpoint, params);
  return fetch(url)
    .then(parseJson);
}

/**
 * Make a DELETE request
 * @param {string} endpoint The path on which to make the request
 * @param {Object} params The additional URI parameters to pass into the request
 */
export function deleteRequest(endpoint, params = {}) {
  const url = prepareUrl(endpoint, params);
  return fetch(url, _merge({ method: 'DELETE' }, defaultFetchOptions))
    .tap(alertIfMethodNotAllowed)
    .tap(throwIfError);
}

/**
 * Make a POST request
 * @param {string} endpoint The path on which to make the request
 * @param {Object} params The additional URI parameters to pass into the request
 */
export function postRequest(endpoint, body, params = {}) {
  const url = prepareUrl(endpoint, params);
  const stringBody = JSON.stringify(body);
  return fetch(url, _merge({ method: 'POST', body: stringBody }, defaultFetchOptions))
    .tap(alertIfMethodNotAllowed)
    .tap(throwIfError)
    .then(parseJson);
}

/**
 * Make a PUT request
 * @param {string} endpoint The path on which to make the request
 * @param {Object} params The additional URI parameters to pass into the request
 */
export function putRequest(endpoint, body, params = {}) {
  const url = prepareUrl(endpoint, params);
  const stringBody = JSON.stringify(body);
  return fetch(url, _merge({ method: 'PUT', body: stringBody }, defaultFetchOptions))
    .tap(alertIfMethodNotAllowed)
    .tap(throwIfError)
    .then(parseJson);
}

/**
 * Make a PATCH request
 * @param {string} endpoint The path on which to make the request
 * @param {Object} params The additional URI parameters to pass into the request
 */
export function patchRequest(endpoint, body, params = {}) {
  const url = prepareUrl(endpoint, params);
  const stringBody = JSON.stringify(body);
  return fetch(url, _merge({ method: 'PATCH', body: stringBody }, defaultFetchOptions))
    .tap(alertIfMethodNotAllowed)
    .tap(throwIfError)
    .then(parseJson);
}
