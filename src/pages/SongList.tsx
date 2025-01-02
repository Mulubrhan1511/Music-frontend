import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { addSong } from '../redux/slices/songSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';

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

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const AddButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Header = styled.h1`
  margin: 0;
  color: #343a40;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const TableHeader = styled.th`
  background-color: #343a40;
  color: white;
  padding: 0.75rem;
  text-align: left;
  border: 1px solid #dee2e6;
`;

const TableRow = styled.tr`
  &:nth-of-type(odd) {
    background-color: #f8f9fa;
  }

  &:nth-of-type(even) {
    background-color: #ffffff;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border: 1px solid #dee2e6;
`;

const ActionCell = styled.td`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #343a40;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    color: #007bff;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PaginationButton = styled.button`
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const AddSongModal = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [album, setAlbum] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addSong({ 
      title,
      artist,
      genre,
      album,
    }));
    onClose();
  };

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalHeader>Add New Song</ModalHeader>
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
          <SubmitButton type="submit">Add Song</SubmitButton>
        </form>
      </ModalContainer>
    </Overlay>
  );
};

const SongList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { songs, loading, error } = useSelector((state: RootState) => state.songs);
  const navigate = useNavigate();
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  // State for search filters and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAlbum, setFilterAlbum] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [filterArtist, setFilterArtist] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Change to 10, 20, or 5 as needed

  useEffect(() => {
    dispatch({ type: 'songs/fetchSongs' });
  }, [dispatch]);

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'songs/deleteSong', payload: id });
  };

  // Filtering and sorting logic
  const filteredSongs = songs
    .filter((song) => {
      return (
        (filterAlbum ? song.album.toLowerCase().includes(filterAlbum.toLowerCase()) : true) &&
        (filterGenre ? song.genre.toLowerCase().includes(filterGenre.toLowerCase()) : true) &&
        (filterArtist ? song.artist.toLowerCase().includes(filterArtist.toLowerCase()) : true) &&
        (searchTerm ? song.title.toLowerCase().includes(searchTerm.toLowerCase()) : true)
      );
    })
    .sort((a, b) => {
      // Sort by createdAt if available, otherwise by title
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA || a.title.localeCompare(b.title);
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredSongs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSongs = filteredSongs.slice(startIndex, startIndex + itemsPerPage);
  const renderPagination = () => {
    const pageNumbers = [];
    
    // Show first page
    if (currentPage > 1) {
      pageNumbers.push(1);
    }
    
    // Show ellipsis if needed
    if (currentPage > 3) {
      pageNumbers.push('...');
    }
    
    // Show pages around the current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pageNumbers.push(i);
    }
    
    // Show last page
    if (currentPage < totalPages - 1) {
      pageNumbers.push(totalPages);
    }
    
    return (
      <>
        {pageNumbers.map((number, index) => (
          <PaginationButton
            key={index}
            onClick={() => {
              if (typeof number === 'number') {
                setCurrentPage(number);
              }
            }}
            disabled={number === '...' || currentPage === number}
          >
            {number}
          </PaginationButton>
        ))}
      </>
    );
  };
  
  

  return (
    <Container>
      <HeaderContainer>
        <Header>Song List</Header>
        <AddButton onClick={() => setIsAddOpen(true)}>Add Song</AddButton>
      </HeaderContainer>
      {isAddOpen && <AddSongModal onClose={() => setIsAddOpen(false)} />}
      
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchInput
          type="text"
          placeholder="Filter by Album"
          value={filterAlbum}
          onChange={(e) => setFilterAlbum(e.target.value)}
        />
        <SearchInput
          type="text"
          placeholder="Filter by Genre"
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
        />
        <SearchInput
          type="text"
          placeholder="Filter by Artist"
          value={filterArtist}
          onChange={(e) => setFilterArtist(e.target.value)}
        />
      </SearchContainer>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Title</TableHeader>
              <TableHeader>Artist</TableHeader>
              <TableHeader>Genre</TableHeader>
              <TableHeader>Album</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {currentSongs.map((song) => (
              <TableRow key={song.id}>
                <TableCell>{song.title}</TableCell>
                <TableCell>{song.artist}</TableCell>
                <TableCell>{song.genre}</TableCell>
                <TableCell>{song.album}</TableCell>
                <ActionCell>
                  <IconButton onClick={() => handleEdit(song?.id || '')}>
                    <FaEdit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(song?.id || '')}>
                    <FaTrash />
                  </IconButton>
                </ActionCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}

<PaginationContainer>
        <PaginationButton 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>
        
        {renderPagination()}

        <PaginationButton 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      </PaginationContainer>
    </Container>
  );
};

export default SongList;
