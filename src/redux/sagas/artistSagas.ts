import { call, put, takeLatest } from "redux-saga/effects";
import apiClient from "../../services/apiClient";
import { setArtists, setMusicByArtist, fetchArtistsSongs } from "../slices/artistSlice";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchArtists(): Generator<any, void, any> {
   try {
      const response = yield call(apiClient.get, '/artists');
      const artists = response.data;
      yield put(setArtists(artists));
   } catch (error) {
      console.error('Error fetching artists:', error);
   }
}

function* fetchArtistsSongsSaga(action: PayloadAction<string>): Generator<any, void, any> {
   try {
      const artistName = action.payload;
      const response = yield call(apiClient.get, `/artists/${artistName}`);
      const songs = response.data;
      yield put(setMusicByArtist(songs));
   } catch (error) {
      console.error('Error fetching songs by artist:', error);
   }
}

export default function* artistSagas() {
    yield takeLatest(fetchArtistsSongs.type, fetchArtistsSongsSaga); // Use action type
    yield takeLatest('artists/fetchArtists', fetchArtists);
}
