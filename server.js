const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data store
const data = {
  reservations: [],
  messages: [],
  menuItems: [
    { id: 1, name: 'Classic Breakfast Platter', category: 'breakfast', description: 'Eggs, bacon, hash browns, toast', price: 12.99, available: true },
    { id: 2, name: 'Buttermilk Pancakes', category: 'breakfast', description: 'Served with maple syrup and butter', price: 10.99, available: true },
    { id: 3, name: 'Eggs Benedict', category: 'breakfast', description: 'Poached eggs, ham, hollandaise sauce', price: 14.99, available: true },
    { id: 4, name: 'New York Strip Steak', category: 'dinner', description: '12oz prime cut with seasonal vegetables', price: 24.99, available: true },
    { id: 5, name: 'Grilled Salmon', category: 'dinner', description: 'Fresh Atlantic salmon with lemon butter', price: 22.99, available: true },
    { id: 6, name: 'Classic Diner Burger', category: 'lunch', description: 'Half-pound beef patty with all the toppings', price: 13.99, available: true },
    { id: 7, name: 'Chicken Fried Steak', category: 'dinner', description: 'Tender steak with country gravy', price: 18.99, available: true },
    { id: 8, name: 'Meatloaf Special', category: 'dinner', description: 'Homemade meatloaf with mashed potatoes', price: 16.99, available: true }
  ]
};

// Routes - Menu
app.get('/api/menu', (req, res) => {
  const items = data.menuItems.filter(item => item.available);
  res.json(items);
});

app.get('/api/menu/:category', (req, res) => {
  const items = data.menuItems.filter(item => 
    item.category === req.params.category && item.available
  );
  res.json(items);
});

// Routes - Reservations
app.post('/api/reservations', (req, res) => {
  const { name, email, phone, date, time, guests, specialRequests } = req.body;

  if (!name || !email || !phone || !date || !time || !guests) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const reservation = {
    id: uuidv4(),
    name,
    email,
    phone,
    date,
    time,
    guests: parseInt(guests),
    specialRequests: specialRequests || '',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  data.reservations.push(reservation);
  res.status(201).json({ id: reservation.id, message: 'Reservation created successfully' });
});

app.get('/api/reservations', (req, res) => {
  const sorted = [...data.reservations].sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(sorted);
});

app.get('/api/available-times/:date', (req, res) => {
  const { date } = req.params;
  const allTimes = ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
  
  const bookedTimes = data.reservations
    .filter(r => r.date === date && r.status !== 'cancelled')
    .map(r => r.time);
  
  const availableTimes = allTimes.filter(t => !bookedTimes.includes(t));
  res.json(availableTimes);
});

app.patch('/api/reservations/:id', (req, res) => {
  const { status } = req.body;
  const reservation = data.reservations.find(r => r.id === req.params.id);
  
  if (!reservation) {
    return res.status(404).json({ error: 'Reservation not found' });
  }

  reservation.status = status;
  res.json({ message: 'Reservation updated' });
});

// Routes - Contact
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const msg = {
    id: uuidv4(),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };

  data.messages.push(msg);
  res.status(201).json({ id: msg.id, message: 'Message sent successfully' });
});

// Routes - Business Info
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Candlewyck Diner',
    address: '179 Paterson Ave, East Rutherford, NJ 07073',
    phone: '+1 201-933-4446',
    hours: {
      monday: '7:00 AM - 10:00 PM',
      tuesday: '7:00 AM - 10:00 PM',
      wednesday: '7:00 AM - 10:00 PM',
      thursday: '7:00 AM - 10:00 PM',
      friday: '7:00 AM - 11:00 PM',
      saturday: '7:00 AM - 11:00 PM',
      sunday: '7:00 AM - 10:00 PM'
    },
    priceRange: '$20-30 per person',
    website: 'candlewyckdiner.com'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Catch-all for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🕯️ Candlewyck Diner server running on port ${PORT}`);
});
