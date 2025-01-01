import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage for web
import rootSaga from './sagas/rootSaga';
import songReducer from './slices/songSlice';
import albumReducer from './slices/albumSlice';
import artistReducer from './slices/artistSlice';
import genresReducer from './slices/genresSlice';
import authReducer from './slices/authSlice'; // Import the auth slice

// Configure redux-persist for the auth slice
const authPersistConfig = {
  key: 'auth',
  storage, // Persists in localStorage
  whitelist: ['accessToken'], // Only persist accessToken
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songReducer,
    albums: albumReducer,
    artists: artistReducer,
    genres: genresReducer,
    auth: persistedAuthReducer, // Use persisted auth reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false, // Disable serializable check for redux-persist
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
