import { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, TextField } from '@mui/material';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(product => product.category))];

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Our Products
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="Filter by Category"
          variant="outlined"
          fullWidth
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </TextField>
      </Box>
      
      <Grid container spacing={4}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              No products found matching your criteria
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ProductList;