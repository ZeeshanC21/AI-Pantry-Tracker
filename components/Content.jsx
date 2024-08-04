import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { styled } from '@mui/system';

const GradientText = styled('span')({
  background: 'linear-gradient(90deg, #FF6B6B, #FFD93D)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

const Content = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems="center"
      padding={{ xs: '28px', sm: '12px', md: '16px', lg: '8px' }}
      bgcolor="#F8F8FF"
      gap={{ xs: '8px', sm: '12px', md: '16px', lg: '24px' }}
    >
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        overflow="hidden"
        padding={{ xs: '8px', sm: '12px', md: '16px', lg: '24px' }}
      >
        <Typography
          variant="h3"
          color="#2E3A59"
          fontWeight="bold"
          fontSize={{ xs: '24px', sm: '32px', md: '40px', lg: '64px' }}
          gutterBottom
        >
          Welcome to
          <br />
          <GradientText>AI Pantry Tracker</GradientText>
        </Typography>
        <Typography
          variant="body1"
          color="#6B7280"
          marginBottom="16px"
          fontSize={{ xs: '14px', sm: '16px', md: '18px', lg: '20px' }}
        >
          Keep track of your pantry items and
          <br />
          never run out of your favorite ingredients again
        </Typography>
        <Link href="/protectedPantryItemList" passHref>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#2E3A59',
              fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px' },
              '&:hover': {
                backgroundColor: '#FF6B6B',
              }
            }}
          >
            Check Pantry
          </Button>
        </Link>
      </Box>

      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom={{ xs: '8px', sm: '12px', md: '16px', lg: '24px' }}
        padding={{ xs: '8px', sm: '12px', md: '16px', lg: '24px' }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '80%', md: '90%', lg: '550px' },
            height: { xs: 'auto', sm: 'auto', md: 'auto', lg: '550px' },
            overflow: 'hidden',
          }}
        >
          <Image
            src="/assets/supermarket.svg"
            alt="Pantry Tracker"
            layout="responsive"
            width={550}
            height={550}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
