import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Album {
    album: string;
    artist: string;
}

interface Music {
    artist: string;
    title: string;
    album: string;
    genre: string;
}

interface AlbumsState {
    albums: Album[];
    musicIntheAlbum: Music[];
    loading: boolean;
    error: string | null;
}

const initialState: AlbumsState = {
    albums: [],
    musicIntheAlbum: [],
    loading: false,
    error: null,
};

const albumSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        setAlbums(state, action: PayloadAction<Album[]>) {
            state.albums = action.payload;
            state.loading = false;
            state.error = null;
        },
        setMusicIntheAlbum(state, action: PayloadAction<Music[]>) {
            state.musicIntheAlbum = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchAlbumsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchAlbumsError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchAlbumsSongs(state, action: PayloadAction<string>) {
            state.loading = true;
            state.error = null;
        },
    },
});

export const { 
    setAlbums, 
    setMusicIntheAlbum, 
    fetchAlbumsStart, 
    fetchAlbumsError, 
    fetchAlbumsSongs 
} = albumSlice.actions;
export default albumSlice.reducer;