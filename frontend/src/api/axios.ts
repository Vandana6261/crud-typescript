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


api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(`➡️ ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },

  async (error: AxiosError) => {
    console.error('❌ API Error:', error.response?.status, error.response?.data);
    // console.log(error.response?.data);
    // console.log(error.response?.data?.code);
    const originalRequest = error.config as InternalAxiosRequestConfig & {_retry?: boolean;};

    /** Only handle 401 errors.*/
    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }


    if (originalRequest.url === '/auth/refresh') {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeToRefresh(() => {
          api(originalRequest)
            .then(resolve)
            .catch(reject);
        });
      });
    }

    isRefreshing = true;

    try {
      await api.post('/auth/refresh');

      notifyRefreshSubscribers();

      return api(originalRequest);

    } catch (refreshError) {
      refreshSubscribers = [];

      return Promise.reject(refreshError);

    } finally {
      isRefreshing = false;
    }
  }
);

export default api;