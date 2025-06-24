const express = require('express');
   const path = require('path');
   const indexRouter = require('./routes/index');
   const aboutRouter = require('./routes/about');
   
   const app = express();
   const port = 3000;
   
   // Set EJS as the templating engine
   app.set('view engine', 'ejs');
   app.set('views', path.join(__dirname, 'views'));
   
   // Serve static files (CSS, etc.) from 'public' folder
   app.use(express.static(path.join(__dirname, 'public')));
   
   // Parse form data
   app.use(express.urlencoded({ extended: true }));
   
   // Use routes
   app.use('/', indexRouter);
   app.use('/about', aboutRouter);
   
   // 404 Error handling
   app.use((req, res) => {
     res.status(404).render('home', { title: '404 - Page Not Found', message: 'Sorry, that page doesn’t exist!' });
   });
   
   // Start the server
   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });