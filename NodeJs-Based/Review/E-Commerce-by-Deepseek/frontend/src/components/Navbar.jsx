import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              ShopEase
            </Link>
          </Typography>
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>
          <Button color="inherit" component={Link} to="/add-product">
            Add Product
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            <ShoppingCartIcon sx={{ mr: 1 }} />
            Cart
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;