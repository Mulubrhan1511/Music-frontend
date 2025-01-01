import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Artist {
    artist: string;
}

interface Music {
    artist: string;
    title: string;
    album: string;
    genre: string;
}

interface ArtistState {
    artists: Artist[];
    musicByArtist: Music[];
    loading: boolean;
    error: string | null;
}

const initialState: ArtistState = {
    artists: [],
    musicByArtist: [],
    loading: false,
    error: null,
};

const artistSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {
        setArtists(state, action: PayloadAction<Artist[]>) {
            state.artists = action.payload;
            state.loading = false;
            state.error = null;
        },
        setMusicByArtist(state, action: PayloadAction<Music[]>) {
            state.musicByArtist = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchArtistsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchArtistsError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchArtistsSongs(state, action: PayloadAction<string>) {
            state.loading = true;
            state.error = null;
        },
    },
});

export const { 
    setArtists, 
    setMusicByArtist,
    fetchArtistsError,
    fetchArtistsStart,
    fetchArtistsSongs } = artistSlice.actions;
export default artistSlice.reducer;
