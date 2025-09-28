import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const categories = [
  'Graphics & Design',
  'Digital Marketing',
  'Writing & Translation',
  'Video & Animation',
  'Music & Audio',
  'Programming & Tech',
  'Business',
  'Lifestyle'
];

const sampleGigs = [
  {
    id: 1,
    title: "Website Design & Development",
    price: 2999,
    seller: "Priya Sharma"
  },
  {
    id: 2,
    title: "Logo Design & Branding",
    price: 1500,
    seller: "Rahul Mehta"
  },
  {
    id: 3,
    title: "Social Media Marketing",
    price: 2000,
    seller: "Sneha Singh"
  },
  {
    id: 4,
    title: "Content Writing & Blog Posts",
    price: 1200,
    seller: "Amit Patel"
  },
  {
    id: 5,
    title: "Video Editing & Animation",
    price: 3500,
    seller: "Anjali Verma"
  },
  {
    id: 6,
    title: "Music Production & Mixing",
    price: 2500,
    seller: "Rohan Nair"
  },
  {
    id: 7,
    title: "Mobile App Development",
    price: 5000,
    seller: "Neha Kulkarni"
  },
  {
    id: 8,
    title: "SEO Optimization",
    price: 2200,
    seller: "Vikas Khanna"
  }
];

// Icons can be SVG inline or emoji for simplicity
const valueProps = [
  {
    icon: "🎓",
    title: "Verified Student Talent",
    subtext: "Hire skilled students from your campus."
  },
  {
    icon: "⚡",
    title: "Easy Project Posting",
    subtext: "Post projects in minutes and get quick bids."
  },
  {
    icon: "💼",
    title: "Affordable & Reliable",
    subtext: "Get quality work within your budget."
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    subtext: "Funds released only after approval."
  }
];

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="lp-hero lp-hero-full">
        {/* Background video - replace source with '/hero.mp4' in public/ to use local file */}
        <video className="lp-hero-video" autoPlay muted loop playsInline>
          <source src="/hero.mp4" type="video/mp4" />
          {/* Fallback external video if local file not present */}
          <source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-a-city-1570?token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE1NzAiLCJpYXQiOjE2OTY0NjI0ODF9.NtQx2r8XrT3X4qQ4zv7bQ5kQv1x2kQJb8m3wVxwC8V0" type="video/mp4" />
        </video>
        <div className="lp-hero-overlay" />

        <div className="lp-hero-inner container">
          <div className="lp-hero-copy">
            <h1 className="lp-hero-title">Find the perfect freelance services for your projects</h1>
            <p className="body lp-hero-sub">Search for any service, connect with students and freelancers, and get work done fast.</p>

            <div className="lp-search lp-search-large">
              <input className="lp-search-input" placeholder="Search for any service..." aria-label="Search services" />
              <button className="button button-primary">Search</button>
            </div>

            <div className="lp-categories lp-category-chips">
              {categories.map(cat => (
                <Link key={cat} to={`/marketplace?category=${encodeURIComponent(cat)}`} className="category-chip">{cat} <span className="chip-arrow">→</span></Link>
              ))}
            </div>

            <div className="lp-trust-inline">
              <div className="trust-label">Trusted by:</div>
              <div className="trust-logos-inline">
                <div className="trust-logo">Meta</div>
                <div className="trust-logo">Google</div>
                <div className="trust-logo">Netflix</div>
                <div className="trust-logo">PayPal</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="container lp-featured">
        <h2>Featured Services</h2>
        <p className="body">Hand-picked services from top-rated freelancers.</p>

        <div className="grid grid-4 lp-gigs">
          {sampleGigs.map(gig => (
            <div key={gig.id} className="card lp-gig">
              <div className="gig-thumb" />
              <h3 className="heading">{gig.title}</h3>
              <div className="metadata">by {gig.seller}</div>
              <div className="lp-gig-footer">
                <div className="price">${gig.price}</div>
                <Link to="/marketplace" className="button button-outline">View</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Value Proposition Section --- */}
      <section className="container lp-value-prop">
        <h2 className="lp-value-headline metric-large" style={{ textAlign: 'center', marginBottom: '24px' }}>
          Make it all happen with student talent
        </h2>
        <div className="grid grid-4 lp-value-grid" style={{ justifyContent: 'center', gap: '24px', marginBottom: '32px' }}>
          {valueProps.map((prop, idx) => (
            <div key={idx} className="card card-light lp-value-card" style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div className="lp-value-icon" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{prop.icon}</div>
              <div className="lp-value-title" style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '4px' }}>{prop.title}</div>
              <div className="lp-value-subtext" style={{ fontSize: '0.95rem', color: 'var(--colors-text-secondary)' }}>{prop.subtext}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link to="/login" className="button button-primary lp-value-cta" style={{ fontSize: '1.1rem', padding: '12px 32px', borderRadius: '16px' }}>
            Join Now
          </Link>
        </div>
      </section>
      {/* --- End Value Proposition Section --- */}

      <section className="container lp-benefits">
        <div className="grid grid-2">
          <div className="card card-light">
            <h3>Why choose us?</h3>
            <ul className="benefit-list">
              <li>Verified freelancers with proven experience</li>
              <li>Secure escrow payments</li>
              <li>Fast delivery and clear communication</li>
            </ul>
          </div>

          <div className="card card-dark">
            <h3 className="metric-large">Trusted by thousands</h3>
            <p className="metadata">Join a community of businesses and freelancers who get work done efficiently.</p>
          </div>
        </div>
      </section>

      <footer className="container lp-cta">
        <div className="card lp-cta-inner card-light">
          <div>
            <h2>Start your project today</h2>
            <p className="body">Post a request and hire the perfect freelancer in minutes.</p>
          </div>
          <div>
            <Link to="/dashboard" className="button button-primary">Post a Project</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
