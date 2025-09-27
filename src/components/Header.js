import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  MessageCircle, 
  User, 
  CreditCard,
  Search,
  Bell,
  Menu,
  ChevronDown,
  Settings,
  LogOut,
  Plus,
  TrendingUp
} from 'lucide-react';

const Header = ({ user }) => {
  const location = useLocation();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/marketplace', icon: Briefcase, label: 'Marketplace' },
    { path: '/chat', icon: MessageCircle, label: 'Messages' },
    { path: '/portfolio', icon: User, label: 'Portfolio' },
    { path: '/payments', icon: CreditCard, label: 'Payments' }
  ];

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'var(--colors-background-default)',
        borderBottom: '1px solid var(--colors-border-subtle)',
        padding: 'var(--spacing-md) 0'
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              textDecoration: 'none',
              color: 'var(--colors-text-primary)'
            }}
          >
            {/* Replace /public/logo.png with your provided logo image file */}
            <img src="/logo.png" alt="GigCampus" style={{ width: 40, height: 40, borderRadius: '8px', objectFit: 'cover' }} />
            <span 
              style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: 'var(--colors-text-primary)'
              }}
            >
              GigCampus
            </span>
          </Link>

          {/* Search Bar */}
          <div 
            style={{
              position: 'relative',
              flex: '1',
              maxWidth: '400px',
              margin: '0 var(--spacing-lg)'
            }}
          >
            <Search 
              size={20} 
              style={{
                position: 'absolute',
                left: 'var(--spacing-md)',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--colors-text-secondary)'
              }} 
            />
            <input
              type="text"
              placeholder="Search projects, freelancers..."
              style={{
                width: '100%',
                padding: 'var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) 40px',
                border: '2px solid var(--colors-border-subtle)',
                borderRadius: 'var(--border-radius-md)',
                backgroundColor: 'var(--colors-background-surface)',
                fontSize: 'var(--body-font-size)',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--colors-primary-lime)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--colors-border-subtle)'}
            />
          </div>

          {/* Navigation */}
          <nav 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)'
            }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    borderRadius: 'var(--border-radius-md)',
                    textDecoration: 'none',
                    color: isActive ? 'var(--colors-text-onDark)' : 'var(--colors-text-secondary)',
                    backgroundColor: isActive ? 'var(--colors-neutral-dark)' : 'transparent',
                    fontWeight: '500',
                    fontSize: 'var(--body-font-size)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={18} />
                  <span style={{ display: 'none' }} className="nav-label">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Actions */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)'
            }}
          >
            {user && (
              <>
                <div style={{ position: 'relative' }}>
                  <Bell 
                    size={20} 
                    style={{ 
                      color: 'var(--colors-text-secondary)',
                      cursor: 'pointer'
                    }}
                    onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                  />
                  {isNotificationDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: 'var(--spacing-sm)',
                      backgroundColor: 'var(--colors-background-default)',
                      border: '1px solid var(--colors-border-subtle)',
                      borderRadius: 'var(--border-radius-lg)',
                      boxShadow: 'var(--shadow-lg)',
                      padding: 'var(--spacing-md)',
                      minWidth: '300px',
                      zIndex: 999
                    }}>
                      <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>
                        Notifications
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                        <div style={{ padding: 'var(--spacing-sm)', backgroundColor: 'var(--colors-background-surface)', borderRadius: 'var(--border-radius-md)' }}>
                          <p style={{ fontSize: 'var(--body-font-size)', fontWeight: '500' }}>New project matches your skills</p>
                          <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>2 hours ago</p>
                        </div>
                        <div style={{ padding: 'var(--spacing-sm)', backgroundColor: 'var(--colors-background-surface)', borderRadius: 'var(--border-radius-md)' }}>
                          <p style={{ fontSize: 'var(--body-font-size)', fontWeight: '500' }}>Payment received for Logo Design project</p>
                          <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>1 day ago</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div style={{ position: 'relative' }}>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-sm)',
                      padding: 'var(--spacing-sm)',
                      borderRadius: 'var(--border-radius-md)',
                      backgroundColor: 'var(--colors-background-surface)',
                      cursor: 'pointer'
                    }}
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ display: 'none' }}>
                      <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                        {user.name}
                      </div>
                      <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                        {user.university}
                      </div>
                    </div>
                    <ChevronDown size={16} style={{ color: 'var(--colors-text-secondary)' }} />
                  </div>

                  {isUserDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: 'var(--spacing-sm)',
                      backgroundColor: 'var(--colors-background-default)',
                      border: '1px solid var(--colors-border-subtle)',
                      borderRadius: 'var(--border-radius-lg)',
                      boxShadow: 'var(--shadow-lg)',
                      padding: 'var(--spacing-md)',
                      minWidth: '250px',
                      zIndex: 999
                    }}>
                      <div style={{ paddingBottom: 'var(--spacing-md)', borderBottom: '1px solid var(--colors-border-subtle)', marginBottom: 'var(--spacing-md)' }}>
                        <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                          {user.name}
                        </div>
                        <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                          {user.university}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                        <Link 
                          to="/portfolio" 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 'var(--spacing-sm)',
                            padding: 'var(--spacing-sm)',
                            borderRadius: 'var(--border-radius-md)',
                            textDecoration: 'none',
                            color: 'var(--colors-text-primary)',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--colors-background-surface)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          <User size={16} />
                          <span>My Profile</span>
                        </Link>
                        
                        <Link 
                          to="/marketplace" 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 'var(--spacing-sm)',
                            padding: 'var(--spacing-sm)',
                            borderRadius: 'var(--border-radius-md)',
                            textDecoration: 'none',
                            color: 'var(--colors-text-primary)',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--colors-background-surface)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          <Plus size={16} />
                          <span>Post a Project</span>
                        </Link>
                        
                        <Link 
                          to="/analytics" 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 'var(--spacing-sm)',
                            padding: 'var(--spacing-sm)',
                            borderRadius: 'var(--border-radius-md)',
                            textDecoration: 'none',
                            color: 'var(--colors-text-primary)',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--colors-background-surface)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          <TrendingUp size={16} />
                          <span>Analytics</span>
                        </Link>
                        
                        <Link 
                          to="/settings" 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 'var(--spacing-sm)',
                            padding: 'var(--spacing-sm)',
                            borderRadius: 'var(--border-radius-md)',
                            textDecoration: 'none',
                            color: 'var(--colors-text-primary)',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--colors-background-surface)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          <Settings size={16} />
                          <span>Settings</span>
                        </Link>
                        
                        <div style={{ 
                          borderTop: '1px solid var(--colors-border-subtle)', 
                          marginTop: 'var(--spacing-sm)', 
                          paddingTop: 'var(--spacing-sm)' 
                        }}>
                          <button 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 'var(--spacing-sm)',
                              padding: 'var(--spacing-sm)',
                              borderRadius: 'var(--border-radius-md)',
                              border: 'none',
                              background: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              width: '100%',
                              textAlign: 'left',
                              transition: 'background-color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--colors-background-surface)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          >
                            <LogOut size={16} />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Menu 
                  size={20} 
                  style={{ 
                    color: 'var(--colors-text-secondary)',
                    cursor: 'pointer'
                  }} 
                />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

