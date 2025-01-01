import { call, put, takeLatest } from 'redux-saga/effects';
import { setSongs, fetchSongsStart, fetchSongsError } from '../slices/songSlice';
import axios from 'axios';
import apiClient from '../../services/apiClient';



// Worker saga: fetch songs
function* fetchSongs(): Generator<any, void, any> {
    try {
        yield put(fetchSongsStart());
        const response = yield call(apiClient.get, '/songs');
        yield put(setSongs(response.data));
    } catch (error: any) {
        yield put(fetchSongsError(error.message || 'Failed to fetch songs'));
    }
}


// Watcher saga
export function* watchSongs() {
    yield takeLatest('songs/fetchSongs', fetchSongs);
}

export default watchSongs;