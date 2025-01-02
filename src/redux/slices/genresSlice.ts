import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Genre {
    genre: string;

}

interface Music {
    artist: string;
    title: string;
    album: string;
    genre: string;
}

interface GenresState {
    genres: Genre[];
    musicByGenre: Music[];
    loading: boolean;
    error: string | null;
}

const initialState: GenresState = {
    genres: [],
    musicByGenre: [],
    loading: false,
    error: null,
};

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        setGenres(state, action: PayloadAction<Genre[]>) {
            state.genres = action.payload;
            state.loading = false;
            state.error = null;
        },

        setMusicByGenre(state, action: PayloadAction<Music[]>) {
            state.musicByGenre = action.payload;
            state.loading = false;
            state.error = null;
        },

        fetchGenresStart(state) {
            state.loading = true;
            state.error = null;
        },

        fetchGenresError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        fetchGenresSongs(state, action: PayloadAction<string>) {
            state.loading = true;
            state.error = null;
        },
    },
});

export const { 
    setGenres, 
    setMusicByGenre, 
    fetchGenresSongs,
    fetchGenresError,
    fetchGenresStart,
} = genresSlice.actions;
export default genresSlice.reducer;
