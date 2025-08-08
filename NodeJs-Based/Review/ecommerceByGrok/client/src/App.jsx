import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './components/Cart';
import OrderHistory from './pages/OrderHistory';
import AdminDashboard from './components/AdminDashboard';
import { useState } from 'react';
import './styles.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header user={user} setUser={setUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/register" component={Register} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={OrderHistory} />
          <Route path="/admin" component={AdminDashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;