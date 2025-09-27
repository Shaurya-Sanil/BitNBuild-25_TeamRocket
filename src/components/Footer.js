import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
  Shield,
  Award,
  Users,
  Globe,
  ArrowUpRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    categories: [
      { name: 'Design', href: '/marketplace?category=design' },
      { name: 'Development', href: '/marketplace?category=development' },
      { name: 'Writing', href: '/marketplace?category=writing' },
      { name: 'Tutoring', href: '/marketplace?category=tutoring' },
      { name: 'Marketing', href: '/marketplace?category=marketing' },
      { name: 'Photography', href: '/marketplace?category=photography' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Safety Center', href: '/safety' },
      { name: 'Community Guidelines', href: '/guidelines' },
      { name: 'How to Get Started', href: '/getting-started' },
      { name: 'Student Verification', href: '/verification' },
      { name: 'Contact Support', href: '/contact' }
    ],
    business: [
      { name: 'Post a Project', href: '/post-project' },
      { name: 'Browse Freelancers', href: '/browse' },
      { name: 'Enterprise Solutions', href: '/enterprise' },
      { name: 'University Partnerships', href: '/partnerships' },
      { name: 'API Documentation', href: '/api' },
      { name: 'Affiliate Program', href: '/affiliate' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
      { name: 'Success Stories', href: '/success-stories' },
      { name: 'Investor Relations', href: '/investors' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/gigcampus' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/gigcampus' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/gigcampus' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/gigcampus' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/gigcampus' }
  ];

  const trustBadges = [
    { icon: Shield, text: 'Secure Payments' },
    { icon: Award, text: 'Quality Assured' },
    { icon: Users, text: 'Trusted by 10K+ Students' }
  ];

  return (
    <footer style={{ 
      backgroundColor: 'var(--colors-neutral-dark)', 
      color: 'var(--colors-text-onDark)',
      marginTop: 'var(--spacing-xl)'
    }}>
      {/* Main Footer Content */}
      <div className="container" style={{ paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-xl)' }}>
        {/* Top Section */}
        <div className="grid grid-4" style={{ marginBottom: 'var(--spacing-xl)' }}>
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-sm" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <img src="/logo.png" alt="GigCampus" style={{ width: '40px', height: '40px', borderRadius: 'var(--border-radius-md)', objectFit: 'cover' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                GigCampus
              </span>
            </div>
            
            <p style={{ 
              color: 'var(--colors-text-onDarkSecondary)', 
              fontSize: 'var(--body-font-size)',
              lineHeight: '1.6',
              marginBottom: 'var(--spacing-lg)'
            }}>
              Connecting student talent with opportunities. The premier platform for student freelancers and local businesses.
            </p>

            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              <div className="flex items-center gap-sm">
                <Mail size={16} style={{ color: 'var(--colors-primary-lime)' }} />
                <span style={{ fontSize: 'var(--body-font-size)' }}>support@gigcampus.com</span>
              </div>
              <div className="flex items-center gap-sm">
                <Phone size={16} style={{ color: 'var(--colors-primary-lime)' }} />
                <span style={{ fontSize: 'var(--body-font-size)' }}>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-sm">
                <MapPin size={16} style={{ color: 'var(--colors-primary-lime)' }} />
                <span style={{ fontSize: 'var(--body-font-size)' }}>Stanford University, CA</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ 
              fontSize: 'var(--body-font-size)', 
              fontWeight: '600', 
              marginBottom: 'var(--spacing-lg)',
              color: 'var(--colors-text-onDark)'
            }}>
              Categories
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              {footerLinks.categories.map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    style={{ 
                      color: 'var(--colors-text-onDarkSecondary)', 
                      textDecoration: 'none',
                      fontSize: 'var(--body-font-size)',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--colors-primary-lime)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--colors-text-onDarkSecondary)'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ 
              fontSize: 'var(--body-font-size)', 
              fontWeight: '600', 
              marginBottom: 'var(--spacing-lg)',
              color: 'var(--colors-text-onDark)'
            }}>
              Support
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              {footerLinks.support.map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    style={{ 
                      color: 'var(--colors-text-onDarkSecondary)', 
                      textDecoration: 'none',
                      fontSize: 'var(--body-font-size)',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--colors-primary-lime)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--colors-text-onDarkSecondary)'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business & Company */}
          <div>
            <h4 style={{ 
              fontSize: 'var(--body-font-size)', 
              fontWeight: '600', 
              marginBottom: 'var(--spacing-lg)',
              color: 'var(--colors-text-onDark)'
            }}>
              Business
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
              {footerLinks.business.slice(0, 3).map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    style={{ 
                      color: 'var(--colors-text-onDarkSecondary)', 
                      textDecoration: 'none',
                      fontSize: 'var(--body-font-size)',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--colors-primary-lime)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--colors-text-onDarkSecondary)'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 style={{ 
              fontSize: 'var(--body-font-size)', 
              fontWeight: '600', 
              marginBottom: 'var(--spacing-lg)',
              color: 'var(--colors-text-onDark)'
            }}>
              Company
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              {footerLinks.company.slice(0, 3).map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    style={{ 
                      color: 'var(--colors-text-onDarkSecondary)', 
                      textDecoration: 'none',
                      fontSize: 'var(--body-font-size)',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--colors-primary-lime)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--colors-text-onDarkSecondary)'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div 
          style={{
            padding: 'var(--spacing-xl)',
            backgroundColor: 'var(--colors-neutral-medium)',
            borderRadius: 'var(--border-radius-lg)',
            marginBottom: 'var(--spacing-xl)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: 'var(--spacing-sm)',
                color: 'var(--colors-text-onDark)'
              }}>
                Stay Updated with GigCampus
              </h3>
              <p style={{ 
                color: 'var(--colors-text-onDarkSecondary)', 
                fontSize: 'var(--body-font-size)' 
              }}>
                Get the latest opportunities, tips, and updates delivered to your inbox.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', minWidth: '300px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: 'var(--spacing-md)',
                  border: 'none',
                  borderRadius: 'var(--border-radius-md)',
                  fontSize: 'var(--body-font-size)',
                  outline: 'none'
                }}
              />
              <button className="button button-secondary">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-lg" style={{ marginBottom: 'var(--spacing-xl)' }}>
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div key={index} className="flex items-center gap-sm">
                <Icon size={20} style={{ color: 'var(--colors-primary-lime)' }} />
                <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '500' }}>
                  {badge.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-md" style={{ marginBottom: 'var(--spacing-xl)' }}>
          <span style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-onDarkSecondary)' }}>
            Follow us:
          </span>
          {socialLinks.map(social => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--colors-neutral-medium)',
                  borderRadius: '50%',
                  color: 'var(--colors-text-onDarkSecondary)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--colors-primary-lime)';
                  e.target.style.color = 'var(--colors-primary-limeText)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'var(--colors-neutral-medium)';
                  e.target.style.color = 'var(--colors-text-onDarkSecondary)';
                }}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div 
          style={{ 
            borderTop: '1px solid var(--colors-neutral-medium)',
            paddingTop: 'var(--spacing-lg)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-lg">
              <span style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-onDarkSecondary)' }}>
                © {currentYear} GigCampus. All rights reserved.
              </span>
              <div className="flex items-center gap-lg">
                <Link 
                  to="/privacy"
                  style={{ 
                    color: 'var(--colors-text-onDarkSecondary)', 
                    textDecoration: 'none',
                    fontSize: 'var(--body-font-size)'
                  }}
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/terms"
                  style={{ 
                    color: 'var(--colors-text-onDarkSecondary)', 
                    textDecoration: 'none',
                    fontSize: 'var(--body-font-size)'
                  }}
                >
                  Terms of Service
                </Link>
                <Link 
                  to="/cookies"
                  style={{ 
                    color: 'var(--colors-text-onDarkSecondary)', 
                    textDecoration: 'none',
                    fontSize: 'var(--body-font-size)'
                  }}
                >
                  Cookie Policy
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-sm">
              <span style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-onDarkSecondary)' }}>
                Made with
              </span>
              <Heart size={16} style={{ color: '#ff6b6b' }} />
              <span style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-onDarkSecondary)' }}>
                for students
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
