import { call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { setSongs } from '../slices/songSlice';

interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
}

const API_URL = 'http://localhost:5000/api/songs';

// Annotate the generator function
function* fetchSongs(): Generator<any, void, AxiosResponse<Song[]>> {
    try {
        const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
        const response: AxiosResponse<Song[]> = yield call(axios.get, API_URL, {
            headers: {
                Authorization: `Bearer ${token}`, // Add Authorization header
            },
        });
        yield put(setSongs(response.data)); // Dispatch action to set songs in the Redux store
    } catch (error: any) {
        console.error('Error fetching songs:', error);
        if (error.response?.status === 401) {
            // Handle token expiration by redirecting to login
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
        }
    }
}

export default function* songSagas() {
    yield takeLatest('songs/fetchSongs', fetchSongs);
}
