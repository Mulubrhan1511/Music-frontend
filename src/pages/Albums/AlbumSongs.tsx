import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchAlbumsSongs } from '../../redux/slices/albumSlice';

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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const PageButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid #007bff;
  background-color: ${(props) => (props.active ? '#007bff' : '#ffffff')};
  color: ${(props) => (props.active ? '#ffffff' : '#007bff')};
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
    color: #ffffff;
  }
`;

const AlbumSongs = () => {
  const { albumName } = useParams<{ albumName: string }>();
  const dispatch: AppDispatch = useDispatch();
  const musicInAlbum = useSelector((state: RootState) => state.albums.musicIntheAlbum);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 5;

  useEffect(() => {
    if (albumName) {
      dispatch(fetchAlbumsSongs(albumName));
    }
  }, [dispatch, albumName]);

  const filteredSongs = musicInAlbum.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);
  const currentSongs = filteredSongs.slice(
    (currentPage - 1) * songsPerPage,
    currentPage * songsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Title>Songs in Album: {albumName}</Title>
      <SearchInput
        type="text"
        placeholder="Search songs by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {currentSongs.length > 0 ? (
        <SongList>
          {currentSongs.map((song, index) => (
            <SongItem key={index}>
              <SongTitle>{song.title}</SongTitle>
              <SongDetails>Genre: {song.genre}</SongDetails>
            </SongItem>
          ))}
        </SongList>
      ) : (
        <NoSongsMessage>No songs match your search.</NoSongsMessage>
      )}
      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i + 1}
            active={currentPage === i + 1}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </PageButton>
        ))}
      </PaginationContainer>
    </Container>
  );
};

export default AlbumSongs;
