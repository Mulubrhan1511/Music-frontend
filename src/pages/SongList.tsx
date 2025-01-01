import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaEdit, FaTrash } from 'react-icons/fa';

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

const ActionCell = styled.td`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #343a40;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    color: #007bff;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  background-color: #343a40;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #007bff;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LoadingIndicator = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #007bff;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #dc3545;
  font-size: 1.2rem;
`;

const SongList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { songs, loading, error } = useSelector((state: RootState) => state.songs);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [artistFilter, setArtistFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    dispatch({ type: 'songs/fetchSongs' });
  }, [dispatch]);

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'songs/deleteSong', payload: id });
  };

  const filteredSongs = songs
    .filter((song) =>
      searchQuery ? song.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
    )
    .filter((song) => (genreFilter ? song.genre === genreFilter : true))
    .filter((song) => (artistFilter ? song.artist === artistFilter : true));

  const totalPages = Math.ceil(filteredSongs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSongs = filteredSongs.slice(startIndex, startIndex + itemsPerPage);

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

      {loading ? (
        <LoadingIndicator>Loading songs...</LoadingIndicator>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
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
              {currentSongs.map((song) => (
                <TableRow key={song.id}>
                  <TableCell>{song.title}</TableCell>
                  <TableCell>{song.artist}</TableCell>
                  <TableCell>{song.genre}</TableCell>
                  <ActionCell>
                    <IconButton onClick={() => handleEdit(song.id)}>
                      <FaEdit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(song.id)}>
                      <FaTrash />
                    </IconButton>
                  </ActionCell>
                </TableRow>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <PaginationButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </PaginationButton>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <PaginationButton
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </PaginationButton>
          </Pagination>
        </>
      )}
    </Container>
  );
};

export default SongList;
