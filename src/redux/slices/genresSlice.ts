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
}

const initialState: GenresState = {
    genres: [],
    musicByGenre: [],
};

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        setGenres(state, action: PayloadAction<Genre[]>) {
            state.genres = action.payload;
        },

        setMusicByGenre(state, action: PayloadAction<Music[]>) {
            state.musicByGenre = action.payload;
        },

        fetchGenresSongs(state, action: PayloadAction<string>) {
            // No state change here; it's just a trigger for
        }
    },
});

export const { setGenres, setMusicByGenre, fetchGenresSongs } = genresSlice.actions;
export default genresSlice.reducer;
