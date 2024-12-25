import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const SongList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const songs = useSelector((state: RootState) => state.songs.songs);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: 'songs/fetchSongs' });
    }, [dispatch]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    return (
        <div>
            <h1>Song List</h1>
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        {song.title} by {song.artist} ({song.genre})
                    </li>
                ))}
            </ul>
            <button onClick={handleLogout}>Logout</button>;
        </div>
    );
};

export default SongList;
