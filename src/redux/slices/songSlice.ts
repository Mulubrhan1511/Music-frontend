import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Song {
  _id: string;
  title: string;
  artist: string;
  genre: string;
  album: string;
  createdAt?: string;
}

interface SongsState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
      state.loading = false;
      state.error = null;
    },
    addSong(state, action: PayloadAction<Song>) {
      state.songs.push(action.payload);
    },
    updateSong(state, action: PayloadAction<Song>) {
      const index = state.songs.findIndex((song) => song._id === action.payload._id);
      if (index >= 0) {
        state.songs[index] = { ...state.songs[index], ...action.payload };
      }
    },
    deleteSong(state, action: PayloadAction<string>) {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },
    fetchSongsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setSongs,
  addSong,
  updateSong,
  deleteSong,
  fetchSongsStart,
  fetchSongsError,
} = songSlice.actions;

export default songSlice.reducer;
