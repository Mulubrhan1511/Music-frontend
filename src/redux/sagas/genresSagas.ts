import { call, put, takeLatest } from "redux-saga/effects";
import apiClient from "../../services/apiClient";
import {  fetchGenresStart, setGenres, setMusicByGenre } from "../slices/genresSlice";

function* fetchGenres(): Generator<any, void, any> {
  try {
    yield put(fetchGenresStart());
    const response = yield call(apiClient.get, '/genres');
    const genres = response.data;
    yield put(setGenres(genres));
  } catch (error) {
   
  }
}

function* fetchGenresSongsSaga(action: any): Generator<any, void, any> {
  try {
    yield put(fetchGenresStart());
    const genre = action.payload;
    const response = yield call(apiClient.get, `/genres/${genre}`);
    if (response.data && Array.isArray(response.data)) {
      yield put(setMusicByGenre(response.data));
    } else {
      
    }
  } catch (error) {
    
  }
}

export default function* genresSagas() {
  yield takeLatest('genres/fetchGenres', fetchGenres);
  yield takeLatest('genres/fetchGenresSongs', fetchGenresSongsSaga);
}