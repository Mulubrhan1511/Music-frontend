import { createSlice, PayloadAction } from "@reduxjs/toolkit";


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
}

const initialState: AlbumsState = {
    albums: [],
    musicIntheAlbum: [],
};

const albumSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        setAlbums(state, action: PayloadAction<Album[]>) {
            state.albums = action.payload;
        },

        setMusicIntheAlbum(state, action: PayloadAction<Music[]>) {
            state.musicIntheAlbum = action.payload; // Correctly updates `musicIntheAlbum`
        },        

        fetchAlbumsSongs(state, action: PayloadAction<string>) {
            // No state change here; it's just a trigger for the saga
        }
    },
});

export const { setAlbums, setMusicIntheAlbum, fetchAlbumsSongs } = albumSlice.actions;
export default albumSlice.reducer;