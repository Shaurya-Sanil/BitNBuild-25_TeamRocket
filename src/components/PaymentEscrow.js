import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  AlertCircle,
  CreditCard,
  Banknote,
  TrendingUp,
  Download,
  Eye,
  Star
} from 'lucide-react';

const PaymentEscrow = ({ user }) => {
  const [activeTab, setActiveTab] = useState('active');

  const escrowAccounts = [
    {
      id: 1,
      project: 'Logo Design for Campus Club',
      client: 'Tech Society',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      amount: 150,
      status: 'in-escrow',
      releaseDate: 'Dec 15, 2024',
      progress: 65,
      milestones: [
        { id: 1, title: 'Initial Concepts', completed: true, amount: 30 },
        { id: 2, title: 'Revision Round', completed: true, amount: 45 },
        { id: 3, title: 'Final Delivery', completed: false, amount: 75 }
      ]
    },
    {
      id: 2,
      project: 'Website Development',
      client: 'Local Restaurant',
      clientAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      amount: 800,
      status: 'pending-release',
      releaseDate: 'Dec 20, 2024',
      progress: 90,
      milestones: [
        { id: 1, title: 'Wireframes', completed: true, amount: 160 },
        { id: 2, title: 'Frontend Development', completed: true, amount: 320 },
        { id: 3, title: 'Backend Integration', completed: true, amount: 240 },
        { id: 4, title: 'Testing & Deployment', completed: false, amount: 80 }
      ]
    }
  ];

  const completedPayments = [
    {
      id: 3,
      project: 'Tutoring - Calculus',
      client: 'Sarah Johnson',
      clientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      amount: 200,
      status: 'completed',
      completedDate: 'Dec 10, 2024',
      rating: 5,
      review: 'Excellent tutor! Very patient and explained complex concepts clearly.'
    },
    {
      id: 4,
      project: 'Social Media Graphics',
      client: 'Campus Events',
      clientAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
      amount: 120,
      status: 'completed',
      completedDate: 'Dec 8, 2024',
      rating: 4,
      review: 'Great designs, delivered on time. Would work with again!'
    }
  ];

  const totalEscrow = escrowAccounts.reduce((sum, account) => sum + account.amount, 0);
  const totalCompleted = completedPayments.reduce((sum, payment) => sum + payment.amount, 0);

  const getStatusColor = (status) => {
    const colors = {
      'in-escrow': 'var(--colors-secondary-purple)',
      'pending-release': 'var(--colors-primary-lime)',
      'completed': 'var(--colors-primary-limeText)',
      'disputed': 'var(--colors-neutral-medium)'
    };
    return colors[status] || 'var(--colors-text-secondary)';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in-escrow': return Clock;
      case 'pending-release': return AlertCircle;
      case 'completed': return CheckCircle;
      default: return Clock;
    }
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: 'var(--spacing-md)' }}>
          Payment Escrow
        </h1>
        <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
          Secure payment protection for all your projects. Funds are held safely until work is completed and approved.
        </p>
      </div>

      {/* Security Badge */}
      <div className="card card-lime" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="flex items-center gap-md">
          <Shield size={32} style={{ color: 'var(--colors-primary-limeText)' }} />
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              100% Secure Payment Protection
            </h3>
            <p style={{ color: 'var(--colors-primary-limeText)', fontSize: 'var(--body-font-size)' }}>
              All payments are protected by our secure escrow system. Funds are released only after project completion and client approval.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-3" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="card card-dark">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: 'var(--colors-text-onDarkSecondary)', fontSize: 'var(--body-font-size)' }}>
                In Escrow
              </p>
              <h2 style={{ fontSize: 'var(--metric-font-size)', fontWeight: '700', color: 'var(--colors-text-onDark)' }}>
                ${totalEscrow}
              </h2>
            </div>
            <Lock size={32} style={{ color: 'var(--colors-text-onDarkSecondary)' }} />
          </div>
        </div>

        <div className="card card-purple">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: 'var(--colors-secondary-purpleText)', fontSize: 'var(--body-font-size)' }}>
                Completed
              </p>
              <h2 style={{ fontSize: 'var(--metric-font-size)', fontWeight: '700', color: 'var(--colors-secondary-purpleText)' }}>
                ${totalCompleted}
              </h2>
            </div>
            <CheckCircle size={32} style={{ color: 'var(--colors-secondary-purpleText)' }} />
          </div>
        </div>

        <div className="card card-light">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
                Success Rate
              </p>
              <h2 style={{ fontSize: 'var(--metric-font-size)', fontWeight: '700', color: 'var(--colors-text-primary)' }}>
                98%
              </h2>
            </div>
            <TrendingUp size={32} style={{ color: 'var(--colors-primary-limeText)' }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-sm" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <button
          onClick={() => setActiveTab('active')}
          className="button"
          style={{
            backgroundColor: activeTab === 'active' ? 'var(--colors-neutral-dark)' : 'var(--colors-background-surface)',
            color: activeTab === 'active' ? 'var(--colors-text-onDark)' : 'var(--colors-text-primary)'
          }}
        >
          Active Escrow ({escrowAccounts.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className="button"
          style={{
            backgroundColor: activeTab === 'completed' ? 'var(--colors-neutral-dark)' : 'var(--colors-background-surface)',
            color: activeTab === 'completed' ? 'var(--colors-text-onDark)' : 'var(--colors-text-primary)'
          }}
        >
          Completed ({completedPayments.length})
        </button>
      </div>

      {/* Active Escrow */}
      {activeTab === 'active' && (
        <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
          {escrowAccounts.map(account => {
            const StatusIcon = getStatusIcon(account.status);
            return (
              <div key={account.id} className="card card-light">
                <div className="flex items-start justify-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <div className="flex items-start gap-md">
                    <img
                      src={account.clientAvatar}
                      alt={account.client}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                        {account.project}
                      </h3>
                      <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
                        Client: {account.client}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-md">
                    <span style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: '700',
                      color: 'var(--colors-primary-limeText)'
                    }}>
                      ${account.amount}
                    </span>
                    <div 
                      style={{
                        padding: '4px 8px',
                        borderRadius: 'var(--border-radius-md)',
                        backgroundColor: getStatusColor(account.status),
                        color: 'white',
                        fontSize: 'var(--metadata-font-size)',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <StatusIcon size={14} />
                      {account.status.replace('-', ' ')}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                      Project Progress
                    </span>
                    <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                      {account.progress}%
                    </span>
                  </div>
                  <div style={{ 
                    height: '8px', 
                    backgroundColor: 'var(--colors-background-surface)', 
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${account.progress}%`,
                      height: '100%',
                      backgroundColor: 'var(--colors-secondary-purple)',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>

                {/* Milestones */}
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>
                    Payment Milestones
                  </h4>
                  <div style={{ display: 'grid', gap: 'var(--spacing-sm)' }}>
                    {account.milestones.map(milestone => (
                      <div 
                        key={milestone.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: 'var(--spacing-sm)',
                          backgroundColor: milestone.completed ? 'var(--colors-primary-lime)' : 'var(--colors-background-surface)',
                          borderRadius: 'var(--border-radius-md)',
                          border: `1px solid ${milestone.completed ? 'var(--colors-primary-limeText)' : 'var(--colors-border-subtle)'}`
                        }}
                      >
                        <div className="flex items-center gap-sm">
                          {milestone.completed ? (
                            <CheckCircle size={16} style={{ color: 'var(--colors-primary-limeText)' }} />
                          ) : (
                            <Clock size={16} style={{ color: 'var(--colors-text-secondary)' }} />
                          )}
                          <span style={{ 
                            fontSize: 'var(--body-font-size)',
                            color: milestone.completed ? 'var(--colors-primary-limeText)' : 'var(--colors-text-primary)',
                            fontWeight: milestone.completed ? '600' : '400'
                          }}>
                            {milestone.title}
                          </span>
                        </div>
                        <span style={{ 
                          fontSize: 'var(--body-font-size)',
                          fontWeight: '600',
                          color: milestone.completed ? 'var(--colors-primary-limeText)' : 'var(--colors-text-secondary)'
                        }}>
                          ${milestone.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-md">
                    <CreditCard size={16} style={{ color: 'var(--colors-text-secondary)' }} />
                    <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                      Release Date: {account.releaseDate}
                    </span>
                  </div>
                  <div className="flex gap-sm">
                    <button className="button button-outline">
                      <Eye size={16} />
                      View Details
                    </button>
                    <button className="button button-primary">
                      Request Release
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Completed Payments */}
      {activeTab === 'completed' && (
        <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
          {completedPayments.map(payment => (
            <div key={payment.id} className="card card-light">
              <div className="flex items-start justify-between" style={{ marginBottom: 'var(--spacing-md)' }}>
                <div className="flex items-start gap-md">
                  <img
                    src={payment.clientAvatar}
                    alt={payment.client}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                      {payment.project}
                    </h3>
                    <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
                      Client: {payment.client}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-md">
                  <span style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700',
                    color: 'var(--colors-primary-limeText)'
                  }}>
                    ${payment.amount}
                  </span>
                  <div className="flex items-center gap-sm">
                    <Star size={16} style={{ color: 'var(--colors-primary-limeText)' }} />
                    <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                      {payment.rating}/5
                    </span>
                  </div>
                </div>
              </div>

              {payment.review && (
                <div style={{
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--colors-background-surface)',
                  borderRadius: 'var(--border-radius-lg)',
                  border: '1px solid var(--colors-border-subtle)',
                  marginBottom: 'var(--spacing-md)'
                }}>
                  <p style={{ 
                    fontSize: 'var(--body-font-size)',
                    color: 'var(--colors-text-primary)',
                    fontStyle: 'italic'
                  }}>
                    "{payment.review}"
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-md">
                  <CheckCircle size={16} style={{ color: 'var(--colors-primary-limeText)' }} />
                  <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                    Completed: {payment.completedDate}
                  </span>
                </div>
                <button className="button button-outline">
                  <Download size={16} />
                  Download Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentEscrow;

