# 🚀 CANDLEWYCK DINER - DEPLOYMENT GUIDE

Your website is **READY TO DEPLOY**! Choose your platform below:

---

## ⚡ FASTEST: Render.com (Recommended)

### 1. Push to GitHub
```bash
cd /home/claude/candlewyck-diner

git init
git add .
git commit -m "Candlewyck Diner Website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/candlewyck-diner.git
git push -u origin main
```

### 2. Deploy on Render
1. Go to **render.com** (free account)
2. Click **New +** → **Web Service**
3. Select your GitHub repo
4. Settings auto-fill from `render.yaml`
5. Click **Deploy**

**✅ Your site is LIVE in 2 minutes!**

Live URL: `https://candlewyck-diner.onrender.com`

---

## 🔥 SUPER EASY: Vercel (Frontend Only)

Perfect if you want instant frontend deployment:

1. Go to **vercel.com**
2. Click **Import Project**
3. Select GitHub repo
4. Select `client` directory
5. Deploy ✅

Frontend URL: `https://candlewyck-diner.vercel.app`

For backend, deploy to Render separately.

---

## 📱 CLASSIC: Heroku

### 1. Install Heroku CLI
```bash
npm install -g heroku
heroku login
```

### 2. Deploy
```bash
cd /home/claude/candlewyck-diner
heroku create candlewyck-diner
git push heroku main
```

**Live URL**: `https://candlewyck-diner.herokuapp.com`

---

## 🏢 PROFESSIONAL: DigitalOcean Droplet

### 1. Create a Droplet ($5/month)
- Select Ubuntu 22.04
- SSH in

### 2. Setup
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone your repo
git clone https://github.com/YOUR_USERNAME/candlewyck-diner.git
cd candlewyck-diner
npm install
npm run build
```

### 3. Run with PM2
```bash
sudo npm install -g pm2
pm2 start server.js --name candlewyck
pm2 startup
pm2 save
```

### 4. Setup Nginx
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```

Paste this:
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
```

```bash
sudo systemctl restart nginx
```

### 5. Get SSL Certificate
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d YOUR_DOMAIN.com
```

**Live URL**: `https://YOUR_DOMAIN.com`

---

## 📊 COMPARISON

| Platform | Setup Time | Cost | Ease | Uptime |
|----------|-----------|------|------|--------|
| **Render** | 2 min | Free/$$$ | ⭐⭐⭐⭐⭐ | 99.9% |
| **Vercel** | 1 min | Free/$$$ | ⭐⭐⭐⭐⭐ | 99.95% |
| **Heroku** | 5 min | Free/$$$ | ⭐⭐⭐⭐ | 99.9% |
| **DigitalOcean** | 20 min | $$$ | ⭐⭐⭐ | 99.99% |

**Recommendation: Use Render for everything!**

---

## ✅ VERIFICATION CHECKLIST

After deployment, check these:

```bash
# Check API is working
curl https://YOUR_SITE.com/api/health

# Check menu loads
curl https://YOUR_SITE.com/api/menu

# Check available times
curl https://YOUR_SITE.com/api/available-times/2024-06-15
```

All should return JSON responses.

---

## 🔧 ENVIRONMENT VARIABLES

For production, add these if needed:

```
PORT=5000
NODE_ENV=production
REACT_APP_API_URL=https://your-site.com/api
```

---

## 📊 WHAT'S INCLUDED

✅ Full React frontend  
✅ Node.js/Express backend  
✅ Real-time reservations  
✅ Menu showcase  
✅ Contact form  
✅ Admin API endpoints  
✅ Mobile responsive  
✅ Production ready  

---

## 🎉 DONE!

**Your website is deployed and taking reservations!**

### Next Steps:
1. Update business info (hours, menu, etc.)
2. Add Google Analytics
3. Monitor reservations
4. Collect customer feedback
5. Optimize for conversions

---

## 💡 TROUBLESHOOTING

**Port already in use?**
```bash
lsof -i :5000
kill -9 <PID>
```

**Build fails?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**API not connecting?**
Check CORS settings in `server.js` and ensure frontend URL is correct.

---

**Questions? Check README.md and SETUP_GUIDE.md**

Good luck! 🚀
