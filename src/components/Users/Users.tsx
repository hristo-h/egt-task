import React from 'react';
import { useGetUsersQuery } from '../../services/api';
import { Box, Accordion, AccordionDetails, AccordionSummary, Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TaskIcon from '@mui/icons-material/Task';
import { LoadingState, ErrorState } from '../Common';
import UserForm from './UserForm/UserForm';

const Users: React.FC = () => {
    const { data, error, isLoading } = useGetUsersQuery('');

    if (isLoading) return <LoadingState message="Loading users..." minHeight="200px" />;
    if (error) return <ErrorState message="Error loading users" minHeight="200px" />;

    return (
        <Container>
            <Box sx={{ mt: 3, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">Users List</Typography>
                <Button 
                    component={Link} 
                    to="/tasks" 
                    variant="contained" 
                    color="primary"
                    startIcon={<TaskIcon />}
                >
                    View Tasks
                </Button>
            </Box>
            {data?.map(user => 
                <Box sx={{mb: 2, mt: 2}} key={`${user.username}-${user.id}`}>
                    <Accordion>
                    <AccordionSummary 
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls={`user-${user.username}-content`}
                        id={`user-${user.username}-header`}
                    >
                        <Typography variant="body1">
                        {user.name}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <UserForm
                        user={user}
                        />
                    </AccordionDetails>
                    </Accordion>
                </Box>)
            }
        </Container>
    );
}

export default Users
