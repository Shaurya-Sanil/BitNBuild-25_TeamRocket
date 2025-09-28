import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock,
  Briefcase,
  MessageCircle,
  Star,
  ArrowUpRight,
  Plus,
  Eye
} from 'lucide-react';

const Dashboard = ({ user }) => {
  const displayName = user?.displayName || 'Guest User';
  const firstName = displayName.split(' ')[0];
  const stats = [
    {
      title: 'Active Projects',
      value: '3',
      change: '+12%',
      changeType: 'positive',
      icon: Briefcase,
      color: 'var(--colors-neutral-dark)'
    },
    {
      title: 'Messages',
      value: '8',
      change: '+3 new',
      changeType: 'neutral',
      icon: MessageCircle,
      color: 'var(--colors-background-default)'
    },
    {
      title: 'Earnings',
      value: '$2,450',
      change: '+18%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'var(--colors-primary-lime)'
    },
    {
      title: 'Reputation',
      value: '4.8',
      change: '+0.2',
      changeType: 'positive',
      icon: Star,
      color: 'var(--colors-secondary-purple)'
    }
  ];

  const recentProjects = [
    {
      id: 1,
      title: 'Logo Design for Campus Club',
      client: 'Tech Society',
      budget: '$150',
      status: 'in-progress',
      deadline: 'Dec 15, 2024',
      progress: 65
    },
    {
      id: 2,
      title: 'Website Development',
      client: 'Local Restaurant',
      budget: '$800',
      status: 'review',
      deadline: 'Dec 20, 2024',
      progress: 90
    },
    {
      id: 3,
      title: 'Tutoring - Calculus',
      client: 'Sarah Johnson',
      budget: '$200',
      status: 'completed',
      deadline: 'Dec 10, 2024',
      progress: 100
    }
  ];

  const marketTrends = [
    { skill: 'Web Development', demand: 85, avgRate: '$45/hr' },
    { skill: 'Graphic Design', demand: 72, avgRate: '$35/hr' },
    { skill: 'Content Writing', demand: 68, avgRate: '$25/hr' },
    { skill: 'Tutoring', demand: 91, avgRate: '$30/hr' }
  ];

  const topFreelancers = [
    { id: 1, name: 'Aisha Khan', role: 'UI/UX Designer', rate: '$30/hr', rating: 4.9 },
    { id: 2, name: 'Liam Chen', role: 'Full-Stack Developer', rate: '$50/hr', rating: 4.8 },
    { id: 3, name: 'Maya Patel', role: 'Content Writer', rate: '$28/hr', rating: 4.7 },
    { id: 4, name: 'Diego Ruiz', role: 'SEO Specialist', rate: '$35/hr', rating: 4.6 }
  ];

  const activeOrders = [
    { id: 101, title: 'Mobile App UI', client: 'Campus Club', due: 'Oct 4', status: 'in-progress' },
    { id: 102, title: 'SEO Audit', client: 'Local Bakery', due: 'Oct 10', status: 'pending' },
    { id: 103, title: 'Landing Page', client: 'Startup Lab', due: 'Oct 18', status: 'review' }
  ];

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xl)' }}>
      {/* Welcome Section */}
      <div 
        className="card card-dark"
        style={{ marginBottom: 'var(--spacing-xl)' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
              Welcome back, {firstName}! 👋
            </h1>
            <p style={{ color: 'var(--colors-text-onDarkSecondary)', fontSize: 'var(--body-font-size)' }}>
              You have 3 active projects and 8 new messages. Here's what's happening on GigCampus today.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <Link to="/marketplace" className="button button-secondary">
              <Plus size={16} />
              New Project
            </Link>
            <Link to="/chat" className="button button-outline" style={{ color: 'var(--colors-text-onDark)', borderColor: 'var(--colors-text-onDarkSecondary)' }}>
              <MessageCircle size={16} />
              View Messages
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-4" style={{ marginBottom: 'var(--spacing-xl)' }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className="card"
              style={{ 
                backgroundColor: stat.color,
                color: stat.color === 'var(--colors-neutral-dark)' ? 'var(--colors-text-onDark)' : 'var(--colors-text-primary)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ 
                    fontSize: 'var(--body-font-size)', 
                    opacity: 0.8,
                    marginBottom: 'var(--spacing-sm)'
                  }}>
                    {stat.title}
                  </p>
                  <h2 style={{ 
                    fontSize: 'var(--metric-font-size)', 
                    fontWeight: '700',
                    marginBottom: 'var(--spacing-sm)'
                  }}>
                    {stat.value}
                  </h2>
                  <span style={{ 
                    fontSize: 'var(--metadata-font-size)',
                    color: stat.changeType === 'positive' ? 'var(--colors-primary-limeText)' : 'inherit'
                  }}>
                    {stat.change}
                  </span>
                </div>
                <Icon size={32} style={{ opacity: 0.7 }} />
              </div>
            </div>
          );
        })}
      </div>

  <div className="grid grid-2" style={{ gap: 'var(--spacing-xl)' }}>
        {/* Recent Projects */}
        <div className="card card-light">
          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 className="heading">Recent Projects</h3>
            <Link 
              to="/marketplace" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--spacing-sm)',
                color: 'var(--colors-text-secondary)',
                textDecoration: 'none',
                fontSize: 'var(--body-font-size)'
              }}
            >
              View all
              <ArrowUpRight size={16} />
            </Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {recentProjects.map((project) => (
              <div 
                key={project.id}
                style={{
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--colors-background-surface)',
                  borderRadius: 'var(--border-radius-lg)',
                  border: '1px solid var(--colors-border-subtle)'
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                  <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                    {project.title}
                  </h4>
                  <span style={{ 
                    fontSize: 'var(--body-font-size)', 
                    fontWeight: '600',
                    color: 'var(--colors-primary-limeText)'
                  }}>
                    {project.budget}
                  </span>
                </div>
                
                <p style={{ 
                  fontSize: 'var(--metadata-font-size)', 
                  color: 'var(--colors-text-secondary)',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Client: {project.client} • Due: {project.deadline}
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  <div style={{ 
                    flex: 1, 
                    height: '6px', 
                    backgroundColor: 'var(--colors-border-subtle)', 
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${project.progress}%`,
                      height: '100%',
                      backgroundColor: project.status === 'completed' ? 'var(--colors-primary-lime)' : 'var(--colors-secondary-purple)',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <span style={{ fontSize: 'var(--metadata-font-size)', fontWeight: '600' }}>
                    {project.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Trends */}
        <div className="card card-light">
          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 className="heading">Market Trends</h3>
            <Eye size={20} style={{ color: 'var(--colors-text-secondary)' }} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {marketTrends.map((trend, index) => (
              <div 
                key={index}
                style={{
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--colors-background-surface)',
                  borderRadius: 'var(--border-radius-lg)'
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                  <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                    {trend.skill}
                  </h4>
                  <span style={{ 
                    fontSize: 'var(--body-font-size)', 
                    fontWeight: '600',
                    color: 'var(--colors-secondary-purpleText)'
                  }}>
                    {trend.avgRate}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  <div style={{ 
                    flex: 1, 
                    height: '6px', 
                    backgroundColor: 'var(--colors-border-subtle)', 
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${trend.demand}%`,
                      height: '100%',
                      backgroundColor: 'var(--colors-primary-lime)',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <span style={{ fontSize: 'var(--metadata-font-size)', fontWeight: '600' }}>
                    {trend.demand}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Extra Dashboard Sections */}
      <div className="grid grid-3" style={{ marginTop: 'var(--spacing-xl)', gap: 'var(--spacing-lg)' }}>
        {/* Top Freelancers */}
        <div className="card card-light">
          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 className="heading">Top Freelancers</h3>
            <Link to="/browse" style={{ color: 'var(--colors-text-secondary)', textDecoration: 'none' }}>See all</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {topFreelancers.map(f => (
              <div key={f.id} className="flex items-center justify-between" style={{ gap: 'var(--spacing-sm)' }}>
                <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 9999, backgroundColor: 'var(--colors-neutral-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {f.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{f.name}</div>
                    <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>{f.role}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700 }}>{f.rate}</div>
                  <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                    <Star size={14} style={{ color: 'var(--colors-primary-lime)' }} /> {f.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings Overview */}
        <div className="card card-light">
          <div style={{ marginBottom: 'var(--spacing-lg)' }} className="flex items-center justify-between">
            <h3 className="heading">Earnings Overview</h3>
            <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>September</div>
          </div>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 'var(--spacing-sm)' }}>$3,420</h2>
            <div style={{ color: 'var(--colors-text-secondary)', marginBottom: 'var(--spacing-md)' }}>+24% vs last month</div>
            {/* simple sparkline placeholder */}
            <div style={{ height: 48, background: 'linear-gradient(90deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))', borderRadius: 8 }} />
          </div>
        </div>

        {/* Active Orders */}
        <div className="card card-light">
          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 className="heading">Active Orders</h3>
            <Link to="/orders" style={{ color: 'var(--colors-text-secondary)', textDecoration: 'none' }}>Manage</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            {activeOrders.map(o => (
              <div key={o.id} className="flex items-center justify-between" style={{ padding: 'var(--spacing-sm)', borderRadius: 'var(--border-radius-md)', backgroundColor: 'var(--colors-background-surface)' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{o.title}</div>
                  <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>{o.client} • Due {o.due}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.85rem', padding: '4px 8px', borderRadius: 20, backgroundColor: o.status === 'in-progress' ? 'var(--colors-primary-lime)' : o.status === 'pending' ? 'var(--colors-neutral-medium)' : 'var(--colors-secondary-purple)', color: 'var(--colors-primary-limeText)', fontWeight: 700 }}>
                    {o.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

