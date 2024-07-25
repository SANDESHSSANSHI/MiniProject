import { useState, useEffect } from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import axios from 'axios';

const UploadSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FileInput = styled('input')`
  margin: 10px 0;
`;

const UploadedFiles = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FileItem = styled(Box)`
  margin: 5px 0;
`;

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [userSub, setUserSub] = useState(''); // Retrieve from context or authentication

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`/api/files/${userSub}`);
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    if (userSub) fetchFiles();
  }, [userSub]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (selectedFiles) {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('file', selectedFiles[i]);
      }
      formData.append('userSub', userSub);

      try {
        await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        // Refresh file list after upload
        const response = await axios.get(`/api/files/${userSub}`);
        setFiles(response.data);
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    }
  };

  return (
    <UploadSection>
      <Typography variant="h4">Upload Files</Typography>
      <FileInput type="file" multiple onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload}>Upload</Button>
      <UploadedFiles>
        {files.map((file) => (
          <FileItem key={file.filename}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.filename}</a>
          </FileItem>
        ))}
      </UploadedFiles>
    </UploadSection>
  );
};

export default UploadPage;
