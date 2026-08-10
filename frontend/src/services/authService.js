import axios from 'axios';

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/auth`
});

export const login = async (formData) => {
    const response = await API.post('/login', formData);
    return response.data;
}

export const register = async (formData) => {
    const response = await API.post('/register', formData);
    return response.data;
}

export const getCurrentUser = async (token) => {
    const response = await API.get('/me',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const uploadResume = async (formData, token) => {

    const response = await API.put(
        "/resume",
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const updateProfile = async (profileData, token) => {

    const response = await API.put(
        "/profile",
        profileData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};