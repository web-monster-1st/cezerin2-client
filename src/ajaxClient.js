import fetch from 'isomorphic-fetch'
import queryString from 'query-string'

class AjaxClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

	getConfig(method, data, cookie) {
		let config = {
      credentials: 'same-origin',
      method: method,
			headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate'
			}
		};

    if(cookie) {
      config.headers.Cookie = cookie;
    }

    if(data) {
      config.body = JSON.stringify(data);
    }
    return config;
	}

	get(endpoint, filter, cookie) {
    return fetch(this.baseUrl + endpoint + "?" + queryString.stringify(filter), this.getConfig('get', null, cookie)).then(this.returnStatusAndJson);
	}

  post(endpoint, data) {
		return fetch(this.baseUrl + endpoint, this.getConfig('post', data)).then(this.returnStatusAndJson);
	}

  put(endpoint, data) {
		return fetch(this.baseUrl + endpoint, this.getConfig('put', data)).then(this.returnStatusAndJson);
	}

  delete(endpoint) {
		return fetch(this.baseUrl + endpoint, this.getConfig('delete')).then(this.returnStatusAndJson);
	}

  returnStatusAndJson(response) {
      // response.status (number) - HTTP response code in the 100–599 range
      // response.statusText (String) - Status text as reported by the server, e.g. "Unauthorized"
      // response.ok (boolean) - True if status is HTTP 2xx
      // response.headers (Headers)
      // response.url (String)

      return response.json()
      .then(json => ({status: response.status, json: json}))
      .catch(() => ({status: response.status, json: null}));
  }
}

module.exports = AjaxClient
