import { all } from 'redux-saga/effects';
import songSagas from './songSagas';

export default function* rootSaga() {
    yield all([songSagas()]);
}
