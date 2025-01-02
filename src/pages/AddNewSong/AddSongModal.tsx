import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addSong, updateSong } from '../../redux/slices/songSlice';

// Styled components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalHeader = styled.h2`
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    color: #dc3545;
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background: #343a40;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #007bff;
  }
`;

const AddSongModal = ({ onClose, song }: { onClose: () => void; song?: any }) => {
    const [title, setTitle] = useState(song ? song.title : '');
    const [artist, setArtist] = useState(song ? song.artist : '');
    const [genre, setGenre] = useState(song ? song.genre : '');
    const [album, setAlbum] = useState(song ? song.album : '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true); // Disable the button
        if (song) {
            // Update existing song
            dispatch(updateSong({ 
                title,
                artist,
                genre,
                album,
            }));
        } else {
            // Add new song
            dispatch(addSong({ 
                title,
                artist,
                genre,
                album,
            }));
        }
        onClose();
    };

    return (
        <Overlay>
            <ModalContainer>
                <CloseButton onClick={onClose}>×</CloseButton>
                <ModalHeader>{song ? 'Edit Song' : 'Add New Song'}</ModalHeader>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="title"
                        placeholder="Song Title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        type="text"
                        name="artist"
                        placeholder="Artist"
                        required
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                    />
                    <Input
                        type="text"
                        name="genre"
                        placeholder="Genre"
                        required
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                    <Input
                        type="text"
                        name="album"
                        placeholder="Album"
                        required
                        value={album}
                        onChange={(e) => setAlbum(e.target.value)}
                    />
                    <SubmitButton type="submit" disabled={isSubmitting}>
                        {song ? 'Update Song' : 'Add Song'}
                    </SubmitButton>
                </form>
            </ModalContainer>
        </Overlay>
    );
};

export default AddSongModal;
