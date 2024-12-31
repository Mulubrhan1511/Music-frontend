import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchArtistsSongs } from '../../redux/slices/artistSlice';

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #343a40;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
`;

const SongList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SongItem = styled.li`
  background-color: #ffffff;
  margin: 0.5rem 0;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const SongTitle = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #007bff;
`;

const SongDetails = styled.span`
  font-size: 0.9rem;
  color: #6c757d;
`;

const NoSongsMessage = styled.p`
  font-size: 1.2rem;
  color: #6c757d;
  margin-top: 2rem;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:disabled {
    background-color: #ced4da;
    cursor: not-allowed;
  }
`;

// Main Component
const ArtistSongs = () => {
  const { artistName } = useParams<{ artistName: string }>();
  const dispatch: AppDispatch = useDispatch();
  const musicByArtist = useSelector((state: RootState) => state.artists.musicByArtist);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 5;

  useEffect(() => {
    if (artistName) {
      dispatch(fetchArtistsSongs(artistName));
    }
  }, [dispatch, artistName]);

  const filteredSongs = musicByArtist.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);
  const currentSongs = filteredSongs.slice(
    (currentPage - 1) * songsPerPage,
    currentPage * songsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container>
      <Title>Songs by {artistName}</Title>
      <SearchInput
        type="text"
        placeholder="Search songs by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {currentSongs.length > 0 ? (
        <>
          <SongList>
            {currentSongs.map((song, index) => (
              <SongItem key={index}>
                <SongTitle>{song.title}</SongTitle>
                <SongDetails>
                  Album: {song.album} | Genre: {song.genre}
                </SongDetails>
              </SongItem>
            ))}
          </SongList>
          <PaginationControls>
            <PaginationButton
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </PaginationButton>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <PaginationButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </PaginationButton>
          </PaginationControls>
        </>
      ) : (
        <NoSongsMessage>No songs match your search.</NoSongsMessage>
      )}
    </Container>
  );
};

export default ArtistSongs;
