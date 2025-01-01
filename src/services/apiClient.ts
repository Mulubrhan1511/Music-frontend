import axios from 'axios';
import store from '../redux/store'; // Corrected import for default export
import { clearAccessToken, setAccessToken } from '../redux/slices/authSlice'; // Import the actions

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Request interceptor to add the access token
apiClient.interceptors.request.use((config) => {
    const state = store.getState(); // Get the current state
    const token = state.auth.accessToken;
    console.log(state.auth.accessToken, 'accessToken') // Access token from Redux store
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Request a new access token using the refresh token
                const response = await axios.post('http://localhost:5000/api/auth/refresh-token', {}, { withCredentials: true });

                const newAccessToken = response.data.accessToken;
                store.dispatch(setAccessToken(newAccessToken)); // Update access token in Redux

                // Retry the original request with the new access token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (err) {
                // Refresh token expired, log the user out
                store.dispatch(clearAccessToken()); // Clear access token in Redux
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
