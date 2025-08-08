import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, Rating, Chip, Divider } from '@mui/material';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      navigate('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back to Products
      </Button>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            p: 2,
            borderRadius: 2,
            height: '100%',
            minHeight: '400px'
          }}>
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '500px', 
                objectFit: 'contain' 
              }} 
            />
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({product.rating.toFixed(1)})
            </Typography>
          </Box>
          
          <Chip 
            label={product.category} 
            color="primary" 
            variant="outlined" 
            sx={{ mb: 2 }} 
          />
          
          <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
            ${product.price.toFixed(2)}
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            {product.description}
          </Typography>
          
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Stock: {product.stock} available
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ px: 4 }}
            >
              Add to Cart
            </Button>
            
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate(`/edit-product/${product._id}`)}
            >
              Edit
            </Button>
            
            <Button 
              variant="outlined" 
              color="error" 
              size="large"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;