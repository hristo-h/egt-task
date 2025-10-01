import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { Users } from './components/Users';

function App() {
    return (
        <>
            <CssBaseline />
            <div className="App">
                <Users />
            </div>
        </>
    );
}

export default App;
