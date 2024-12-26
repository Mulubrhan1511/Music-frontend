import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SongList from './pages/SongList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AddNewSong } from './pages/AddNewSong/AddNewSong';
import Artists from './pages/Artists/Artists';
import Albums from './pages/Albums/Albums';
import Genres from './pages/Genres/Genres';
import GlobalStyles from './GlobalStyles';


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
                    <Route
                        path="/add-song"
                        element={
                            <ProtectedRoute>
                                <AddNewSong />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/artists" element={
                        <ProtectedRoute>
                            <Artists />
                        </ProtectedRoute>
                    } />

                    <Route path='/albums' element={
                        <ProtectedRoute>
                            <Albums />
                        </ProtectedRoute>
                    } />

                    <Route path='/genres' element={
                        <ProtectedRoute>
                            <Genres />
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
