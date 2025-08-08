import { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Typography, Box } from '@mui/material';

const categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Beauty'];

const ProductForm = ({ initialProduct, onSubmit, isEditing }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    stock: 0,
    rating: 0
  });

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' || name === 'rating' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            select
            label="Category"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            fullWidth
            type="number"
            label="Price"
            name="price"
            value={product.price}
            onChange={handleChange}
            inputProps={{ step: "0.01", min: "0" }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            fullWidth
            type="number"
            label="Stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            inputProps={{ min: "0" }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="number"
            label="Rating (0-5)"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            inputProps={{ min: "0", max: "5", step: "0.1" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Image URL"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {isEditing ? 'Update Product' : 'Add Product'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductForm;