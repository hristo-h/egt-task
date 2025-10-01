import React from 'react';
import { Container, Typography } from '@mui/material';

interface LoadingStateProps {
    message?: string;
    minHeight?: string | number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
    message = 'Loading...', 
    minHeight = '300px' 
}) => {
    return (
        <Container sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight 
        }}>
            <Typography variant="body1">{message}</Typography>
        </Container>
    );
};

export default LoadingState;
