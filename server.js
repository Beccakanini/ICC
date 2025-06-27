import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import serviceRequestRoutes from './routes/sendServiceRequest.js';
import { sendEmail } from './routes/email.js';
import partnerRequest from './routes/partnerRequest.js'

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(serviceRequestRoutes);
app.use(partnerRequest);

// Dummy data
const products = [
  {
    id: '1',
    name: 'Basic Tee',
    color: 'Black',
    price: 35,
    image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    description: 'A high-quality basic black tee for everyday wear.',
  },
  {
    id: '2',
    name: 'Elegant Dress',
    color: 'Red',
    price: 79,
    image: 'https://example.com/dress.jpg',
    description: 'A classy red evening dress perfect for formal occasions.',
  },
];

// API route
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  
});
