import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from '../firebase';

const ImageCapture = ({ open, onClose, onImageUpload }) => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [user] = useAuthState(auth);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (user && file) {
      const storageRef = ref(storage, `images/${user.uid}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: Track upload progress
        },
        (error) => {
          console.error("Upload failed: ", error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(collection(db, 'users', user.uid, 'pantry'), {
              ...newItem,
              imageUrl: downloadURL,
            });
            onImageUpload();  // Notify parent component
            onClose();         // Close dialog
          } catch (error) {
            console.error("Failed to get download URL: ", error);
          }
        }
      );
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Image</DialogTitle>
      <DialogContent>
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          onChange={handleFileChange} 
        />
        <TextField
          label="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpload} variant="contained" color="primary">Upload</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCapture;
