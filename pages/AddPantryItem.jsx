import { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  Typography,
  Grid,
  FormControl,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebase";

const AddPantryItem = ({ open, onClose, onAddItem }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    expirationDate: "",
    imageUrl: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const [user] = useAuthState(auth);

  const handleAddItem = async () => {
    if (user) {
      if (!newItem.name || !newItem.quantity || !newItem.expirationDate) {
        setError("Name, Quantity, and Expiration Date are required.");
        return;
      }

      try {
        let imageUrl = "";
        if (image) {
          const storageRef = ref(storage, `pantryImages/${image.name}`);
          await uploadBytes(storageRef, image);
          imageUrl = await getDownloadURL(storageRef);
        }

        await addDoc(collection(db, "users", user.uid, "pantry"), {
          ...newItem,
          imageUrl, // Add image URL to document
        });

        // Clear form and close dialog
        setNewItem({
          name: "",
          quantity: "",
          expirationDate: "",
          imageUrl: "",
        });
        setImage(null);
        setError(""); // Clear error
        onClose(); // Close dialog
        if (onAddItem) {
          onAddItem(); // Call onAddItem if provided
        }
      } catch (error) {
        console.error("Failed to add item: ", error);
      }
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
          fontWeight: "500",
          textAlign: "center",
          fontFamily: "Copperplate",
          fontWeight: "bold",
          color:"#2E3A59"
        }}
      >
        Add Pantry Item
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              fullWidth
              margin="dense"
              InputProps={{ style: { borderRadius: 4 } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Quantity"
              variant="outlined"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: e.target.value })
              }
              fullWidth
              margin="dense"
              InputProps={{ style: { borderRadius: 4 } }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel htmlFor="expiration-date"></InputLabel>
              <TextField
                id="expiration-date"
                label="Expiration Date"
                type="date"
                value={newItem.expirationDate}
                onChange={(e) =>
                  setNewItem({ ...newItem, expirationDate: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                InputProps={{ style: { borderRadius: 4 } }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="upload-image">
              Upload Image (Optional)
            </InputLabel>
            <input
              id="upload-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: 8, width: "100%" }}
            />
          </Grid>
        </Grid>
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ fontFamily: "Copperplate" ,color:"#2E3A59"}}>
          Cancel
        </Button>
        <Button
          onClick={handleAddItem}
          variant="contained"
          color="primary"
          sx={{
            fontWeight: "500",
            borderRadius: 4,
            letterSpacing: "0.5px",
            fontFamily: "Copperplate",
            fontWeight: "bold",
            letterSpacing: "1.5px",
            backgroundColor: "#2E3A59",
            "&:hover": {
                backgroundColor: "#FF6B6B",
                color: "#fff",
              },
              
          }}
        >
          Add Item
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPantryItem;
