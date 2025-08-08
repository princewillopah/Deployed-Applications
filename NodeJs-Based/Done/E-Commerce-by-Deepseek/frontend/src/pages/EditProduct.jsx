import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import ProductForm from '../components/ProductForm';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleSubmit = async (productData) => {
    try {
      await axios.patch(`http://localhost:5000/api/products/${id}`, productData);
      navigate(`/products/${id}`);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (!product) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Edit Product
      </Typography>
      <ProductForm 
        initialProduct={product} 
        onSubmit={handleSubmit} 
        isEditing={true} 
      />
    </Container>
  );
};

export default EditProduct;