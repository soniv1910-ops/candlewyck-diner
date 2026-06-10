import React, { useState, useEffect } from 'react';
import './index.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const CandlewyckDiner = () => {
  const [activeTab, setActiveTab] = useState('breakfast');
  const [menuItems, setMenuItems] = useState([]);
  const [reservationStep, setReservationStep] = useState(1);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [businessInfo, setBusinessInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    fetchMenuItems();
    fetchBusinessInfo();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const res = await fetch(`${API_URL}/menu`);
      const data = await res.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const fetchBusinessInfo = async () => {
    try {
      const res = await fetch(`${API_URL}/info`);
      const data = await res.json();
      setBusinessInfo(data);
    } catch (error) {
      console.error('Error fetching business info:', error);
    }
  };

  const fetchAvailableTimes = async (date) => {
    try {
      const res = await fetch(`${API_URL}/available-times/${date}`);
      const data = await res.json();
      setAvailableTimes(data);
    } catch (error) {
      console.error('Error fetching available times:', error);
    }
  };

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'date') {
      fetchAvailableTimes(value);
    }
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('Reservation confirmed! We look forward to seeing you.');
        setShowReservationModal(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: '2',
          specialRequests: ''
        });
        setReservationStep(1);
      }
    } catch (error) {
      alert('Error creating reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });

      if (res.ok) {
        alert('Message sent! We\'ll get back to you soon.');
        setContactForm({ name: '', email: '', message: '' });
      }
    } catch (error) {
      alert('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredMenu = menuItems.filter(item => item.category === activeTab);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="candlewyck-website">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">
            <h1>🕯️ CANDLEWYCK DINER</h1>
          </div>
          <ul className="nav-links">
            <li><a href="#menu">Menu</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li>
              <button 
                className="cta-button nav-cta"
                onClick={() => setShowReservationModal(true)}
              >
                Reserve Now
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to Candlewyck Diner</h2>
          <p>Classic American dining with a touch of nostalgia</p>
          <div className="hero-buttons">
            <button 
              className="cta-button cta-primary"
              onClick={() => setShowReservationModal(true)}
            >
              Reserve a Table
            </button>
            <a href="tel:+12019334446" className="cta-button cta-secondary">
              Call: (201) 933-4446
            </a>
          </div>
          {businessInfo && (
            <div className="quick-info">
              <div className="info-item">
                <span className="icon">🕐</span>
                <p>Opens at 7:00 AM Daily</p>
              </div>
              <div className="info-item">
                <span className="icon">📍</span>
                <p>East Rutherford, NJ</p>
              </div>
              <div className="info-item">
                <span className="icon">💰</span>
                <p>$20-30 per person</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu-section">
        <div className="container">
          <h2>Our Menu</h2>
          <div className="menu-tabs">
            <button 
              className={`tab ${activeTab === 'breakfast' ? 'active' : ''}`}
              onClick={() => setActiveTab('breakfast')}
            >
              🌅 Breakfast
            </button>
            <button 
              className={`tab ${activeTab === 'lunch' ? 'active' : ''}`}
              onClick={() => setActiveTab('lunch')}
            >
              🥗 Lunch
            </button>
            <button 
              className={`tab ${activeTab === 'dinner' ? 'active' : ''}`}
              onClick={() => setActiveTab('dinner')}
            >
              🍖 Dinner
            </button>
          </div>

          <div className="menu-grid">
            {filteredMenu.map(item => (
              <div key={item.id} className="menu-card">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <p className="price">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="about-section">
        <div className="container">
          <h2>Why Choose Candlewyck?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">👨‍🍳</span>
              <h3>Homemade Recipes</h3>
              <p>Traditional recipes prepared fresh daily by our experienced chefs</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⭐</span>
              <h3>Best Quality</h3>
              <p>Premium ingredients sourced locally whenever possible</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">👥</span>
              <h3>Warm Atmosphere</h3>
              <p>Family-friendly environment perfect for any occasion</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🚀</span>
              <h3>Fast Service</h3>
              <p>Quick, efficient service without compromising quality</p>
            </div>
          </div>

          <div className="testimonials">
            <h3>What Our Guests Say</h3>
            <div className="testimonial-grid">
              <div className="testimonial">
                <p>"Best diner in the area! The breakfast pancakes are incredible."</p>
                <p className="author">- Sarah M.</p>
              </div>
              <div className="testimonial">
                <p>"Perfect spot for lunch. Great service and amazing food!"</p>
                <p className="author">- James R.</p>
              </div>
              <div className="testimonial">
                <p>"A true gem. We come here every weekend. Highly recommend!"</p>
                <p className="author">- Maria T.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <div className="info-block">
                <h4>📍 Address</h4>
                <p>179 Paterson Ave<br />East Rutherford, NJ 07073</p>
              </div>
              <div className="info-block">
                <h4>📞 Phone</h4>
                <p><a href="tel:+12019334446">(201) 933-4446</a></p>
              </div>
              <div className="info-block">
                <h4>🕐 Hours</h4>
                <p>Mon-Thu: 7 AM - 10 PM<br />
                   Fri-Sat: 7 AM - 11 PM<br />
                   Sun: 7 AM - 10 PM</p>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <h3>Send us a Message</h3>
              <input
                type="text"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                required
              />
              <textarea
                placeholder="Your Message"
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                required
              ></textarea>
              <button type="submit" className="cta-button" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Reservation Modal */}
      {showReservationModal && (
        <div className="modal-overlay" onClick={() => setShowReservationModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowReservationModal(false)}>✕</button>
            <h2>Make a Reservation</h2>

            <form onSubmit={handleReservationSubmit}>
              {reservationStep === 1 && (
                <div className="form-step">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleReservationChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleReservationChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleReservationChange}
                    required
                  />
                  <button 
                    type="button" 
                    className="cta-button"
                    onClick={() => setReservationStep(2)}
                  >
                    Continue
                  </button>
                </div>
              )}

              {reservationStep === 2 && (
                <div className="form-step">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleReservationChange}
                    min={minDate}
                    required
                  />
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleReservationChange}
                    required
                  >
                    <option value="">Select Time</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleReservationChange}
                    required
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                  <textarea
                    name="specialRequests"
                    placeholder="Special Requests (Optional)"
                    value={formData.specialRequests}
                    onChange={handleReservationChange}
                  ></textarea>
                  <div className="button-group">
                    <button 
                      type="button"
                      className="cta-button cta-secondary"
                      onClick={() => setReservationStep(1)}
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="cta-button"
                      disabled={loading}
                    >
                      {loading ? 'Confirming...' : 'Confirm Reservation'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Candlewyck Diner. All rights reserved.</p>
          <p>179 Paterson Ave, East Rutherford, NJ 07073 | (201) 933-4446</p>
        </div>
      </footer>
    </div>
  );
};

export default CandlewyckDiner;
