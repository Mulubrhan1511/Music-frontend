import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Request interceptor to add the access token
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
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

            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                // No refresh token, log the user out
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                // Use the refresh token to get a new access token
                const response = await axios.post('http://localhost:5000/api/auth/refresh-token', {
                    refreshToken,
                });

                const newAccessToken = response.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                // Retry the original request with the new access token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (err) {
                // Refresh token expired, log the user out
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;