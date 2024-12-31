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
}

const initialState: ArtistState = {
    artists: [],
    musicByArtist: [],
};

const artistSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {
        setArtists(state, action: PayloadAction<Artist[]>) {
            state.artists = action.payload;
        },
        setMusicByArtist(state, action: PayloadAction<Music[]>) {
            state.musicByArtist = action.payload;
        },
        // Add this action to trigger the saga
        fetchArtistsSongs(state, action: PayloadAction<string>) {
            // No state change here; it's just a trigger for the saga
        },
    },
});

export const { setArtists, setMusicByArtist, fetchArtistsSongs } = artistSlice.actions;
export default artistSlice.reducer;
