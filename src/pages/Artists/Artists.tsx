import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaUserAlt } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #343a40;
  margin-bottom: 1.5rem;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const ArtistList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ArtistCard = styled.li`
  background-color: #ffffff;
  padding: 1.5rem;
  width: 200px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ArtistIcon = styled(FaUserAlt)`
  font-size: 3rem;
  color: #007bff;
  margin-bottom: 1rem;
`;

const ArtistName = styled.h2`
  font-size: 1.25rem;
  color: #343a40;
  margin: 0;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 0.5rem;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: ${({ active }) => (active ? 'white' : '#007bff')};
  background-color: ${({ active }) => (active ? '#007bff' : 'transparent')};
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#e9ecef')};
  }
`;

const Artists = () => {
  const dispatch: AppDispatch = useDispatch();
  const { artists, loading, error } = useSelector((state: RootState) => state.artists);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredArtists = artists.filter((artist) =>
    artist.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredArtists.length / itemsPerPage);
  const displayedArtists = filteredArtists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    dispatch({ type: 'artists/fetchArtists' }); // Ensure this action is implemented
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleArtistClick = (artistName: string) => {
    navigate(`/artist-songs/${artistName}`);
  };

  

  return (
    <Container>
      <Title>Artists</Title>
      <SearchBar
        type="text"
        placeholder="Search artists..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching artists</p>}
      {
        artists.length === 0 && !loading && !error && <p>No artists found</p>
      }

      {
        artists.length > 0 && (
          <>
          <ArtistList>
        {displayedArtists.map((artist) => (
          <ArtistCard
            key={artist.artist}
            onClick={() => handleArtistClick(artist.artist)}
          >
            <ArtistIcon />
            <ArtistName>{artist.artist}</ArtistName>
          </ArtistCard>
        ))}
      </ArtistList>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index}
            active={index + 1 === currentPage}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
          </>
        )
      }
    </Container>
  );
};

export default Artists;
