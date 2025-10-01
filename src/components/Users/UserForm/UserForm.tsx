import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Box, Stack, Button } from '@mui/material';
import { useUpdateUserMutation } from '../../../services/api';
import { useUserFormWithValidation } from './useUserFormWithValidation';
import { User } from '../../../types';
import PersonalInfoSection from './PersonalInfoSection';
import CompanyInfoSection from './CompanyInfoSection';
import AddressInfoSection from './AddressInfoSection';

interface UserFormProps {
    user: User;
    hidePostsButton?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
    user,
    hidePostsButton = false,
}) => {
    const navigate = useNavigate();
    const { 
        formData, 
        isModified, 
        handleFieldChange, 
        resetForm, 
        updateOriginalData,
        getValidationError, 
        hasValidationErrors 
    } = useUserFormWithValidation(user);
    const [updateUser, { isLoading: isSaving }] = useUpdateUserMutation();

    const onFieldChange = handleFieldChange;
    const onReset = resetForm;

    const onSave = useCallback(() => {
        if (hasValidationErrors()) {
            alert('Please fix all validation errors before saving.');
            return;
        }

        console.log('Saving user data:', formData);

        updateUser(formData);
        updateOriginalData();
        alert(`User ${formData.name} data saved successfully!`);
    }, [formData, hasValidationErrors, updateUser, updateOriginalData]);

    const handleSeePosts = useCallback(() => {
        navigate(`/users/${user.id}/posts`);
    }, [navigate, user.id]);

    return (
        <Box component="form" noValidate autoComplete="off" sx={{ '& .MuiTextField-root': { m: 1, width: '250px', flexBasis: '40%' } }}>
            <PersonalInfoSection
                user={user}
                currentUserData={formData}
                onFieldChange={onFieldChange}
                getValidationError={getValidationError}
            />

            <CompanyInfoSection
                user={user}
                currentUserData={formData}
                onFieldChange={onFieldChange}
            />

            <AddressInfoSection
                user={user}
                currentUserData={formData}
                onFieldChange={onFieldChange}
                getValidationError={getValidationError}
            />

            <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end"}}>
                {!hidePostsButton && (
                    <Button variant="contained" onClick={handleSeePosts}>See posts</Button>
                )}
                <Button 
                    variant="outlined" 
                    color="warning" 
                    disabled={!isModified}
                    onClick={onReset}
                >
                    Reset
                </Button>
                <Button 
                    variant="contained" 
                    color="success" 
                    disabled={!isModified || hasValidationErrors() || isSaving}
                    onClick={onSave}
                >
                    {(isSaving) ? 'Saving...' : 'Save'}
                </Button>
            </Stack>
        </Box>
    );
};

export default UserForm;
