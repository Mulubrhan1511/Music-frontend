import { call, put, takeLatest } from 'redux-saga/effects';
import apiClient from '../../services/apiClient';
import { setSongs } from '../slices/songSlice';

function* fetchSongs(): Generator<any, void, any> {
    try {
        const response = yield call(apiClient.get, '/songs');
        yield put(setSongs(response.data));
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}

export default function* songSagas() {
    yield takeLatest('songs/fetchSongs', fetchSongs);
}
