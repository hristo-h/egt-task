import React, { useState, useMemo } from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Switch,
    FormControlLabel,
    Chip,
    Button,
} from '@mui/material';
import { Link } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useGetTasksQuery, useGetUsersQuery, useGetUserMapQuery, useUpdateTaskMutation } from '../../services/api';
import { LoadingState, ErrorState, EmptyState } from '../Common';
import { Task } from '../../types';

const Tasks: React.FC = () => {
    const { data: tasks, error: tasksError, isLoading: tasksLoading } = useGetTasksQuery();
    const { data: users, error: usersError, isLoading: usersLoading } = useGetUsersQuery('');
    const { data: userMap, error: userMapError, isLoading: userMapLoading } = useGetUserMapQuery();
    const [updateTask] = useUpdateTaskMutation();

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10);

    // Filter state
    const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
    const [titleFilter, setTitleFilter] = useState('');
    const [userFilter, setUserFilter] = useState<number | 'all'>('all');

    const filteredTasks = useMemo(() => {
        if (!tasks) return [];

        return tasks.filter((task) => {
            // Status filter
            if (statusFilter === 'completed' && !task.completed) return false;
            if (statusFilter === 'incomplete' && task.completed) return false;

            // Title filter
            if (titleFilter && !task.title.toLowerCase().includes(titleFilter.toLowerCase())) {
                return false;
            }

            // User filter
            if (userFilter !== 'all' && task.userId !== userFilter) return false;

            return true;
        });
    }, [tasks, statusFilter, titleFilter, userFilter]);

    const paginatedTasks = useMemo(() => {
        const startIndex = page * rowsPerPage;
        return filteredTasks.slice(startIndex, startIndex + rowsPerPage);
    }, [filteredTasks, page, rowsPerPage]);

    const handleTaskStatusChange = async (task: Task) => {
        await updateTask({
            id: task.id,
            completed: !task.completed,
        });
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    if (tasksLoading || usersLoading || userMapLoading) {
        return <LoadingState message="Loading tasks..." />;
    }

    if (tasksError || usersError || userMapError) {
        return <ErrorState message="Error loading tasks" />;
    }

    // Empty state
    if (!tasks || tasks.length === 0) {
        return <EmptyState title="Tasks" message="No tasks found" />;
    }

    return (
        <Container>
            <Box sx={{ mt: 3, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button component={Link} to="/" variant="outlined" startIcon={<ArrowBackIcon />}>
                    Back to Users
                </Button>
                <Typography variant="h4">
                    Tasks
                </Typography>
            </Box>

            <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={statusFilter}
                        label="Status"
                        onChange={(e) => {
                            setStatusFilter(e.target.value as 'all' | 'completed' | 'incomplete');
                            setPage(0);
                        }}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="incomplete">Incomplete</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Search by title"
                    variant="outlined"
                    value={titleFilter}
                    onChange={(e) => {
                        setTitleFilter(e.target.value);
                        setPage(0);
                    }}
                    sx={{ minWidth: 200 }}
                />

                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>User</InputLabel>
                    <Select
                        value={userFilter}
                        label="User"
                        onChange={(e) => {
                            setUserFilter(e.target.value as number | 'all');
                            setPage(0);
                        }}
                    >
                        <MenuItem value="all">All Users</MenuItem>
                        {users?.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Typography variant="body2" color="text.secondary">
                    Showing {filteredTasks.length} of {tasks.length} tasks
                </Typography>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Owner</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedTasks.map((task) => (
                            <TableRow key={task.id} hover>
                                <TableCell>{task.id}</TableCell>
                                <TableCell sx={{ maxWidth: 400 }}>
                                    <Typography variant="body2">{task.title}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {userMap?.[task.userId] || `User ${task.userId}`}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={task.completed ? 'Completed' : 'Incomplete'}
                                        color={task.completed ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={task.completed}
                                                onChange={() => handleTaskStatusChange(task)}
                                                size="small"
                                            />
                                        }
                                        label={task.completed ? 'Complete' : 'Mark as complete'}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={filteredTasks.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10]}
            />
        </Container>
    );
};

export default Tasks;
