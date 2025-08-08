import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import ProductForm from '../components/ProductForm';
import axios from 'axios';

const AddProduct = () => {
  const navigate = useNavigate();

  const handleSubmit = async (productData) => {
    try {
      await axios.post('http://localhost:5000/api/products', productData);
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Add New Product
      </Typography>
      <ProductForm onSubmit={handleSubmit} isEditing={false} />
    </Container>
  );
};

export default AddProduct;