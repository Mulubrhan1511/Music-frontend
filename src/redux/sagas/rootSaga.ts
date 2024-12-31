import { all } from 'redux-saga/effects';
import songSagas from './songSagas';
import albumSagas from './albumSagas';
import artistSagas from './artistSagas';
import genresSagas from './genresSagas';

export default function* rootSaga() {
    yield all([
        songSagas(),
        albumSagas(),
        artistSagas(),
        genresSagas()
    ]);

}
