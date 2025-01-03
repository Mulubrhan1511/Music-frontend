/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #3b5998;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 20px auto;
  display: block;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const AlbumList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const AlbumItem = styled.li`
  background-color: #f9f9f9;
  margin: 10px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 200px;
`;

const AlbumTitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
`;

const ArtistName = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const ViewButton = styled.button`
  background-color: #3b5998;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #29487d;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    background-color: #3b5998;
    color: white;
    border: none;
    padding: 8px 12px;
    margin: 0 5px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #29487d;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

const LoadingText = styled.p`
  text-align: center;
  color: #3b5998;
  font-weight: bold;
`;

const Albums: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { albums, loading, error } = useSelector((state: RootState) => state.albums);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'albums/fetchAlbums' });
  }, [dispatch]);

  const handleAlbumClick = (albumName: string) => {
    navigate(`/albums/${albumName}`);
  };

  const filteredAlbums = albums.filter((album) =>
    album.album.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAlbums.length / itemsPerPage);
  const currentAlbums = filteredAlbums.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Container>
      <Title>Albums</Title>
      <SearchBar
        type="text"
        placeholder="Search albums..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <AlbumList>
        {currentAlbums.map((album) => (
          <AlbumItem key={album.album}>
            <AlbumTitle>{album.album}</AlbumTitle>
            <ArtistName>Artist: {album.artist}</ArtistName>
            <ViewButton onClick={() => handleAlbumClick(album.album)}>
              View Album
            </ViewButton>
          </AlbumItem>
        ))}
      </AlbumList>
      {loading && <LoadingText>Loading...</LoadingText>}
      {error && <p>Error: {error}</p>}
      <Pagination>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </Pagination>
    </Container>
  );
};

export default Albums;
