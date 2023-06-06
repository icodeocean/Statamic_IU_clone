import axios from 'axios'
import { captureException } from '@sentry/browser'

window.axios = axios
window.axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status >= 500) {
      captureException(error)
    }

    return Promise.reject(error)
  }
)
