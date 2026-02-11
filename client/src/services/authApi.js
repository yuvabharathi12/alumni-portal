import api from './api';

export const sendOtp = async (email) => {
    return api.post('/auth/send-otp', { email });
};

export const verifyOtp = async (email, otp) => {
    return api.post('/auth/verify-otp', { email, otp });
};

export const registerUser = async (userData) => {
    return api.post('/auth/register', userData);
};
