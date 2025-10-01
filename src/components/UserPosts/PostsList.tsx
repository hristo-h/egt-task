import React, { useState, useCallback } from 'react';
import { 
    Box, 
    Card, 
    CardContent, 
    Typography, 
    Button, 
    TextField, 
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText
} from '@mui/material';
import { useUpdatePostMutation, useDeletePostMutation } from '../../services/api';
import { Post } from '../../types';

interface PostsListProps {
    posts: Post[];
    userId: number;
}

const PostsList: React.FC<PostsListProps> = ({ posts, userId }) => {
    const [editingPost, setEditingPost] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<number | null>(null);

    const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
    const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

    const handleEditStart = useCallback((post: Post) => {
        setEditingPost(post.id);
        setEditTitle(post.title);
        setEditBody(post.body);
    }, []);

    const handleEditCancel = useCallback(() => {
        setEditingPost(null);
        setEditTitle('');
        setEditBody('');
    }, []);

    const handleEditSave = useCallback(async (postId: number) => {
        updatePost({
            id: postId,
            userId,
            title: editTitle,
            body: editBody,
        });

        setEditingPost(null);
        setEditTitle('');
        setEditBody('');
    }, [updatePost, userId, editTitle, editBody]);

    const handleDeleteClick = useCallback((postId: number) => {
        setPostToDelete(postId);
        setDeleteDialogOpen(true);
    }, []);

    const handleDeleteConfirm = useCallback(() => {
        if (postToDelete) {
            deletePost({ id: postToDelete, userId });

            setDeleteDialogOpen(false);
            setPostToDelete(null);
        }
    }, [deletePost, postToDelete, userId]);

    const handleDeleteCancel = useCallback(() => {
        setDeleteDialogOpen(false);
        setPostToDelete(null);
    }, []);

    return (
        <Box>
            {posts.map((post) => (
                <Card key={post.id} sx={{ mb: 2 }}>
                    <CardContent>
                        {editingPost === post.id ? (
                            // Edit mode
                            <Box>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Body"
                                    value={editBody}
                                    onChange={(e) => setEditBody(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => handleEditSave(post.id)}
                                        disabled={isUpdating || !editTitle.trim() || !editBody.trim()}
                                    >
                                        {isUpdating ? 'Saving...' : 'Save'}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={handleEditCancel}
                                        disabled={isUpdating}
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </Box>
                        ) : (
                            // View mode
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" paragraph>
                                    {post.body}
                                </Typography>
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleEditStart(post)}
                                        size="small"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDeleteClick(post.id)}
                                        size="small"
                                        disabled={isDeleting}
                                    >
                                        Delete
                                    </Button>
                                </Stack>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            ))}

            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this post? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Cancel</Button>
                    <Button 
                        onClick={handleDeleteConfirm} 
                        color="error" 
                        variant="contained"
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PostsList;
