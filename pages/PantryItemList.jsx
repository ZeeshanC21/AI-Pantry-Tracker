import { useState, useEffect } from "react";
import { TextField, Button, Box, Grid, Typography, Paper, InputAdornment } from "@mui/material";
import AddPantryItem from "./AddPantryItem";
import { auth, db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import NavPantry from "@/components/NavPantry";
import { Search as SearchIcon } from "@mui/icons-material";

const PantryItemList = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editQuantity, setEditQuantity] = useState(0);
  const [editName, setEditName] = useState("");
  const [editExpirationDate, setEditExpirationDate] = useState("");

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "users", user.uid, "pantry"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPantryItems(items);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleUpdate = async (id, quantity, name, expirationDate) => {
    if (user) {
      const itemRef = doc(db, "users", user.uid, "pantry", id);
      await updateDoc(itemRef, { quantity, name, expirationDate });
      setPantryItems(
        pantryItems.map((item) =>
          item.id === id ? { ...item, quantity, name, expirationDate } : item
        )
      );
      setEditingItemId(null);
    }
  };

  const handleDelete = async (id) => {
    if (user) {
      const isConfirmed = window.confirm("Are you sure you want to delete this item?");
      if (isConfirmed) {
        const itemRef = doc(db, "users", user.uid, "pantry", id);
        await deleteDoc(itemRef);
        setPantryItems(pantryItems.filter((item) => item.id !== id));
      }
    }
  };

  const handleDeleteAll = async () => {
    if (user) {
      if (window.confirm("Are you sure you want to delete all items?")) {
        const q = query(collection(db, "users", user.uid, "pantry"));
        const snapshot = await getDocs(q);
        const batch = writeBatch(db);
        snapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
        setPantryItems([]);
      }
    }
  };

  const filteredItems = pantryItems.filter(
    (item) => item.name && item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddItem = async (newItem) => {
    setPantryItems([
      ...pantryItems,
      { id: (pantryItems.length + 1).toString(), ...newItem },
    ]);
    setOpen(false);
  };

  return (
    <Box
      style={{
        backgroundColor: "#F8F8FF",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <NavPantry onAddClick={() => setOpen(true)} />
      <Box sx={{ p: 2, padding: "1rem" }}>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <TextField
            label="Search Item"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: "50%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Grid container spacing={2}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={item.id}>
              <Paper
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  boxShadow: 10,
                  borderRadius: 5,
                  backgroundColor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  margin: "0 auto",
                  maxWidth: "100%",
                }}
              >
                {editingItemId === item.id ? (
                  <>
                    <TextField
                      label="Name"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      label="Expiration Date"
                      value={editExpirationDate}
                      onChange={(e) => setEditExpirationDate(e.target.value)}
                      sx={{ mb: 1 }}
                    />
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Copperplate",
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: {
                          xs: "22px",
                          sm: "22px",
                          md: "24px",
                          lg: "28px",
                        },
                        color:"#2E3A59"
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography sx={{ color: "text.primary", textAlign: "center", fontFamily: "Copperplate",fontSize: { xs: "18px", sm: "18px", md: "20px", lg: "20px" },color:"#2E3A59" }}>
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography sx={{ color: "text.primary", textAlign: "center", fontFamily: "Copperplate",fontSize: { xs: "18px", sm: "18px", md: "20px", lg: "20px" },color:"#2E3A59" }}>
                      Expiration Date: {item.expirationDate}
                    </Typography>
                  </>
                )}
                {item.imageUrl && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 2,
                    }}
                  >
                    <Box
                      component="img"
                      src={item.imageUrl}
                      alt={item.name}
                      sx={{
                        width: "80%",
                        height: "auto",
                        maxHeight: { xs: "120px", md: "160px" },
                        boxShadow: 6,
                        borderRadius: 5,
                      }}
                    />
                  </Box>
                )}
                {editingItemId === item.id ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <Typography sx={{ mb: 1 }}>Quantity: {editQuantity}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Button
                        onClick={() => setEditQuantity(Math.max(editQuantity - 1, 0))}
                        variant="contained"
                        color="secondary"
                        size="small"
                        sx={{ width: "30px",fontFamily: "Copperplate" }}
                      >
                        -
                      </Button>
                      <Button
                        onClick={() => setEditQuantity(editQuantity + 1)}
                        variant="contained"
                        color="secondary"
                        size="small"
                        sx={{ width: "30px",fontFamily: "Copperplate" }}
                        
                      >
                        +
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        onClick={() => handleUpdate(item.id, editQuantity.toString(), editName, editExpirationDate)}
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mt: 1, width: "45%",fontFamily: "Copperplate" ,fontWeight: "bold" ,letterSpacing: "1.5px"}}
                      >
                        Confirm Update
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onClick={() => {
                        setEditingItemId(item.id);
                        setEditQuantity(parseInt(item.quantity, 10));
                        setEditName(item.name);
                        setEditExpirationDate(item.expirationDate);
                      }}
                      variant="contained"
                      color="primary"
                      sx={{ mt: 1, width: "60%", mx: "auto", fontSize: { xs: "10px", sm: "14px" },fontFamily: "Copperplate",fontWeight: "bold" ,letterSpacing: "1.5px" ,"&:hover": {
                backgroundColor: "#2E3A59",
                color: "#fff",
              },}}
                    >
                      Update Item
                    </Button>
                  </Box>
                )}
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="contained"
                  color="error"
                  sx={{ mt: 1, width: "60%", mx: "auto", fontSize: { xs: "10px", sm: "14px" } ,fontFamily: "Copperplate",fontWeight: "bold" ,letterSpacing: "1.5px","&:hover": {
                backgroundColor: "#2E3A59",
                color: "#fff",
              },}}
                >
                  Delete Item
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <AddPantryItem open={open} onClose={() => setOpen(false)} onAdd={handleAddItem} />
      </Box>
    </Box>
  );
};

export default PantryItemList;
