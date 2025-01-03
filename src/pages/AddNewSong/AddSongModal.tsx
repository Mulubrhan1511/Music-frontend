import React, { useState } from 'react';
import styled from '@emotion/styled';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  margin-left: 8px;
  cursor: pointer;
  &:first-of-type {
    background-color: #ddd;
    color: #333;
  }
  &:last-of-type {
    background-color: #007bff;
    color: #fff;
    &:hover {
      background-color: #0056b3;
    }
  }
`;

const AddSongModal: React.FC<{
  song?: any;
  onClose: () => void;
  onSubmit: (song: any) => void;
}> = ({ song, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(
    song || { title: '', artist: '', genre: '', album: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{song ? 'Edit Song' : 'Add New Song'}</h2>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <Input
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          placeholder="Artist"
        />
        <Input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
        />
        <Input
          name="album"
          value={formData.album}
          onChange={handleChange}
          placeholder="Album"
        />
        <ButtonGroup>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddSongModal;
