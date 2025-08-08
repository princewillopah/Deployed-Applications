import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, backgroundColor: '#2c3e50', color: 'white' }}>
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} ShopEase - All Rights Reserved
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          Made with ❤️ for modern e-commerce
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;