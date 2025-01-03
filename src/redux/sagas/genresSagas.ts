import { call, put, takeLatest } from "redux-saga/effects";
import apiClient from "../../services/apiClient";
import { fetchGenresSongs, fetchGenresStart, setGenres, setMusicByGenre } from "../slices/genresSlice";

function* fetchGenres(): Generator<any, void, any> {
  try {
    yield put(fetchGenresStart());
    const response = yield call(apiClient.get, '/genres');
    const genres = response.data;
    yield put(setGenres(genres));
  } catch (error) {
    console.error('Error fetching genres:', error);
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
      console.error('Unexpected response structure:', response.data);
    }
  } catch (error) {
    console.error('Error fetching songs by genre:', error);
  }
}

export default function* genresSagas() {
  yield takeLatest('genres/fetchGenres', fetchGenres);
  yield takeLatest('genres/fetchGenresSongs', fetchGenresSongsSaga);
}