import React from 'react';
import { useParams, Link } from 'react-router';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useGetUserQuery } from '../../services/api';
import { LoadingState, ErrorState, EmptyState } from '../Common';
import UserForm from './UserForm/UserForm';

const UserDetail: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const { data: user, error, isLoading } = useGetUserQuery(userId || '');

    if (isLoading) {
        return <LoadingState message="Loading user..." />;
    }

    if (error) {
        return <ErrorState message="Error loading user" />;
    }

    if (!user) {
        return (
            <EmptyState title="User not found">
                <Button component={Link} to="/" variant="outlined" startIcon={<ArrowBackIcon />}>
                    Back to Users List
                </Button>
            </EmptyState>
        );
    }

    return (
        <Container>
            <Box sx={{ mt: 3, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button component={Link} to="/" variant="outlined" startIcon={<ArrowBackIcon />}>
                    Back to Users List
                </Button>
                <Typography variant="h4">
                    Edit User: {user.name}
                </Typography>
            </Box>
            <Paper elevation={2} sx={{ p: 3 }}>
                <UserForm user={user} />
            </Paper>
        </Container>
    );
};

export default UserDetail;
