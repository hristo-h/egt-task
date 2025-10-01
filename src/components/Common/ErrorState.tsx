import React from 'react';
import { Container, Typography } from '@mui/material';

interface ErrorStateProps {
    message?: string;
    minHeight?: string | number;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
    message = 'Error loading data', 
    minHeight = '300px' 
}) => {
    return (
        <Container sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight 
        }}>
            <Typography variant="body1" color="error">{message}</Typography>
        </Container>
    );
};

export default ErrorState;
