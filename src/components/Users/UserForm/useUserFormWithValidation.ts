import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { produce } from 'immer';
import { User } from '../../../types';
import { MANDATORY_FIELDS, EMAIL_REGEX, VALIDATION_MESSAGES } from '../../../constants/validationRules';

const updateNestedField = (
    currentUser: User,
    field: string, 
    value: string
): User => {
    return produce(currentUser, (draft) => {
        const fieldParts = field.split('.');

        if (fieldParts.length === 1) {
            // Simple field update
            (draft as any)[field] = value;
        } else if (fieldParts[0] === 'company' && draft.company) {
            // Company field update
            (draft.company as any)[fieldParts[1]] = value;
        } else if (fieldParts[0] === 'address' && draft.address) {
            if (fieldParts[1] === 'geo' && draft.address.geo) {
                // Geo field update
                (draft.address.geo as any)[fieldParts[2]] = value;
            } else {
                // Address field update
                (draft.address as any)[fieldParts[1]] = value;
            }
        }
    });
};

export const useUserFormWithValidation = (user: User) => {
    const originalDataRef = useRef<User>(user);
    const [formData, setFormData] = useState<User>(() => ({ ...originalDataRef.current }));  
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        originalDataRef.current = user;
        setFormData({ ...user });
    }, [user]);

    const handleFieldChange = useCallback((field: string, value: string) => {
        setFormData(prev => updateNestedField(prev, field, value));

        let error = '';
        if ((MANDATORY_FIELDS as readonly string[]).includes(field) && (!value || value.trim() === '')) {
            error = VALIDATION_MESSAGES.REQUIRED;
        } else if (field === 'email' && value && !EMAIL_REGEX.test(value)) {
            error = VALIDATION_MESSAGES.INVALID_EMAIL;
        }

        setValidationErrors(prev => {
            if (error) {
                return { ...prev, [field]: error };
            } else {
                const { [field]: removed, ...rest } = prev;
                return rest;
            }
        });
    }, []);

    const resetForm = useCallback(() => {
        setFormData({ ...originalDataRef.current });
        setValidationErrors({});
    }, []);

    const isModified = useMemo(() => {
        return JSON.stringify(formData) !== JSON.stringify(originalDataRef.current);
    }, [formData]);

    const getValidationError = useCallback((field: string) => {
        return validationErrors[field] || '';
    }, [validationErrors]);

    const hasValidationErrors = useCallback(() => {
        return Object.keys(validationErrors).length > 0;
    }, [validationErrors]);

    const updateOriginalData = useCallback(() => {
        originalDataRef.current = { ...formData };
    }, [formData]);

    return {
        formData,
        originalData: originalDataRef.current,
        isModified,
        handleFieldChange,
        resetForm,
        updateOriginalData,
        getValidationError,
        hasValidationErrors,
    };
};
