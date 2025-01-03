import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { addSong, updateSong, deleteSong } from '../redux/slices/songSlice';
import AddSongModal from '../pages/AddNewSong/AddSongModal';

const SongListContainer = styled.div`
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
`;

const SongCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const SongActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const SongList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { songs, loading, error } = useSelector((state: RootState) => state.songs);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<any>(null);

  useEffect(() => {
    dispatch({ type: 'songs/fetchSongs' }); // Fetch songs when the component loads
  }, [dispatch]);

  const handleAdd = (song: any) => {
    dispatch(addSong(song));
    setIsAddOpen(false);
  };

  const handleEdit = (song: any) => {
    dispatch(updateSong(song));
    setSelectedSong(null);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteSong(id));
  };

  return (
    <SongListContainer>
      <h1>Song List</h1>
      <ActionButton onClick={() => setIsAddOpen(true)}>Add New Song</ActionButton>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {songs.map((song) => (
        <SongCard key={song._id}>
          <h3>{song.title}</h3>
          <p>Artist: {song.artist}</p>
          <p>Genre: {song.genre}</p>
          <p>Album: {song.album}</p>
          <SongActions>
            <ActionButton onClick={() => setSelectedSong(song)}>Edit</ActionButton>
            <ActionButton onClick={() => handleDelete(song._id)}>Delete</ActionButton>
          </SongActions>
        </SongCard>
      ))}
      {isAddOpen && (
        <AddSongModal
          onClose={() => setIsAddOpen(false)}
          onSubmit={handleAdd}
        />
      )}
      {selectedSong && (
        <AddSongModal
          song={selectedSong}
          onClose={() => setSelectedSong(null)}
          onSubmit={handleEdit}
        />
      )}
    </SongListContainer>
  );
};

export default SongList;
