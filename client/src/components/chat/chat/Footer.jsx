import { useState } from 'react';
import { Box, styled, InputBase } from '@mui/material';
import { uploadFile } from '../../../service/api'; // Ensure this function uploads the file and returns the URL

const Container = styled(Box)`
    height: 55px;
    background: #f4f4f4;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-radius: 12px;
`;

const InputField = styled(InputBase)`
    flex: 1;
    padding: 8px;
    border-radius: 18px;
    background: #fff;
    border: 1px solid #ccc;
    margin: 0 10px;
`;

const Footer = ({ sendText, value, setValue, setFile, file, setImage }) => {
    const [fileName, setFileName] = useState('');

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            handleFileUpload(selectedFile);
        }
    };

    const handleFileUpload = async (selectedFile) => {
        if (selectedFile) {
            const data = new FormData();
            data.append("file", selectedFile);
            try {
                const response = await uploadFile(data);
                if (response?.data?.url) {
                    setImage(response.data.url);
                    // Send the URL of the uploaded file to other users in the chat
                    sendText({ text: '', url: response.data.url });
                }
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && value.trim() !== '') {
            sendText(e);
        }
    };

    return (
        <Container>
            <InputField
                placeholder="Type a message"
                inputProps={{ 'aria-label': 'message' }}
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={handleKeyPress}
                value={value}
            />
        </Container>
    );
};

export default Footer;
