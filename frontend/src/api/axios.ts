import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;

let refreshSubscribers: Array<() => void> = [];

const subscribeToRefresh = (callback: () => void) => {
  refreshSubscribers.push(callback);
};

const notifyRefreshSubscribers = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

/*
 * Request interceptor
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(`➡️ ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*
 * Response interceptor
 */
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },

  async (error: AxiosError) => {
    console.error('❌ API Error:', error.response?.status, error.response?.data);

    const originalRequest = error.config as InternalAxiosRequestConfig & {_retry?: boolean;};

    /** Only handle 401 errors.*/
    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    /*
     * Never try to refresh the refresh request itself.
     *
     * Otherwise:
     *
     * /auth/refresh -> 401
     *       ↓
     * /auth/refresh -> 401
     *       ↓
     * /auth/refresh -> 401
     *       ↓
     * infinite loop
     */
    if (originalRequest.url === '/auth/refresh') {
      return Promise.reject(error);
    }

    /* Prevent the same request from being retried multiple times. */
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    /* If another request is already refreshing the token, wait for that refresh to finish. */
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeToRefresh(() => {
          api(originalRequest)
            .then(resolve)
            .catch(reject);
        });
      });
    }

    /* This request becomes responsible for refreshing the access token. */
    isRefreshing = true;

    try {
      await api.post('/auth/refresh');

      notifyRefreshSubscribers();

      /* Retry the original failed request.*/
      return api(originalRequest);

    } catch (refreshError) {
      /*
       * Refresh token is probably expired/invalid.
       * The user needs to log in again.
       */
      refreshSubscribers = [];

      return Promise.reject(refreshError);

    } finally {
      isRefreshing = false;
    }
  }
);

export default api;