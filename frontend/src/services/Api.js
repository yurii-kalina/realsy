import axios from 'axios'

class Api {
  constructor (url) {
    this.adapter = axios.create({
      baseURL: url
    })
  }

    sendRequest = (url, type, payload, headers) => {
      return this.adapter.request({
        url: url,
        method: type,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      })
    }
}

export default new Api('/api/v1')
