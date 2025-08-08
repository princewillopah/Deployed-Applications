import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setFeaturedProducts(response.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Welcome to ShopEase
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          Discover Amazing Products
        </Typography>
        
        <Typography variant="h4" component="h3" gutterBottom sx={{ mt: 4, mb: 2 }}>
          Featured Products
        </Typography>
        
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;