# 🕯️ Candlewyck Diner - High-Converting Website

A complete full-stack solution for Candlewyck Diner featuring modern design, online reservations, menu showcase, and admin management.

## 📋 Project Structure

```
candlewyck-diner/
├── server.js              # Express backend with API endpoints
├── package.json           # Dependencies
├── src/
│   ├── App.jsx           # React frontend component
│   └── index.css         # Styling
├── public/               # Static assets
└── README.md
```

## ✨ Key Features

### Frontend (React)
- **Hero Section**: Eye-catching landing with CTAs
- **Menu Display**: Categorized breakfast, lunch, dinner sections
- **Online Reservations**: Multi-step booking system with available time slots
- **Business Info**: Hours, address, phone, contact details
- **Contact Form**: Customer inquiries and messages
- **Responsive Design**: Mobile-first, works on all devices
- **Testimonials**: Social proof section
- **Feature Highlights**: Why choose us section

### Backend (Node.js/Express)
- **SQLite Database**: In-memory database for development
- **REST API**: Complete CRUD operations
- **Endpoints**:
  - `GET /api/menu` - All menu items
  - `GET /api/menu/:category` - Items by category
  - `POST /api/reservations` - Create reservation
  - `GET /api/reservations` - View all reservations (admin)
  - `GET /api/available-times/:date` - Check available slots
  - `PATCH /api/reservations/:id` - Update reservation status
  - `POST /api/contact` - Contact form submissions
  - `GET /api/info` - Business information

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Git (optional)

### Local Development

1. **Clone/Download the project**
   ```bash
   cd candlewyck-diner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

4. **In a new terminal, start the React frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Frontend runs on `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA)

### Quick Test
- Frontend: `http://localhost:3000`
- API: `http://localhost:5000/api/menu`

---

## 📦 Production Deployment

### Option 1: Vercel (Recommended for React)

1. **Build React app**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy frontend to Vercel**
   - Go to vercel.com
   - Import project
   - Set build command: `npm run build`
   - Set output directory: `dist`

### Option 2: Render.com (Full Stack)

1. **Create GitHub repo** and push code

2. **Create new Web Service on Render**
   - Connect GitHub repo
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
   - Add environment variables

3. **Create PostgreSQL database** (for production data persistence)
   - Add connection string to environment variables

### Option 3: Heroku (Classic)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku app**
   ```bash
   heroku create candlewyck-diner
   git push heroku main
   ```

### Option 4: Traditional VPS (DigitalOcean, AWS, etc.)

1. **SSH into your server**
   ```bash
   ssh root@your-server-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone project and install**
   ```bash
   git clone your-repo
   cd candlewyck-diner
   npm install
   npm run build
   ```

4. **Setup PM2 (process manager)**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "candlewyck"
   pm2 startup
   pm2 save
   ```

5. **Setup Nginx reverse proxy**
   ```bash
   sudo apt install nginx
   ```

   Edit `/etc/nginx/sites-available/default`:
   ```nginx
   server {
       listen 80;
       server_name candlewyckdiner.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
       }
   }
   ```

   Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

---

## 🔧 Configuration

### Environment Variables
Create `.env` file in root:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:pass@localhost/candlewyck  # For production
REACT_APP_API_URL=https://api.candlewyckdiner.com
```

### Database Migration (Production)

For persistent data, replace SQLite with PostgreSQL:

```javascript
// Install: npm install pg
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

// Use client.query() instead of db.run()
```

---

## 📊 Admin Dashboard Features

Access reservations at: `http://localhost:5000/api/reservations`

**Manage:**
- View all reservations
- Update reservation status (confirmed, cancelled)
- See booking trends
- Track customer preferences

**Enhance Admin Panel:**
```javascript
// Add authentication (JWT)
// Add admin dashboard UI
// Add analytics
// Export reservation reports
```

---

## 💰 Conversion Optimization Tips

1. **Mobile Optimization** ✅ Included
   - Responsive design
   - Touch-friendly buttons
   - Quick-load images

2. **Trust Signals** ✅ Included
   - Testimonials section
   - Business info prominent
   - Phone number in header

3. **Clear CTAs** ✅ Included
   - "Reserve Now" buttons above fold
   - Easy call-to-action
   - Multi-step form reduces friction

4. **Fast Loading**
   - Optimize images
   - Use CDN for assets
   - Lazy load images

5. **Social Proof**
   - Add Google reviews integration
   - Show star ratings
   - Display customer count

---

## 📈 Next Steps for Enhancement

### Phase 1: MVP (Current)
- ✅ Basic website
- ✅ Menu showcase
- ✅ Online reservations
- ✅ Contact form

### Phase 2: Growth
- Online ordering/delivery integration
- Email notifications for reservations
- Google Maps integration
- Social media feeds
- Email marketing automation

### Phase 3: Advanced
- Admin dashboard with analytics
- Multi-location support
- Loyalty program
- Mobile app
- Payment integration

---

## 🎨 Customization

### Update Business Info
Edit `server.js` in the `/api/info` endpoint:
```javascript
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Your Diner Name',
    address: 'Your Address',
    phone: 'Your Phone',
    // ... update details
  });
});
```

### Update Menu Items
Edit the menu seed data in `server.js`:
```javascript
const menuItems = [
  { name: '...', category: '...', price: ... }
];
```

### Change Colors
Edit `:root` variables in `src/index.css`:
```css
:root {
  --primary: #1a1a1a;      /* Dark background */
  --secondary: #d4a574;    /* Gold accent */
  --accent: #c41e3a;       /* Red CTA */
}
```

---

## 🔐 Security Considerations

1. **Validate all inputs** (already done)
2. **Use HTTPS** (enable via Vercel/Render)
3. **Add CSRF protection**
4. **Sanitize user inputs**
5. **Rate limit API** for production
6. **Add authentication** for admin panel

---

## 📱 Performance Metrics

Target metrics:
- **Page Load**: < 2 seconds
- **First Contentful Paint**: < 1 second
- **Lighthouse Score**: > 90

---

## 📞 Support & Maintenance

**Regular Tasks:**
- Monitor reservations daily
- Respond to contact messages
- Update menu seasonally
- Check website analytics
- Backup database weekly

**Monthly Reviews:**
- Analyze reservation patterns
- Customer satisfaction metrics
- Website traffic analysis
- Update testimonials

---

## 📄 License

MIT License - Feel free to use and modify

---

**Built with ❤️ for Candlewyck Diner**
