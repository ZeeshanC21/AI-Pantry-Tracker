import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { UserAuth } from "./AuthContext";

const Nav = ({ onAddClick }) => {
  const { user, googleSignIn, logOut } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="16px 24px"
      bgcolor="#fff0b3"
    >
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            width: { xs: "45px", sm: "60px", md: "75px" },
            height: { xs: "45px", sm: "60px", md: "75px" },
            overflow: "hidden",
            display: { xs: "block", sm: "block", md: "block" }, // Ensure logo is always displayed
          }}
        >
          <Image
            src="/assets/logo.svg"
            alt="logo"
            layout="responsive"
            width={75}
            height={75}
          />
        </Box>
        <Typography
          variant="h6"
          marginLeft="8px"
          color="#000"
          sx={{
            fontSize: { xs: "0px", sm: "30px", md: "40px" }, // Hide text on xs size
            display: { xs: "none", sm: "block" }, // Hide text on xs size
          }}
        >
          PantryAI
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Link href="/protectedPantryItemList" passHref>
          <Button
            color="primary"
            sx={{
              marginLeft: { xs: "8px", sm: "12px", md: "16px" },
              fontSize: { xs: "12px", sm: "14px", md: "20px" },
              color: "#2E3A59",
              "&:hover": {
                backgroundColor: "#FF6B6B",
                color: "#fff",
              },
            }}
          >
            Pantry Items
          </Button>
        </Link>
        {user ? (
          <Button
            variant="contained"
            color="secondary"
            sx={{
              marginLeft: { xs: "8px", sm: "12px", md: "16px" },
              fontSize: { xs: "12px", sm: "14px", md: "20px" },
              backgroundColor: "#FF6B6B",
              cursor: "pointer",
              '&:hover': {
                backgroundColor: '#E94E77',
              }
            }}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginLeft: { xs: "8px", sm: "12px", md: "16px" },
              fontSize: { xs: "12px", sm: "14px", md: "20px" },
              backgroundColor: "#2E3A59",
              cursor: "pointer",
              '&:hover': {
                backgroundColor: '#FF6B6B',
              }
            }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Nav;
