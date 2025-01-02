import { call, put, takeLatest } from 'redux-saga/effects';
import { setSongs, fetchSongsStart, fetchSongsError, addSong as addSongAction } from '../slices/songSlice';
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

// Worker saga: add song
function* addSong(action: ReturnType<typeof addSongAction>): Generator<any, void, any> {
    try {
        const response = yield call(apiClient.post, '/songs', action.payload);
        console.log('Song added:', response.data);
        // Optionally dispatch an action to update the state or fetch songs again
        
    } catch (error: any) {
        console.error('Failed to add song:', error.message);
    }
}

// Watcher saga
export function* watchSongs() {
    yield takeLatest('songs/fetchSongs', fetchSongs);
    yield takeLatest(addSongAction.type, addSong); // Use addSong action from slice
}

export default watchSongs;
