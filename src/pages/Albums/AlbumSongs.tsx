/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchAlbumsSongs } from '../../redux/slices/albumSlice';
import styled from '@emotion/styled';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const AlbumName = styled.h1`
  font-size: 28px;
  color: #2c3e50;
`;

const Divider = styled.hr`
  height: 1px;
  background-color: #7f8c8d;
  border: none;
  margin: 20px 0;
`;

const SongList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SongItem = styled.li`
  padding: 15px 0;
  border-bottom: 1px solid #ecf0f1;
  display: flex;
  flex-direction: column;
`;

const SongTitle = styled.span`
  font-size: 20px;
  color: #34495e;
  font-weight: bold;
`;

const SongDetails = styled.span`
  font-size: 16px;
  color: #7f8c8d;
  margin-top: 5px;
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 40px;
  color: #95a5a6;
  font-size: 14px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #2980b9;
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #e74c3c;
  margin-top: 20px;
`;

const NoSongsMessage = styled.p`
  text-align: center;
  font-size: 16px;
  color: #95a5a6;
  margin-top: 20px;
`;

const AlbumSongs: React.FC = () => {
  const { albumName } = useParams<{ albumName: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { musicIntheAlbum, loading, error } = useSelector((state: RootState) => state.albums);

  useEffect(() => {
    if (albumName) {
      dispatch(fetchAlbumsSongs(albumName));
    }
  }, [dispatch, albumName]);

  return (
    <PageContainer>
      <Header>
        <AlbumName>Songs in "{albumName}"</AlbumName>
        <Divider />
      </Header>

      {loading && <LoadingMessage>Loading songs...</LoadingMessage>}
      {error && <ErrorMessage>Error: {error}</ErrorMessage>}
      {!loading && musicIntheAlbum.length === 0 && <NoSongsMessage>No songs found for this album.</NoSongsMessage>}

      {musicIntheAlbum.length > 0 && (
        <SongList>
          {musicIntheAlbum.map((song) => (
            <SongItem key={song.title}>
              <SongTitle>{song.title}</SongTitle>
              <SongDetails>Artist: {song.artist}</SongDetails>
              <SongDetails>Genre: {song.genre}</SongDetails>
            </SongItem>
          ))}
        </SongList>
      )}

      <Footer>End of Songs</Footer>
    </PageContainer>
  );
};

export default AlbumSongs;
