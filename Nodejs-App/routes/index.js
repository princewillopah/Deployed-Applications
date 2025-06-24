const express = require('express');
    const router = express.Router();
    
    // Home page route
    router.get('/', (req, res) => {
      res.render('home', { title: 'Home', message: 'Welcome to My Node.js App!' });
    });
    
    // Contact page route
    router.get('/contact', (req, res) => {
      res.render('contact', { title: 'Contact Us', message: '' });
    });
    
    // Handle contact form submission
    router.post('/contact', (req, res) => {
      const { name, email, message } = req.body;
      console.log('Form submission:', { name, email, message });
      res.render('contact', { title: 'Contact Us', message: 'Thank you, ' + name + '! Your message has been received.' });
    });
    
    module.exports = router;