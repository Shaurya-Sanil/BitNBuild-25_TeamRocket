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
  Eye,
  CheckCircle,
  AlertCircle,
  FileText,
  Calendar
} from 'lucide-react';

const ClientDashboard = ({ user }) => {
  const stats = [
    {
      title: 'Active Projects',
      value: '4',
      change: '+2 this week',
      changeType: 'positive',
      icon: Briefcase,
      color: 'var(--colors-neutral-dark)'
    },
    {
      title: 'Pending Bids',
      value: '12',
      change: '+5 new',
      changeType: 'neutral',
      icon: FileText,
      color: 'var(--colors-background-default)'
    },
    {
      title: 'Total Spent',
      value: '$3,250',
      change: '+$450 this month',
      changeType: 'positive',
      icon: DollarSign,
      color: 'var(--colors-primary-lime)'
    },
    {
      title: 'Avg. Rating',
      value: '4.7',
      change: '+0.3',
      changeType: 'positive',
      icon: Star,
      color: 'var(--colors-secondary-purple)'
    }
  ];

  const recentProjects = [
    {
      id: 1,
      title: 'Logo Design for Campus Club',
      freelancer: 'Sarah Kim',
      budget: '$200',
      status: 'in-progress',
      deadline: 'Dec 15, 2024',
      progress: 75,
      bids: 8
    },
    {
      id: 2,
      title: 'Website Development',
      freelancer: 'Mike Chen',
      budget: '$800',
      status: 'review',
      deadline: 'Dec 20, 2024',
      progress: 95,
      bids: 12
    },
    {
      id: 3,
      title: 'Social Media Campaign',
      freelancer: 'Emma Rodriguez',
      budget: '$350',
      status: 'completed',
      deadline: 'Dec 10, 2024',
      progress: 100,
      bids: 15
    },
    {
      id: 4,
      title: 'Mobile App UI/UX',
      freelancer: 'Alex Johnson',
      budget: '$1,200',
      status: 'pending-bids',
      deadline: 'Jan 5, 2025',
      progress: 0,
      bids: 6
    }
  ];

  const recentBids = [
    {
      id: 1,
      projectTitle: 'Logo Design for Campus Club',
      freelancer: {
        name: 'David Park',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        rating: 4.9,
        completedProjects: 45
      },
      bidAmount: '$180',
      timeline: '1 week',
      message: 'I have extensive experience in logo design for campus organizations...',
      submittedDate: '2 hours ago'
    },
    {
      id: 2,
      projectTitle: 'Website Development',
      freelancer: {
        name: 'Lisa Wang',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        rating: 4.8,
        completedProjects: 32
      },
      bidAmount: '$750',
      timeline: '2 weeks',
      message: 'I specialize in React development and can deliver a modern, responsive website...',
      submittedDate: '4 hours ago'
    },
    {
      id: 3,
      projectTitle: 'Mobile App UI/UX',
      freelancer: {
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        rating: 4.7,
        completedProjects: 28
      },
      bidAmount: '$1,100',
      timeline: '3 weeks',
      message: 'I have 5+ years experience in mobile app design with a focus on user experience...',
      submittedDate: '6 hours ago'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'bid',
      title: 'New bid received',
      message: 'David Park submitted a bid for "Logo Design for Campus Club"',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      type: 'milestone',
      title: 'Milestone completed',
      message: 'Mike Chen completed "Wireframe Design" for Website Development project',
      time: '4 hours ago',
      unread: true
    },
    {
      id: 3,
      type: 'message',
      title: 'New message',
      message: 'Sarah Kim sent you a message about the Logo Design project',
      time: '6 hours ago',
      unread: false
    },
    {
      id: 4,
      type: 'delivery',
      title: 'Project delivered',
      message: 'Emma Rodriguez delivered the final files for Social Media Campaign',
      time: '1 day ago',
      unread: false
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'in-progress': 'var(--colors-primary-lime)',
      'review': 'var(--colors-secondary-purple)',
      'completed': 'var(--colors-neutral-medium)',
      'pending-bids': 'var(--colors-text-secondary)'
    };
    return colors[status] || 'var(--colors-text-secondary)';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in-progress': return Clock;
      case 'review': return Eye;
      case 'completed': return CheckCircle;
      case 'pending-bids': return AlertCircle;
      default: return Briefcase;
    }
  };

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
              Welcome back, {user?.displayName?.split(' ')[0] || 'User'}! 👋
            </h1>
            <p style={{ color: 'var(--colors-text-onDarkSecondary)', fontSize: 'var(--body-font-size)' }}>
              You have 4 active projects and 12 pending bids. Here's your project overview.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <Link to="/client/post-project" className="button button-secondary">
              <Plus size={16} />
              Post New Project
            </Link>
            <Link to="/client/browse-freelancers" className="button button-outline" style={{ color: 'var(--colors-text-onDark)', borderColor: 'var(--colors-text-onDarkSecondary)' }}>
              <Users size={16} />
              Browse Freelancers
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
            <h3 className="heading">My Projects</h3>
            <Link 
              to="/client/my-projects" 
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
            {recentProjects.map((project) => {
              const StatusIcon = getStatusIcon(project.status);
              return (
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
                  
                  <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <p style={{ 
                      fontSize: 'var(--metadata-font-size)', 
                      color: 'var(--colors-text-secondary)'
                    }}>
                      {project.freelancer ? `Freelancer: ${project.freelancer}` : 'Awaiting freelancer'} • Due: {project.deadline}
                    </p>
                    <div className="flex items-center gap-sm">
                      <StatusIcon size={14} style={{ color: getStatusColor(project.status) }} />
                      <span style={{ 
                        fontSize: 'var(--metadata-font-size)', 
                        color: getStatusColor(project.status),
                        textTransform: 'capitalize'
                      }}>
                        {project.status.replace('-', ' ')}
                      </span>
                    </div>
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
                  
                  {project.bids > 0 && (
                    <div style={{ marginTop: 'var(--spacing-sm)' }}>
                      <Link 
                        to={`/client/project/${project.id}/bids`}
                        style={{ 
                          fontSize: 'var(--metadata-font-size)', 
                          color: 'var(--colors-secondary-purpleText)',
                          textDecoration: 'none'
                        }}
                      >
                        View {project.bids} bids →
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Bids */}
        <div className="card card-light">
          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 className="heading">Recent Bids</h3>
            <Link 
              to="/client/view-bids" 
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
            {recentBids.map((bid) => (
              <div 
                key={bid.id}
                style={{
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--colors-background-surface)',
                  borderRadius: 'var(--border-radius-lg)',
                  border: '1px solid var(--colors-border-subtle)'
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                  <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                    {bid.projectTitle}
                  </h4>
                  <span style={{ 
                    fontSize: 'var(--body-font-size)', 
                    fontWeight: '600',
                    color: 'var(--colors-primary-limeText)'
                  }}>
                    {bid.bidAmount}
                  </span>
                </div>
                
                <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-sm)' }}>
                  <img
                    src={bid.freelancer.avatar}
                    alt={bid.freelancer.name}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                      {bid.freelancer.name}
                    </div>
                    <div className="flex items-center gap-sm">
                      <Star size={12} style={{ color: 'var(--colors-primary-limeText)' }} />
                      <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                        {bid.freelancer.rating} ({bid.freelancer.completedProjects} projects)
                      </span>
                    </div>
                  </div>
                </div>
                
                <p style={{ 
                  fontSize: 'var(--metadata-font-size)', 
                  color: 'var(--colors-text-secondary)',
                  marginBottom: 'var(--spacing-sm)',
                  lineHeight: '1.4'
                }}>
                  {bid.message.substring(0, 80)}...
                </p>
                
                <div className="flex items-center justify-between">
                  <span style={{ 
                    fontSize: 'var(--metadata-font-size)', 
                    color: 'var(--colors-text-secondary)'
                  }}>
                    {bid.timeline} • {bid.submittedDate}
                  </span>
                  <div className="flex gap-sm">
                    <button className="button button-outline" style={{ fontSize: 'var(--metadata-font-size)', padding: '4px 8px' }}>
                      View Details
                    </button>
                    <button className="button button-primary" style={{ fontSize: 'var(--metadata-font-size)', padding: '4px 8px' }}>
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      <div className="card card-light" style={{ marginTop: 'var(--spacing-xl)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
          <h3 className="heading">Notifications</h3>
          <span style={{ 
            fontSize: 'var(--metadata-font-size)', 
            color: 'var(--colors-text-secondary)'
          }}>
            {notifications.filter(n => n.unread).length} unread
          </span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              style={{
                padding: 'var(--spacing-md)',
                backgroundColor: notification.unread ? 'var(--colors-primary-lime)' : 'var(--colors-background-surface)',
                borderRadius: 'var(--border-radius-lg)',
                border: '1px solid var(--colors-border-subtle)',
                opacity: notification.unread ? 1 : 0.8
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 style={{ 
                    fontSize: 'var(--body-font-size)', 
                    fontWeight: '600',
                    marginBottom: 'var(--spacing-sm)'
                  }}>
                    {notification.title}
                  </h4>
                  <p style={{ 
                    fontSize: 'var(--metadata-font-size)', 
                    color: 'var(--colors-text-secondary)'
                  }}>
                    {notification.message}
                  </p>
                </div>
                <span style={{ 
                  fontSize: 'var(--metadata-font-size)', 
                  color: 'var(--colors-text-secondary)'
                }}>
                  {notification.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
