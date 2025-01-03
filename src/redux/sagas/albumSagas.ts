import { call, put, takeEvery } from 'redux-saga/effects';
import { setAlbums, setMusicIntheAlbum, fetchAlbumsStart, fetchAlbumsError } from '../slices/albumSlice';
import apiClient from "../../services/apiClient";// Assume this is your API client setup
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchAlbums(): Generator<any, void, any> {
    try {
        yield put(fetchAlbumsStart());
        const response = yield call(apiClient.get, '/albums');
        const albums = response.data;
        yield put(setAlbums(albums));
    } catch (error: any) {
        
        yield put(fetchAlbumsError(error.message || 'Failed to fetch albums'));
    }
}

function* fetchAlbumsSongsSaga(action: PayloadAction<string>): Generator<any, void, any> {
    try {
        yield put(fetchAlbumsStart());
        const albumName = action.payload;
        const response = yield call(apiClient.get, `/albums/${albumName}`);
        if (response.data && Array.isArray(response.data)) {
            yield put(setMusicIntheAlbum(response.data));
        } else {
            
        }
    } catch (error: any) {
        
        yield put(fetchAlbumsError(error.message || 'Failed to fetch songs'));
    }
}

export default function* albumSagas() {
    yield takeEvery('albums/fetchAlbums', fetchAlbums);
    yield takeEvery('albums/fetchAlbumsSongs', fetchAlbumsSongsSaga);
}