import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

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

const SearchBar = styled.input`
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
`;

const AlbumsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const AlbumCard = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ArtistName = styled.h2`
  font-size: 1.25rem;
  color: #007bff;
  margin-bottom: 0.5rem;
`;

const AlbumTitle = styled.p`
  font-size: 1rem;
  color: #6c757d;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #0056b3;
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

const Albums: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const albums = useSelector((state: RootState) => state.albums.albums);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch({ type: 'albums/fetchAlbums' }); // Ensure this action is implemented
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  // Filter albums based on the search term
  const filteredAlbums = albums.filter((album) =>
    album?.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album?.album.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination details
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = filteredAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);
  const totalPages = Math.ceil(filteredAlbums.length / albumsPerPage);

  const handleAlbumClick = (albumName: string) => {
    navigate(`/albums/${albumName}`);
  }

  return (
    <Container>
      <Header>Albums</Header>

      <SearchBar
        type="text"
        placeholder="Search albums or artists..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {currentAlbums.length > 0 ? (
        <AlbumsGrid>
          {currentAlbums.map((album, index) => (
            <AlbumCard 
            key={index}
            onClick={() => handleAlbumClick(album?.album)}
            >
              <ArtistName>
                <FontAwesomeIcon icon={faMusic} style={{ marginRight: '8px' }} />
                {album?.artist}
              </ArtistName>
              <AlbumTitle>{album?.album}</AlbumTitle>
            </AlbumCard>
          ))}
        </AlbumsGrid>
      ) : (
        <p>No albums found.</p>
      )}

      <PaginationControls>
        <PageButton
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PageButton>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <PageButton
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PageButton>
      </PaginationControls>

      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Container>
  );
};

export default Albums;
