import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import songReducer from './slices/songSlice';
import albumReducer from './slices/albumSlice';
import artistReducer from './slices/artistSlice';
import genresReducer from './slices/genresSlice';


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        songs: songReducer,
        albums: albumReducer,
        artists: artistReducer,
        genres: genresReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
