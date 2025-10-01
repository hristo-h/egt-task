import React from 'react';
import { TextField, Paper, Typography } from '@mui/material';
import { User } from '../../../types';

interface AddressInfoSectionProps {
    user: { id: number };
    currentUserData: User;
    onFieldChange: (field: string, value: string) => void;
    getValidationError: (field: string) => string;
}

const AddressInfoSection: React.FC<AddressInfoSectionProps> = ({
    user,
    currentUserData,
    onFieldChange,
    getValidationError,
}) => {
    return (
        <Paper elevation={1} sx={{ p: 2, mb: 3, display: 'flex', flexWrap: 'wrap' }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{textAlign: "left", flexBasis: '100%'}}>
                Address Information
            </Typography>
            <TextField
                required
                id={`address.city-${user.id}`}
                label="City"
                value={currentUserData.address?.city || ''}
                onChange={(e) => onFieldChange('address.city', e.target.value)}
                error={Boolean(getValidationError('address.city'))}
                helperText={getValidationError('address.city')}
            />
            <TextField
                required
                id={`address.street-${user.id}`}
                label="Street"
                value={currentUserData.address?.street || ''}
                onChange={(e) => onFieldChange('address.street', e.target.value)}
                error={Boolean(getValidationError('address.street'))}
                helperText={getValidationError('address.street')}
            />
            <TextField
                required
                id={`address.suite-${user.id}`}
                label="Suite"
                value={currentUserData.address?.suite || ''}
                onChange={(e) => onFieldChange('address.suite', e.target.value)}
                error={Boolean(getValidationError('address.suite'))}
                helperText={getValidationError('address.suite')}
            />
            <TextField
                id={`address.zipcode-${user.id}`}
                label="Zipcode"
                value={currentUserData.address?.zipcode || ''}
                onChange={(e) => onFieldChange('address.zipcode', e.target.value)}
            />
            <TextField
                id={`address.geo.lat-${user.id}`}
                label="Geo Lat"
                value={currentUserData.address?.geo?.lat || ''}
                onChange={(e) => onFieldChange('address.geo.lat', e.target.value)}
            />
            <TextField
                id={`address.geo.lng-${user.id}`}
                label="Geo Lng"
                value={currentUserData.address?.geo?.lng || ''}
                onChange={(e) => onFieldChange('address.geo.lng', e.target.value)}
            />
        </Paper>
    );
};

export default AddressInfoSection;
