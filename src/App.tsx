import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SongList from './pages/SongList';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Artists from './pages/Artists/Artists';
import Albums from './pages/Albums/Albums';
import Genres from './pages/Genres/Genres';
import GlobalStyles from './GlobalStyles';
import ArtistSongs from './pages/Artists/ArtistSongs';
import AlbumSongs from './pages/Albums/AlbumSongs';
import GenreSongs from './pages/Genres/GenreSongs';




const App: React.FC = () => {
    return (
        <>
            <GlobalStyles />
            <Router>
                <Routes>
                    {/* Protected Routes */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <SongList />
                            </ProtectedRoute>
                        }
                    />
                    

                    <Route path="/artists" element={
                        <ProtectedRoute>
                            <Artists />
                        </ProtectedRoute>
                    } />

                    <Route path="/artist-songs/:artistName" element={
                        <ProtectedRoute>
                            <ArtistSongs />
                        </ProtectedRoute>
                    }
                    />

                    <Route path='/albums' element={
                        <ProtectedRoute>
                            <Albums />
                        </ProtectedRoute>
                    } />

                    <Route
                    path="/albums/:albumName"
                    element={
                        <ProtectedRoute>
                        <AlbumSongs />
                        </ProtectedRoute>
                    }
                    />


                    <Route path='/genres' element={
                        <ProtectedRoute>
                            <Genres />
                        </ProtectedRoute>
                    }
                    />

                    <Route 
                    path='/genres/:genreName' element= {
                        <ProtectedRoute>
                            <GenreSongs />
                        </ProtectedRoute>
                    }
                    />



                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
