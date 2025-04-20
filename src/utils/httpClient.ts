// src/services/httpService.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'

/**
 * A configurable HTTP service using Axios for API calls across multiple microservices.
 * You can pass a custom baseURL when instantiating, or rely on a default.
 */
export class HttpService {
  protected api: AxiosInstance

  constructor(baseURL?: string) {
    const url =
      baseURL ?? // use this if it’s defined (even if it’s an empty string)
      import.meta.env.VITE_API_URL ?? // otherwise use your env var (even if it’s '')
      'http://localhost:8002' // finally, use this hard‐coded default

    this.api = axios.create({
      baseURL: url,
      headers: { 'Content-Type': 'application/json' }
    })

    // Attach auth token on each request if present
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('auth_token')
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error: AxiosError) => Promise.reject(error)
    )

    // Handle common response errors
    this.api.interceptors.response.use(
      (res: AxiosResponse) => res,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // e.g. redirect to login
          // window.location.href = '/login';
        }
        return Promise.reject(error)
      }
    )
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.api.get<T>(url, config).then((r) => r.data)
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.api.post<T>(url, data, config).then((r) => r.data)
  }

  public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.api.put<T>(url, data, config).then((r) => r.data)
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.api.delete<T>(url, config).then((r) => r.data)
  }
}

/**
 * Default instance using REACT_APP_API_BASE_URL
 */
export const defaultHttpService = new HttpService()
