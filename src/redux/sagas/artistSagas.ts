import { call, put, takeLatest } from "redux-saga/effects";
import apiClient from "../../services/apiClient";
import { setArtists, setMusicByArtist, fetchArtistsSongs, fetchArtistsStart } from "../slices/artistSlice";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchArtists(): Generator<any, void, any> {
   try {
      yield put(fetchArtistsStart());
      const response = yield call(apiClient.get, '/artists');
      const artists = response.data;
      yield put(setArtists(artists));
   } catch (error) {
      console.error('Error fetching artists:', error);
   }
}

function* fetchArtistsSongsSaga(action: PayloadAction<string>): Generator<any, void, any> {
   try {
      yield put(fetchArtistsStart());
      const artistName = action.payload;
      const response = yield call(apiClient.get, `/artists/${artistName}`);
      if (response.data && Array.isArray(response.data)) {
         yield put(setMusicByArtist(response.data));
      } else {
         console.error('Unexpected response structure:', response.data);
      }
   } catch (error) {
      console.error('Error fetching songs by artist:', error);
   }
}

export default function* artistSagas() {
    yield takeLatest('artists/fetchArtists', fetchArtists);
      yield takeLatest('artists/fetchArtistsSongs', fetchArtistsSongsSaga);
}
