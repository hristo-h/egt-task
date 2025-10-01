import React from 'react';
import { TextField, Paper, Typography } from '@mui/material';
import { User } from '../../../types';

interface PersonalInfoSectionProps {
    user: { id: number };
    currentUserData: User;
    onFieldChange: (field: string, value: string) => void;
    getValidationError: (field: string) => string;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
    user,
    currentUserData,
    onFieldChange,
    getValidationError,
}) => {
    return (
        <Paper elevation={1} sx={{ p: 2, mb: 3, display: 'flex', flexWrap: 'wrap' }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{textAlign: "left", flexBasis: '100%'}}>
                Personal Information
            </Typography>
            <TextField
                required
                id={`user.username-${user.id}`}
                label="Username"
                value={currentUserData.username}
                onChange={(e) => onFieldChange('username', e.target.value)}
                error={Boolean(getValidationError('username'))}
                helperText={getValidationError('username')}
            />
            <TextField
                id={`user.name-${user.id}`}
                label="Name"
                value={currentUserData.name}
                onChange={(e) => onFieldChange('name', e.target.value)}
            />
            <TextField
                required
                id={`user.email-${user.id}`}
                label="Email"
                type="email"
                value={currentUserData.email}
                onChange={(e) => onFieldChange('email', e.target.value)}
                error={Boolean(getValidationError('email'))}
                helperText={getValidationError('email')}
            />
            <TextField
                id={`user.phone-${user.id}`}
                label="Phone"
                value={currentUserData.phone}
                onChange={(e) => onFieldChange('phone', e.target.value)}
            />
            <TextField
                id={`user.website-${user.id}`}
                label="Website"
                value={currentUserData.website}
                onChange={(e) => onFieldChange('website', e.target.value)}
            />
        </Paper>
    );
};

export default PersonalInfoSection;
