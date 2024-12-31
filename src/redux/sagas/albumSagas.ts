import { call, put, takeLatest } from "redux-saga/effects";
import apiClient from "../../services/apiClient";
import { fetchAlbumsSongs, setAlbums, setMusicIntheAlbum,  } from "../slices/albumSlice";
import { PayloadAction } from "@reduxjs/toolkit";


function* fetchAlbums(): Generator<any, void, any> {
    try {
      const response = yield call(apiClient.get, '/albums');
     
      const albums = response.data;
      yield put(setAlbums(albums));
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  }

function* fetchAlbumsSongsSaga(action: PayloadAction<string>): Generator<any, void, any> {
    try {
        const albumName = action.payload;
        const response = yield call(apiClient.get, `/albums/${albumName}`);
        
        if (response.data && Array.isArray(response.data)) {
            yield put(setMusicIntheAlbum(response.data)); // Pass songs to reducer
        } else {
            console.error('Unexpected response structure:', response.data);
        }
    } catch (error) {
        console.error('Error fetching songs by album:', error);
    }
}

  

export default function* albumSagas() {
    yield takeLatest('albums/fetchAlbums', fetchAlbums);
    yield takeLatest(fetchAlbumsSongs.type, fetchAlbumsSongsSaga);
}