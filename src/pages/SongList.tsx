import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  text-align: center;
  color: #343a40;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 300px;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-left: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const TableHeader = styled.th`
  background-color: #343a40;
  color: white;
  padding: 0.75rem;
  text-align: left;
  border: 1px solid #dee2e6;
`;

const TableRow = styled.tr`
  &:nth-of-type(odd) {
    background-color: #f8f9fa;
  }

  &:nth-of-type(even) {
    background-color: #ffffff;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border: 1px solid #dee2e6;
`;

const ActionButton = styled.button`
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &.edit {
    background-color: #007bff;
    color: white;

    &:hover {
      background-color: #0056b3;
    }
  }

  &.delete {
    background-color: #dc3545;
    color: white;

    &:hover {
      background-color: #c82333;
    }
  }
`;

const LogoutButton = styled.button`
  margin: 2rem auto;
  display: block;
  padding: 0.75rem 1.5rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #ff6666;
  }
`;

const SongList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.songs);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [artistFilter, setArtistFilter] = useState('');

  useEffect(() => {
    dispatch({ type: 'songs/fetchSongs' });
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const handleEdit = (id: string) => {
    console.log(`Editing song with id: ${id}`);
    // Add edit logic here
  };

  const handleDelete = (id: string) => {
    console.log(`Deleting song with id: ${id}`);
    // Add delete logic here
  };

  const filteredSongs = songs
    .filter((song) =>
      searchQuery ? song.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
    )
    .filter((song) => (genreFilter ? song.genre === genreFilter : true))
    .filter((song) => (artistFilter ? song.artist === artistFilter : true));

  return (
    <Container>
      <Header>Song List</Header>

      <FiltersContainer>
        <SearchInput
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>
          <FilterSelect
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            <option value="">All Genres</option>
            {Array.from(new Set(songs.map((song) => song.genre))).map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect
            value={artistFilter}
            onChange={(e) => setArtistFilter(e.target.value)}
          >
            <option value="">All Artists</option>
            {Array.from(new Set(songs.map((song) => song.artist))).map((artist) => (
              <option key={artist} value={artist}>
                {artist}
              </option>
            ))}
          </FilterSelect>
        </div>
      </FiltersContainer>

      <Table>
        <thead>
          <tr>
            <TableHeader>Title</TableHeader>
            <TableHeader>Artist</TableHeader>
            <TableHeader>Genre</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredSongs.map((song) => (
            <TableRow key={song.id}>
              <TableCell>{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>{song.genre}</TableCell>
              <TableCell>
                <ActionButton className="edit" onClick={() => handleEdit(song.id)}>
                  Edit
                </ActionButton>
                <ActionButton className="delete" onClick={() => handleDelete(song.id)}>
                  Delete
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Container>
  );
};

export default SongList;
