/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-restricted-globals */
import _ from 'lodash'
import axios from 'axios'
import { redirectLogin } from './auth/redirectLogin'

// import * as $ from 'jquery';

const httpClient = (isEndPoint = false, options) => {
  // const accessToken = localStorage.getItem('accessToken');
  const headers = {
    // 'Content-Type': 'application/json',
    // Authorization: accessToken,
  }

  const cancelTokenSource = axios.CancelToken.source()

  const defaultOptions = {
    responseType: 'json',
    headers,
    cancelToken: cancelTokenSource.token,
    ...options,
    transformResponse: (data) => {
      if (data && data.error && data.error.code === 401 && !location.pathname.includes('/auth')) {
        window.localStorage.removeItem('accessToken')
      }

      return data
    }
  }

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        (error.response.status === 401 && error.response.data.error.message === 'Token is inactive') ||
        error.response.data.error.message === 'Token expired'
      ) {
        redirectLogin(true)
      }
      return Promise.reject(error)
    }
  )

  return {
    get: (url, params = {}, options = {}) => {
      if (!options.ignoreAuth && !window.localStorage.getItem('accessToken')) {
        return new Promise((resolve, reject) => reject({}))
      }

      if (isEndPoint) {
        url = process.env.API_URL + url
      }
      const cloneParams = { ...params }

      _.forEach(cloneParams, (item, key) => {
        if ((!item && item !== 0) || item === 'ALL') {
          delete cloneParams[key]
        }

        if (key === 's' && item) {
          cloneParams.$text = { $search: item }
        }
      })

      if (cloneParams.page) {
        cloneParams.$skip = (cloneParams.page - 1) * cloneParams.$limit
        delete cloneParams.page
      }

      if (!_.isEmpty(cloneParams)) {
        url = `${url}?${$.param(cloneParams)}`
      }

      return axios.get(url, {
        ...defaultOptions,
        ...options
      })
    },
    post: (url, data = {}, options = {}) => {
      if (!options.ignoreAuth && !window.localStorage.getItem('accessToken')) {
        return new Promise((resolve, reject) => reject({}))
      }
      if (data.status && data.status === '') {
        data.status = 'inactive'
      }

      if (isEndPoint) {
        url = process.env.API_URL + url
      }
      return axios.post(`${url}`, data, {
        ...defaultOptions,
        ...options
      })
    },
    put: (url, data = {}, options = {}) => {
      if (!options.ignoreAuth && !window.localStorage.getItem('accessToken')) {
        return new Promise((resolve, reject) => reject({}))
      }

      if (data.status && data.status === '') {
        data.status = 'inactive'
      }

      if (isEndPoint) {
        url = process.env.API_URL + url
      }
      return axios.put(`${url}`, data, {
        ...defaultOptions,
        ...options
      })
    },
    patch: (url, data = {}, options = {}) => {
      if (!options.ignoreAuth && !window.localStorage.getItem('accessToken')) {
        return new Promise((resolve, reject) => reject({}))
      }

      if (data.status && data.status === '') {
        data.status = 'inactive'
      }

      if (isEndPoint) {
        url = process.env.API_URL + url
      }
      return axios.patch(`${url}`, data, {
        ...defaultOptions,
        ...options
      })
    },
    delete: (url, options = {}) => {
      if (!options.ignoreAuth && !window.localStorage.getItem('accessToken')) {
        return new Promise((resolve, reject) => reject({}))
      }

      if (isEndPoint) {
        url = process.env.API_URL + url
      }
      return axios.delete(`${url}`, {
        ...defaultOptions,
        ...options
      })
    },

    cancel: (reason = 'Operation canceled by user.') => {
      cancelTokenSource.cancel(reason)
    }
  }
}

export default httpClient
