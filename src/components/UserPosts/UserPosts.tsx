import React from 'react';
import { useParams } from 'react-router';
import { Container, Typography } from '@mui/material';
import { useGetUserQuery, useGetUserPostsQuery } from '../../services/api';
import { LoadingState, ErrorState, EmptyState } from '../Common';
import UserForm from '../Users/UserForm/UserForm';
import PostsList from './PostsList';

const UserPosts: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const { data: user, error: userError, isLoading: userLoading } = useGetUserQuery(userId || '');
    const { data: posts, error: postsError, isLoading: postsLoading } = useGetUserPostsQuery(userId || '');

    if (userLoading || postsLoading) {
        return <LoadingState message="Loading posts..." />;
    }

    if (userError || postsError) {
        return <ErrorState message="Error loading posts" />;
    }

    if (!user) {
        return <EmptyState title="User not found" />;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
                Posts for {user.name}
            </Typography>

            <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 3 }}>
                User Details
            </Typography>

            <UserForm user={user} hidePostsButton={true} />

            <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
                Posts ({posts?.length || 0})
            </Typography>

            {!posts || posts.length === 0 ? (
                <EmptyState title="No Posts Found" message="This user hasn't created any posts yet." minHeight="200px" />
            ) : (
                <PostsList posts={posts} userId={parseInt(userId || '0', 10)} />
            )}
        </Container>
    );
};

export default UserPosts;
