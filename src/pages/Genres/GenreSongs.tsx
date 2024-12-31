import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { fetchGenresSongs } from '../../redux/slices/genresSlice';
import styled from '@emotion/styled';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  text-align: center;
  color: #343a40;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 300px;
  margin: 1rem 0;
`;

const SongListContainer = styled.div`
  margin-top: 1rem;
`;

const SongItem = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const SongTitle = styled.h3`
  color: #007bff;
`;

const SongDetails = styled.p`
  color: #555;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }

  &.disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.span`
  margin: 0 0.5rem;
  font-size: 1rem;
  color: #343a40;
`;

const GenreSongs = () => {
  const { genreName } = useParams<{ genreName: string }>();
  const dispatch: AppDispatch = useDispatch();
  const musicByGenre = useSelector((state: any) => state.genres.musicByGenre);
  const isLoading = useSelector((state: any) => state.genres.isLoading);
  const error = useSelector((state: any) => state.genres.error);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    if (genreName) {
      dispatch(fetchGenresSongs(genreName));
    }
  }, [dispatch, genreName]);

  // Filter songs based on search query
  const filteredSongs = musicByGenre.filter((song: any) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredSongs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSongs = filteredSongs.slice(startIndex, startIndex + itemsPerPage);

  console.log('Filtered Songs:', filteredSongs); // Debugging line
  console.log('Current Songs:', currentSongs); // Debugging line

  return (
    <Container>
      <Header>{genreName} Songs</Header>
      <SearchInput
        type="text"
        placeholder="Search songs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {isLoading ? (
        <p>Loading songs...</p>
      ) : error ? (
        <p>Error loading songs: {error}</p>
      ) : (
        <SongListContainer>
          {filteredSongs.length === 0 ? (
            <p>No songs found for "{searchQuery}"</p>
          ) : (
            currentSongs.map((song: any) => (
              <SongItem key={song.title}>
                <SongTitle>{song.title}</SongTitle>
                <SongDetails>{song.artist}</SongDetails>
                <SongDetails>{song.album}</SongDetails>
              </SongItem>
            ))
          )}
        </SongListContainer>
      )}

      {/* Pagination Controls */}
      <PaginationContainer>
        <PageButton
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={currentPage === 1 ? 'disabled' : ''}
        >
          Previous
        </PageButton>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PageNumber
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            style={{
              cursor: 'pointer',
              fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
            }}
          >
            {index + 1}
          </PageNumber>
        ))}
        <PageButton
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className={currentPage === totalPages ? 'disabled' : ''}
        >
          Next
        </PageButton>
      </PaginationContainer>
    </Container>
  );
};

export default GenreSongs;
