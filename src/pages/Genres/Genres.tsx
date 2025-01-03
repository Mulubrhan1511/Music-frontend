import  { useEffect } from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { FaMusic, FaHeadphones, FaGuitar } from 'react-icons/fa'; // Example icons
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #343a40;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const GenreList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const GenreItem = styled.li`
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 1.2rem;
  color: #343a40;
  
  &:hover {
    background-color: #007bff;
    color: white;
    transform: translateY(-8px);
  }

  &:hover svg {
    transform: rotate(360deg);
    transition: transform 0.5s ease;
  }
`;

const GenreIcon = styled.div`
  font-size: 1.5rem;
  transition: transform 0.3s ease;
`;

const Genres = () => {
  const dispatch: AppDispatch = useDispatch();
  const {genres, loading, error} = useSelector((state: RootState) => state.genres);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'genres/fetchGenres' });
  }, [dispatch]);

  // Example genre mapping to icons. You can map this based on genre names or types
  const getGenreIcon = (genre: string) => {
    switch (genre.toLowerCase()) {
      case 'rock':
        return <FaGuitar />;
      case 'pop':
        return <FaMusic />;
      case 'electronic':
        return <FaHeadphones />;
      default:
        return <FaMusic />;
    }
  };

  const handleGenreClick = (genre: string) => {
    navigate(`/genres/${genre}`);
  }

  return (
    <Container>
      <Header>Genres</Header>
      {loading && <p>Loading genres...</p>}
      {error && <p>Error: {error}</p>}
      {
        genres && (
          <>
          <GenreList>
        {genres.map((genre) => (
          <GenreItem 
          key={genre.genre}
          
          onClick={() => handleGenreClick(genre.genre)}>
            <GenreIcon>{getGenreIcon(genre.genre)}</GenreIcon>
            {genre.genre}
          </GenreItem>
        ))}
      </GenreList>
          </>
        )
      }
    </Container>
  );
};

export default Genres;
