import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Edit,
  Star,
  Calendar,
  DollarSign,
  Users,
  Award,
  Shield,
  CheckCircle,
  Clock,
  MessageCircle,
  Eye,
  Plus,
  TrendingUp,
  MapPin,
  Globe,
  Mail,
  Phone,
  Building,
  FileText,
  Image,
  Video,
  Archive
} from 'lucide-react';

const ClientProfile = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock client data
  const clientData = {
    id: 1,
    name: 'Alex Chen',
    organization: 'CampusEats Startup',
    role: 'Founder & CEO',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    location: 'Stanford University, CA',
    joinedDate: 'Jan 2023',
    email: 'alex@campuseats.com',
    phone: '+1 (555) 123-4567',
    website: 'www.campuseats.com',
    description: 'Passionate entrepreneur building the next generation of campus food delivery. We connect students with local restaurants and food vendors to create a seamless dining experience.',
    stats: {
      totalProjects: 12,
      totalSpent: 3250,
      avgRating: 4.7,
      completedProjects: 10,
      activeProjects: 2,
      avgProjectValue: 270
    },
    verification: {
      email: true,
      phone: true,
      organization: true,
      payment: true
    }
  };

  const projects = [
    {
      id: 1,
      title: 'Modern Logo Design for Campus Startup',
      freelancer: 'Sarah Kim',
      budget: '$200',
      status: 'completed',
      completedDate: 'Dec 14, 2024',
      rating: 5,
      category: 'Graphics & Design'
    },
    {
      id: 2,
      title: 'Website Development',
      freelancer: 'Mike Chen',
      budget: '$800',
      status: 'completed',
      completedDate: 'Nov 28, 2024',
      rating: 4,
      category: 'Programming & Tech'
    },
    {
      id: 3,
      title: 'Social Media Campaign',
      freelancer: 'Emma Rodriguez',
      budget: '$350',
      status: 'completed',
      completedDate: 'Nov 15, 2024',
      rating: 5,
      category: 'Digital Marketing'
    },
    {
      id: 4,
      title: 'Mobile App UI/UX',
      freelancer: 'Alex Johnson',
      budget: '$1,200',
      status: 'in-progress',
      completedDate: null,
      rating: null,
      category: 'Programming & Tech'
    },
    {
      id: 5,
      title: 'Video Editing for Campus Event',
      freelancer: 'Maria Garcia',
      budget: '$300',
      status: 'open',
      completedDate: null,
      rating: null,
      category: 'Video & Animation'
    }
  ];

  const reviews = [
    {
      id: 1,
      freelancer: {
        name: 'Sarah Kim',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
      },
      project: 'Modern Logo Design for Campus Startup',
      rating: 5,
      comment: 'Alex was a great client to work with! Clear communication, quick feedback, and fair payment. Would definitely work with them again.',
      date: 'Dec 15, 2024'
    },
    {
      id: 2,
      freelancer: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      },
      project: 'Website Development',
      rating: 4,
      comment: 'Professional client with clear requirements. Payment was prompt and communication was excellent throughout the project.',
      date: 'Nov 30, 2024'
    },
    {
      id: 3,
      freelancer: {
        name: 'Emma Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
      },
      project: 'Social Media Campaign',
      rating: 5,
      comment: 'Alex provided great direction and was very responsive to questions. The project was completed smoothly and on time.',
      date: 'Nov 20, 2024'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Verified Organization',
      description: 'Organization details verified',
      icon: Shield,
      color: 'var(--colors-primary-lime)'
    },
    {
      id: 2,
      title: 'Top Spender',
      description: 'Spent over $3,000 on projects',
      icon: DollarSign,
      color: 'var(--colors-secondary-purple)'
    },
    {
      id: 3,
      title: 'Excellent Client',
      description: 'Maintains 4.7+ average rating',
      icon: Star,
      color: 'var(--colors-primary-limeText)'
    },
    {
      id: 4,
      title: 'Frequent Client',
      description: 'Posted 10+ projects',
      icon: Award,
      color: 'var(--colors-neutral-medium)'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'var(--colors-primary-lime)';
      case 'in-progress': return 'var(--colors-secondary-purple)';
      case 'open': return 'var(--colors-text-secondary)';
      default: return 'var(--colors-text-secondary)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'open': return Users;
      default: return Users;
    }
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
          Client Profile
        </h1>
        <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
          Manage your organization profile and showcase your work history
        </p>
      </div>

      {/* Profile Header */}
      <div className="card card-light" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="flex items-start gap-lg">
          <img
            src={clientData.avatar}
            alt={clientData.name}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-sm)' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>
                {clientData.name}
              </h2>
              <button className="button button-outline" style={{ fontSize: 'var(--metadata-font-size)', padding: '4px 8px' }}>
                <Edit size={14} />
                Edit Profile
              </button>
            </div>
            
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <h3 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                {clientData.organization}
              </h3>
              <p style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-secondary)' }}>
                {clientData.role}
              </p>
            </div>

            <div className="flex items-center gap-lg" style={{ marginBottom: 'var(--spacing-md)' }}>
              <div className="flex items-center gap-sm">
                <MapPin size={16} style={{ color: 'var(--colors-text-secondary)' }} />
                <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                  {clientData.location}
                </span>
              </div>
              <div className="flex items-center gap-sm">
                <Calendar size={16} style={{ color: 'var(--colors-text-secondary)' }} />
                <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                  Joined {clientData.joinedDate}
                </span>
              </div>
            </div>

            <p style={{ 
              fontSize: 'var(--body-font-size)', 
              color: 'var(--colors-text-secondary)',
              lineHeight: '1.6',
              marginBottom: 'var(--spacing-md)'
            }}>
              {clientData.description}
            </p>

            {/* Contact Info */}
            <div className="flex gap-lg" style={{ flexWrap: 'wrap' }}>
              <div className="flex items-center gap-sm">
                <Mail size={16} style={{ color: 'var(--colors-text-secondary)' }} />
                <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                  {clientData.email}
                </span>
              </div>
              <div className="flex items-center gap-sm">
                <Phone size={16} style={{ color: 'var(--colors-text-secondary)' }} />
                <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                  {clientData.phone}
                </span>
              </div>
              <div className="flex items-center gap-sm">
                <Globe size={16} style={{ color: 'var(--colors-text-secondary)' }} />
                <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                  {clientData.website}
                </span>
              </div>
            </div>
          </div>

          {/* Verification Badges */}
          <div>
            <h4 style={{ fontSize: 'var(--metadata-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              Verified
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              {Object.entries(clientData.verification).map(([key, verified]) => (
                <div key={key} className="flex items-center gap-sm">
                  <CheckCircle 
                    size={16} 
                    style={{ color: verified ? 'var(--colors-primary-lime)' : 'var(--colors-text-secondary)' }} 
                  />
                  <span style={{ 
                    fontSize: 'var(--metadata-font-size)', 
                    color: verified ? 'var(--colors-text-primary)' : 'var(--colors-text-secondary)',
                    textTransform: 'capitalize'
                  }}>
                    {key}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-4" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="card" style={{ backgroundColor: 'var(--colors-neutral-dark)', color: 'var(--colors-text-onDark)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: 'var(--body-font-size)', opacity: 0.8, marginBottom: 'var(--spacing-sm)' }}>
                Total Projects
              </p>
              <h2 style={{ fontSize: 'var(--metric-font-size)', fontWeight: '700' }}>
                {clientData.stats.totalProjects}
              </h2>
            </div>
            <FileText size={32} style={{ opacity: 0.7 }} />
          </div>
        </div>

        <div className="card" style={{ backgroundColor: 'var(--colors-primary-lime)', color: 'var(--colors-primary-limeText)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: 'var(--body-font-size)', opacity: 0.8, marginBottom: 'var(--spacing-sm)' }}>
                Total Spent
              </p>
              <h2 style={{ fontSize: 'var(--metric-font-size)', fontWeight: '700' }}>
                ${clientData.stats.totalSpent.toLocaleString()}
              </h2>
            </div>
            <DollarSign size={32} style={{ opacity: 0.7 }} />
          </div>
        </div>

        <div className="card" style={{ backgroundColor: 'var(--colors-secondary-purple)', color: 'var(--colors-text-primary)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: 'var(--body-font-size)', opacity: 0.8, marginBottom: 'var(--spacing-sm)' }}>
                Avg Rating
              </p>
              <h2 style={{ fontSize: 'var(--metric-font-size)', fontWeight: '700' }}>
                {clientData.stats.avgRating}
              </h2>
            </div>
            <Star size={32} style={{ opacity: 0.7 }} />
          </div>
        </div>

        <div className="card" style={{ backgroundColor: 'var(--colors-background-default)', color: 'var(--colors-text-primary)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: 'var(--body-font-size)', opacity: 0.8, marginBottom: 'var(--spacing-sm)' }}>
                Avg Project Value
              </p>
              <h2 style={{ fontSize: 'var(--metric-font-size)', fontWeight: '700' }}>
                ${clientData.stats.avgProjectValue}
              </h2>
            </div>
            <TrendingUp size={32} style={{ opacity: 0.7 }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card card-light" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="flex gap-sm">
          {tabs.map(tab => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="button"
                style={{
                  backgroundColor: activeTab === tab.id ? 'var(--colors-neutral-dark)' : 'var(--colors-background-surface)',
                  color: activeTab === tab.id ? 'var(--colors-text-onDark)' : 'var(--colors-text-primary)',
                  border: 'none',
                  fontSize: 'var(--body-font-size)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)'
                }}
              >
                <TabIcon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-2" style={{ gap: 'var(--spacing-xl)' }}>
          {/* Recent Projects */}
          <div className="card card-light">
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 className="heading">Recent Projects</h3>
              <Link to="/client/my-projects" style={{ color: 'var(--colors-text-secondary)', textDecoration: 'none' }}>
                View all
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              {projects.slice(0, 3).map(project => {
                const StatusIcon = getStatusIcon(project.status);
                return (
                  <div key={project.id} className="flex items-center justify-between" style={{
                    padding: 'var(--spacing-md)',
                    backgroundColor: 'var(--colors-background-surface)',
                    borderRadius: 'var(--border-radius-lg)',
                    border: '1px solid var(--colors-border-subtle)'
                  }}>
                    <div>
                      <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                        {project.title}
                      </div>
                      <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                        {project.freelancer} • {project.budget}
                      </div>
                    </div>
                    <div className="flex items-center gap-sm">
                      <StatusIcon size={16} style={{ color: getStatusColor(project.status) }} />
                      <span style={{ 
                        fontSize: 'var(--metadata-font-size)', 
                        color: getStatusColor(project.status),
                        textTransform: 'capitalize'
                      }}>
                        {project.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="card card-light">
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 className="heading">Recent Reviews</h3>
              <span style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--metadata-font-size)' }}>
                {reviews.length} reviews
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              {reviews.slice(0, 2).map(review => (
                <div key={review.id} style={{
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--colors-background-surface)',
                  borderRadius: 'var(--border-radius-lg)',
                  border: '1px solid var(--colors-border-subtle)'
                }}>
                  <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <img
                      src={review.freelancer.avatar}
                      alt={review.freelancer.name}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                    <div>
                      <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                        {review.freelancer.name}
                      </div>
                      <div className="flex items-center gap-sm">
                        <div className="flex gap-sm">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              size={12}
                              style={{
                                color: star <= review.rating ? 'var(--colors-primary-limeText)' : 'var(--colors-border-subtle)',
                                fill: star <= review.rating ? 'var(--colors-primary-limeText)' : 'none'
                              }}
                            />
                          ))}
                        </div>
                        <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p style={{ 
                    fontSize: 'var(--metadata-font-size)', 
                    color: 'var(--colors-text-secondary)',
                    lineHeight: '1.4'
                  }}>
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="card card-light">
          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 className="heading">All Projects</h3>
            <Link to="/client/post-project" className="button button-secondary">
              <Plus size={16} />
              Post New Project
            </Link>
          </div>
          <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
            {projects.map(project => {
              const StatusIcon = getStatusIcon(project.status);
              return (
                <div key={project.id} className="flex items-center justify-between" style={{
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--colors-background-surface)',
                  borderRadius: 'var(--border-radius-lg)',
                  border: '1px solid var(--colors-border-subtle)'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                      {project.title}
                    </div>
                    <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                      {project.freelancer} • {project.budget} • {project.category}
                    </div>
                    {project.completedDate && (
                      <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                        Completed: {project.completedDate}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-md">
                    {project.rating && (
                      <div className="flex items-center gap-sm">
                        <div className="flex gap-sm">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              size={14}
                              style={{
                                color: star <= project.rating ? 'var(--colors-primary-limeText)' : 'var(--colors-border-subtle)',
                                fill: star <= project.rating ? 'var(--colors-primary-limeText)' : 'none'
                              }}
                            />
                          ))}
                        </div>
                        <span style={{ fontSize: 'var(--metadata-font-size)', fontWeight: '600' }}>
                          {project.rating}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-sm">
                      <StatusIcon size={16} style={{ color: getStatusColor(project.status) }} />
                      <span style={{ 
                        fontSize: 'var(--metadata-font-size)', 
                        color: getStatusColor(project.status),
                        textTransform: 'capitalize'
                      }}>
                        {project.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="card card-light">
          <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
            Reviews from Freelancers
          </h3>
          <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
            {reviews.map(review => (
              <div key={review.id} style={{
                padding: 'var(--spacing-lg)',
                backgroundColor: 'var(--colors-background-surface)',
                borderRadius: 'var(--border-radius-lg)',
                border: '1px solid var(--colors-border-subtle)'
              }}>
                <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-md)' }}>
                  <img
                    src={review.freelancer.avatar}
                    alt={review.freelancer.name}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                      {review.freelancer.name}
                    </div>
                    <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                      {review.project}
                    </div>
                    <div className="flex items-center gap-sm">
                      <div className="flex gap-sm">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            size={16}
                            style={{
                              color: star <= review.rating ? 'var(--colors-primary-limeText)' : 'var(--colors-border-subtle)',
                              fill: star <= review.rating ? 'var(--colors-primary-limeText)' : 'none'
                            }}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p style={{ 
                  fontSize: 'var(--body-font-size)', 
                  color: 'var(--colors-text-primary)',
                  lineHeight: '1.6'
                }}>
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="card card-light">
          <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
            Achievements & Badges
          </h3>
          <div className="grid grid-2" style={{ gap: 'var(--spacing-lg)' }}>
            {achievements.map(achievement => {
              const AchievementIcon = achievement.icon;
              return (
                <div key={achievement.id} style={{
                  padding: 'var(--spacing-lg)',
                  backgroundColor: 'var(--colors-background-surface)',
                  borderRadius: 'var(--border-radius-lg)',
                  border: '1px solid var(--colors-border-subtle)',
                  textAlign: 'center'
                }}>
                  <AchievementIcon size={32} style={{ color: achievement.color, marginBottom: 'var(--spacing-md)' }} />
                  <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                    {achievement.title}
                  </h4>
                  <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientProfile;
