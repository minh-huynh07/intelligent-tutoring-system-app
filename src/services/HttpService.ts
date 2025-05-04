class HttpService {
  endpoint: string

  http: any = null

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  /**
   * Send a request to get list from Server via API Request (axios)
   *
   * @param params: filter params
   * @param page: current page
   * @param ppp: post per pages
   *
   * @returns {*}
   */
  list = (params = {}) => {
    return this.http.get(process.env.API_URL + this.endpoint, params)
  }

  /**
   * Send a request to get detail information from Server via API Request (axios)
   *
   * @param id
   * @param params
   * @returns {*}
   */
  detail = (id: number | string, params = {}) => this.http.get(`${process.env.API_URL + this.endpoint}/${id}`, params)

  /**
   * Save data to server via API Request
   *
   * @param params
   * @param isCleanBody
   * @returns {*}
   */
  save = (params = {}) => {
    return this.http.post(process.env.API_URL + this.endpoint, params)
  }

  /**
   * Delete item from database via API Request
   *
   * @param params
   * @returns {*}
   */
  delete = (params: any = {}) => this.http.delete(`${process.env.API_URL + this.endpoint}/${params.id}`)

  cancelRequest = (reason: string) => {
    this.http.cancel(reason)
  }
}

export default HttpService
