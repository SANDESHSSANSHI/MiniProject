import axios from 'axios';

const url = 'http://localhost:8000';

// User-related APIs
export const addUser = async (data) => {
    try {
        let response = await axios.post(`${url}/add`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling addUser API', error);
    }
}

export const getUsers = async () => {
    try {
        let response = await axios.get(`${url}/users`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getUsers API', error);
    }
}

// Conversation-related APIs
export const setConversation = async (data) => {
    try {
        await axios.post(`${url}/conversation/add`, data);
    } catch (error) {
        console.log('Error while calling setConversation API', error);
    }
}

export const getConversation = async (users) => {
    try {
        let response = await axios.post(`${url}/conversation/get`, users);
        return response.data;
    } catch (error) {
        console.log('Error while calling getConversation API', error);
    }
}

// Message-related APIs
export const getMessages = async (id) => {
    try {
        let response = await axios.get(`${url}/message/get/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getMessages API', error);
    }
}

export const newMessages = async (data) => {
    try {
        return await axios.post(`${url}/message/add`, data);
    } catch (error) {
        console.log('Error while calling newMessages API', error);
    }
}

// File upload and retrieval APIs
export const uploadFile = async (userId, formData) => {
    try {
        const response = await axios.post(`${url}/file/upload/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error while calling uploadFile API', error);
    }
}

export const getUserFiles = async (userId) => {
    try {
        const response = await axios.get(`${url}/user/${userId}/files`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getUserFiles API', error);
    }
}
