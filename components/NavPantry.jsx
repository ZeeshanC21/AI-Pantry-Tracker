import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const NavPantry = ({ onAddClick }) => {
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
              fontSize: { xs: "0px", sm: "block", md: "40px" },
              display: { xs: "none", sm: "block" },
            }}
          >
            PantryAI
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Link href="/" passHref>
            <Button
              color="primary"
              sx={{
                color: "#2E3A59",
                fontWeight: "bolder",
                marginLeft: { xs: "0px", sm: "12px", md: "16px" },
                fontSize: { xs: "12px", sm: "16px", md: "20px" },
              }}
            >
              Home
            </Button>
          </Link>
          <Button
            variant="text"
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
            onClick={onAddClick}
          >
            Add Pantry Item
          </Button>
        </Box>
      </Box>
    );
  };

export default NavPantry;