const Product = require('./models/Product');
const mongoose = require('mongoose');
require('dotenv').config();

const products = [
  {
    name: "iPhone 13 Pro",
    description: "The latest iPhone with A15 Bionic chip, Super Retina XDR display, and Pro camera system.",
    price: 999,
    category: "Electronics",
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-family-hero?wid=940&hei=1112&fmt=png-alpha&.v=1631220221000",
    stock: 50,
    rating: 4.8
  },
  {
    name: "Sony WH-1000XM4",
    description: "Industry-leading noise canceling headphones with 30-hour battery life.",
    price: 349,
    category: "Electronics",
    imageUrl: "https://m.media-amazon.com/images/I/51QxA-98Q+L._AC_SL1000_.jpg",
    stock: 30,
    rating: 4.7
  },
  {
    name: "Nike Air Force 1",
    description: "Classic white sneakers with durable leather construction.",
    price: 110,
    category: "Clothing",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-force-1-07-shoe-NMmm1B.png",
    stock: 100,
    rating: 4.6
  },
  {
    name: "Leather Recliner Sofa",
    description: "Premium leather recliner sofa with comfortable cushioning.",
    price: 799,
    category: "Home",
    imageUrl: "https://m.media-amazon.com/images/I/81+UHYx5ZaL._AC_SL1500_.jpg",
    stock: 15,
    rating: 4.5
  },
  {
    name: "The Midnight Library",
    description: "A novel by Matt Haig about a library between life and death.",
    price: 15,
    category: "Books",
    imageUrl: "https://m.media-amazon.com/images/I/81YzHKeWq7L._AC_UL640_FMwebp_QL65_.jpg",
    stock: 200,
    rating: 4.4
  },
  {
    name: "Dyson Supersonic Hair Dryer",
    description: "Professional hair dryer with intelligent heat control.",
    price: 429,
    category: "Beauty",
    imageUrl: "https://m.media-amazon.com/images/I/61YvD4N4ZoL._AC_SL1500_.jpg",
    stock: 25,
    rating: 4.3
  }
];

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  return Product.deleteMany({});
})
.then(() => {
  return Product.insertMany(products);
})
.then(() => {
  console.log('Database seeded successfully');
  mongoose.connection.close();
})
.catch(err => {
  console.error('Error seeding database', err);
  mongoose.connection.close();
});