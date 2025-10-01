import React from 'react';
import { TextField, Paper, Typography } from '@mui/material';
import { User } from '../../../types';

interface CompanyInfoSectionProps {
    user: { id: number };
    currentUserData: User;
    onFieldChange: (field: string, value: string) => void;
}

const CompanyInfoSection: React.FC<CompanyInfoSectionProps> = ({
    user,
    currentUserData,
    onFieldChange,
}) => {
    return (
        <Paper elevation={1} sx={{ p: 2, mb: 3, display: 'flex', flexWrap: 'wrap' }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{textAlign: "left", flexBasis: '100%'}}>
                Company Information
            </Typography>
            <TextField
                id={`company.name-${user.id}`}
                label="Company Name"
                value={currentUserData.company?.name || ''}
                onChange={(e) => onFieldChange('company.name', e.target.value)}
            />
            <TextField
                id={`company.bs-${user.id}`}
                label="Tags"
                value={currentUserData.company?.bs || ''}
                onChange={(e) => onFieldChange('company.bs', e.target.value)}
            />
            <TextField
                id={`company.catchPhrase-${user.id}`}
                label="Catchphrase"
                value={currentUserData.company?.catchPhrase || ''}
                onChange={(e) => onFieldChange('company.catchPhrase', e.target.value)}
            />
        </Paper>
    );
};

export default CompanyInfoSection;
