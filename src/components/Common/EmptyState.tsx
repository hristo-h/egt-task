import React from 'react';
import { Container, Typography, Box } from '@mui/material';

interface EmptyStateProps {
    title: string;
    message?: string;
    minHeight?: string | number;
    children?: React.ReactNode; // For action buttons
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
    title,
    message,
    minHeight = '300px',
    children 
}) => {
    return (
        <Container sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight, 
            textAlign: 'center' 
        }}>
            <Typography variant="h5" color="error" sx={{ mb: message || children ? 2 : 0 }}>
            {title}
            </Typography>
            {message && (
            <Typography variant="body1" sx={{ mb: children ? 2 : 0 }}>
                {message}
            </Typography>
            )}
            {children && (
            <Box>
                {children}
            </Box>
            )}
        </Container>
    );
};

export default EmptyState;
