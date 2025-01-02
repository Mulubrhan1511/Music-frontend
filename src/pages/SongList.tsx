import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { addSong, updateSong } from '../redux/slices/songSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddSongModal from './AddNewSong/AddSongModal'; // Import the modal

// Styled components
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

const SongList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { songs, loading, error } = useSelector((state: RootState) => state.songs);
  const navigate = useNavigate();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<any>(null);
  
  // State for search filters and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAlbum, setFilterAlbum] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [filterArtist, setFilterArtist] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    dispatch({ type: 'songs/fetchSongs' });
  }, [dispatch]);

  const handleEdit = (song: any) => {
    setSelectedSong(song);
    setIsEditOpen(true);
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
      {isEditOpen && <AddSongModal onClose={() => { setIsEditOpen(false); setSelectedSong(null); }} song={selectedSong} />}
      
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
                <IconButton onClick={() => handleEdit(song)}>
                  <FaEdit />
                </IconButton>
                <IconButton onClick={() => song.id && handleDelete(song.id)}>
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
