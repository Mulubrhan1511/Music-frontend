import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  setSongs, 
  fetchSongsStart, 
  fetchSongsError, 
  addSong as addSongAction, 
  updateSong as updateSongAction,
deleteSong as deleteSongAction
} from '../slices/songSlice';
import apiClient from '../../services/apiClient';

// Worker saga: fetch songs
function* fetchSongs(): Generator<any, void, any> {
  try {
    yield put(fetchSongsStart());
    const response = yield call(apiClient.get, '/songs');
    yield put(setSongs(response.data));
  } catch (error: any) {
    yield put(fetchSongsError(error.message || 'Failed to fetch songs'));
  }
}

// Worker saga: add song
function* addSong(action: ReturnType<typeof addSongAction>): Generator<any, void, any> {
  try {
    yield call(apiClient.post, '/songs', action.payload);
    yield call(fetchSongs); // Fetch songs again to update the list
  } catch (error: any) {
   
  }
}

// Worker saga: update song
function* updateSong(action: ReturnType<typeof updateSongAction>): Generator<any, void, any> {
    try {
      
  
      // Extract only the required fields
      const { title, artist, genre, album } = action.payload;
        
      // Create a new object with the selected fields
      const updatedData = { title, artist, genre, album };
  
      // Send the extracted data to the API
      yield call(apiClient.put, `/songs/${action.payload._id}`, updatedData);
  
      // Fetch songs again to refresh the list
      yield call(fetchSongs);
    } catch (error: any) {
      
    }
  }

function* deleteSong(action: ReturnType<typeof deleteSongAction>): Generator<any, void, any> {
  try {
    yield call(apiClient.delete, `/songs/${action.payload}`);
    yield call(fetchSongs); // Fetch songs again to update the list
  } catch (error: any) {
    
  }
} 

// Watcher saga
export function* watchSongs() {
  yield takeLatest('songs/fetchSongs', fetchSongs);
  yield takeLatest(addSongAction.type, addSong);
  yield takeLatest(updateSongAction.type, updateSong);
  yield takeLatest(deleteSongAction.type, deleteSong);
}

export default watchSongs;
