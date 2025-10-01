export const MANDATORY_FIELDS = [
    'username', 
    'email', 
    'address.street', 
    'address.suite', 
    'address.city'
] as const;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const VALIDATION_MESSAGES = {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
} as const;
