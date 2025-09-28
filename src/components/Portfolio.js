import React, { useState } from 'react';
import { 
  Star, 
  TrendingUp, 
  Award, 
  Users, 
  Calendar, 
  DollarSign,
  Eye,
  Download,
  Share,
  Plus,
  Filter,
  Grid,
  List,
  ExternalLink,
  CheckCircle,
  Clock,
  MessageCircle,
  ThumbsUp
} from 'lucide-react';

const Portfolio = ({ user }) => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [viewMode, setViewMode] = useState('grid');
  const [activeFilter, setActiveFilter] = useState('all');

  // Safe display values when `user` may be null
  const displayName = user?.name || 'Guest User';
  const displayAvatar = user?.avatar || null;
  const displayUniversity = user?.university || '';
  const initials = displayName.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();

  const stats = {
    totalProjects: 15,
    completedProjects: 12,
    activeProjects: 3,
    totalEarnings: 2450,
    averageRating: 4.8,
    responseTime: '2 hours',
    completionRate: 98
  };

  const portfolioItems = [
    {
      id: 1,
      title: 'Modern Logo Design for Tech Startup',
      category: 'Design',
      description: 'Created a minimalist, modern logo for a campus-based tech startup. The design reflects innovation and trust while maintaining simplicity.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      client: 'Tech Society',
      completedDate: 'Nov 28, 2024',
      earnings: 150,
      rating: 5,
      review: 'Absolutely amazing work! Alex delivered exactly what we envisioned and more.',
      tags: ['Logo Design', 'Branding', 'Minimalist'],
      skills: ['Adobe Illustrator', 'Photoshop', 'Brand Strategy']
    },
    {
      id: 2,
      title: 'Responsive Website Development',
      category: 'Development',
      description: 'Built a fully responsive website for a local restaurant with online ordering system, menu management, and customer reviews.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      client: 'Local Restaurant',
      completedDate: 'Nov 15, 2024',
      earnings: 800,
      rating: 5,
      review: 'Professional development work. The website exceeded our expectations and our customers love it!',
      tags: ['React', 'Node.js', 'MongoDB', 'Responsive Design'],
      skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'CSS']
    },
    {
      id: 3,
      title: 'Academic Writing - Research Paper',
      category: 'Writing',
      description: 'Assisted with research and writing for a 20-page academic paper on sustainable energy solutions. Provided structuring, editing, and proofreading services.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      client: 'Emma Rodriguez',
      completedDate: 'Oct 30, 2024',
      earnings: 200,
      rating: 4,
      review: 'Great help with structuring and research. The paper was well-written and delivered on time.',
      tags: ['Academic Writing', 'Research', 'Editing'],
      skills: ['Academic Writing', 'Research', 'Proofreading', 'Citation']
    },
    {
      id: 4,
      title: 'Social Media Marketing Campaign',
      category: 'Marketing',
      description: 'Developed and executed a comprehensive social media strategy for a campus event. Created engaging content, managed posting schedule, and tracked analytics.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
      client: 'Campus Events',
      completedDate: 'Oct 20, 2024',
      earnings: 300,
      rating: 5,
      review: 'Excellent social media strategy! Our event attendance increased by 40% thanks to the campaign.',
      tags: ['Social Media', 'Content Creation', 'Analytics'],
      skills: ['Social Media Marketing', 'Content Creation', 'Analytics', 'Design']
    },
    {
      id: 5,
      title: 'Mobile App UI/UX Design',
      category: 'Design',
      description: 'Designed user interface and user experience for a fitness tracking mobile app. Created wireframes, prototypes, and final designs.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
      client: 'FitTracker Inc',
      completedDate: 'Oct 10, 2024',
      earnings: 450,
      rating: 4,
      review: 'Beautiful and intuitive design. The app is easy to use and visually appealing.',
      tags: ['UI/UX Design', 'Mobile App', 'Prototyping'],
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research']
    },
    {
      id: 6,
      title: 'Calculus Tutoring Sessions',
      category: 'Tutoring',
      description: 'Provided one-on-one tutoring sessions for advanced calculus topics. Helped student improve from C+ to A- grade.',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop',
      client: 'Sarah Johnson',
      completedDate: 'Sep 25, 2024',
      earnings: 180,
      rating: 5,
      review: 'Alex is an incredible tutor! Patient, knowledgeable, and great at explaining complex concepts.',
      tags: ['Mathematics', 'Online Tutoring', 'Advanced Calculus'],
      skills: ['Mathematics', 'Teaching', 'Problem Solving', 'Communication']
    }
  ];

  const reviews = [
    {
      id: 1,
      client: 'Tech Society',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      review: 'Absolutely amazing work! Alex delivered exactly what we envisioned and more. The logo perfectly represents our brand identity.',
      project: 'Modern Logo Design for Tech Startup',
      date: 'Nov 28, 2024'
    },
    {
      id: 2,
      client: 'Local Restaurant',
      clientAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      review: 'Professional development work. The website exceeded our expectations and our customers love it! Highly recommend.',
      project: 'Responsive Website Development',
      date: 'Nov 15, 2024'
    },
    {
      id: 3,
      client: 'Sarah Johnson',
      clientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      review: 'Alex is an incredible tutor! Patient, knowledgeable, and great at explaining complex concepts. My grade improved significantly.',
      project: 'Calculus Tutoring Sessions',
      date: 'Sep 25, 2024'
    },
    {
      id: 4,
      client: 'Campus Events',
      clientAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      review: 'Excellent social media strategy! Our event attendance increased by 40% thanks to the campaign. Will definitely work together again.',
      project: 'Social Media Marketing Campaign',
      date: 'Oct 20, 2024'
    }
  ];

  const skills = [
    { name: 'Web Development', level: 95, projects: 8 },
    { name: 'Graphic Design', level: 90, projects: 6 },
    { name: 'Academic Writing', level: 85, projects: 4 },
    { name: 'Social Media Marketing', level: 80, projects: 3 },
    { name: 'Tutoring', level: 95, projects: 5 },
    { name: 'UI/UX Design', level: 88, projects: 4 }
  ];

  const categories = ['all', 'design', 'development', 'writing', 'marketing', 'tutoring'];
  
  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category.toLowerCase() === activeFilter);

  const getCategoryColor = (category) => {
    const colors = {
      'Design': 'var(--colors-secondary-purple)',
      'Development': 'var(--colors-primary-lime)',
      'Writing': 'var(--colors-neutral-medium)',
      'Marketing': 'var(--colors-secondary-purple)',
      'Tutoring': 'var(--colors-primary-lime)'
    };
    return colors[category] || 'var(--colors-neutral-light)';
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-md)' }}>
          {displayAvatar ? (
            <img
              src={displayAvatar}
              alt={displayName}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'var(--colors-neutral-medium)',
              color: 'var(--colors-text-onDark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1.25rem'
            }}>
              {initials}
            </div>
          )}
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
              {displayName}
            </h1>
            <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
              {displayUniversity} {displayUniversity ? '• Student Freelancer' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-4" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="card card-dark">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: 'var(--colors-text-onDarkSecondary)', fontSize: 'var(--body-font-size)' }}>
                Total Projects
              </p>
              <h2 style={{ fontSize: 'var(--metric-font-size)', fontWeight: '700', color: 'var(--colors-text-onDark)' }}>
                {stats.totalProjects}
              </h2>
            </div>
            <Award size={32} style={{ color: 'var(--colors-text-onDarkSecondary)' }} />
          </div>
        </div>

        <div className="card card-purple">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: 'var(--colors-secondary-purpleText)', fontSize: 'var(--body-font-size)' }}>
                Average Rating
              </p>
              <h2 style={{ fontSize: 'var(--metric-font-size)', fontWeight: '700', color: 'var(--colors-secondary-purpleText)' }}>
                {stats.averageRating}
              </h2>
            </div>
            <Star size={32} style={{ color: 'var(--colors-secondary-purpleText)' }} />
          </div>
        </div>

        <div className="card card-lime">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: 'var(--colors-primary-limeText)', fontSize: 'var(--body-font-size)' }}>
                Total Earnings
              </p>
              <h2 style={{ fontSize: 'var(--metric-font-size)', fontWeight: '700', color: 'var(--colors-primary-limeText)' }}>
                ${stats.totalEarnings}
              </h2>
            </div>
            <DollarSign size={32} style={{ color: 'var(--colors-primary-limeText)' }} />
          </div>
        </div>

        <div className="card card-light">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
                Completion Rate
              </p>
              <h2 style={{ fontSize: 'var(--metric-font-size)', fontWeight: '700', color: 'var(--colors-text-primary)' }}>
                {stats.completionRate}%
              </h2>
            </div>
            <CheckCircle size={32} style={{ color: 'var(--colors-primary-limeText)' }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-sm" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <button
          onClick={() => setActiveTab('portfolio')}
          className="button"
          style={{
            backgroundColor: activeTab === 'portfolio' ? 'var(--colors-neutral-dark)' : 'var(--colors-background-surface)',
            color: activeTab === 'portfolio' ? 'var(--colors-text-onDark)' : 'var(--colors-text-primary)'
          }}
        >
          Portfolio ({portfolioItems.length})
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className="button"
          style={{
            backgroundColor: activeTab === 'reviews' ? 'var(--colors-neutral-dark)' : 'var(--colors-background-surface)',
            color: activeTab === 'reviews' ? 'var(--colors-text-onDark)' : 'var(--colors-text-primary)'
          }}
        >
          Reviews ({reviews.length})
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className="button"
          style={{
            backgroundColor: activeTab === 'skills' ? 'var(--colors-neutral-dark)' : 'var(--colors-background-surface)',
            color: activeTab === 'skills' ? 'var(--colors-text-onDark)' : 'var(--colors-text-primary)'
          }}
        >
          Skills
        </button>
      </div>

      {/* Portfolio Tab */}
      {activeTab === 'portfolio' && (
        <>
          {/* Filters and View Mode */}
          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <div className="flex gap-sm">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className="button"
                  style={{
                    backgroundColor: activeFilter === category ? 'var(--colors-neutral-dark)' : 'var(--colors-background-surface)',
                    color: activeFilter === category ? 'var(--colors-text-onDark)' : 'var(--colors-text-primary)',
                    textTransform: 'capitalize'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex gap-sm">
              <button
                onClick={() => setViewMode('grid')}
                className="button"
                style={{
                  backgroundColor: viewMode === 'grid' ? 'var(--colors-neutral-dark)' : 'var(--colors-background-surface)',
                  color: viewMode === 'grid' ? 'var(--colors-text-onDark)' : 'var(--colors-text-primary)'
                }}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className="button"
                style={{
                  backgroundColor: viewMode === 'list' ? 'var(--colors-neutral-dark)' : 'var(--colors-background-surface)',
                  color: viewMode === 'list' ? 'var(--colors-text-onDark)' : 'var(--colors-text-primary)'
                }}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div 
            className={viewMode === 'grid' ? 'grid grid-3' : ''} 
            style={{ gap: 'var(--spacing-lg)' }}
          >
            {filteredItems.map(item => (
              <div key={item.id} className="card card-light">
                <div style={{ position: 'relative', marginBottom: 'var(--spacing-md)' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: 'var(--border-radius-lg)'
                    }}
                  />
                  <span 
                    style={{
                      position: 'absolute',
                      top: 'var(--spacing-sm)',
                      left: 'var(--spacing-sm)',
                      padding: '4px 8px',
                      borderRadius: 'var(--border-radius-md)',
                      backgroundColor: getCategoryColor(item.category),
                      color: 'var(--colors-text-primary)',
                      fontSize: 'var(--metadata-font-size)',
                      fontWeight: '600'
                    }}
                  >
                    {item.category}
                  </span>
                  <span 
                    style={{
                      position: 'absolute',
                      top: 'var(--spacing-sm)',
                      right: 'var(--spacing-sm)',
                      padding: '4px 8px',
                      borderRadius: 'var(--border-radius-md)',
                      backgroundColor: 'var(--colors-neutral-dark)',
                      color: 'var(--colors-text-onDark)',
                      fontSize: 'var(--metadata-font-size)',
                      fontWeight: '600'
                    }}
                  >
                    ${item.earnings}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                  {item.title}
                </h3>
                
                <p style={{ 
                  color: 'var(--colors-text-secondary)', 
                  fontSize: 'var(--body-font-size)',
                  marginBottom: 'var(--spacing-md)',
                  lineHeight: '1.6'
                }}>
                  {item.description}
                </p>

                <div className="flex gap-sm" style={{ marginBottom: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                  {item.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag}
                      style={{
                        padding: '2px 6px',
                        backgroundColor: 'var(--colors-background-surface)',
                        borderRadius: 'var(--border-radius-md)',
                        fontSize: 'var(--metadata-font-size)',
                        color: 'var(--colors-text-secondary)',
                        border: '1px solid var(--colors-border-subtle)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-md)' }}>
                  <div className="flex items-center gap-sm">
                    <Star size={16} style={{ color: 'var(--colors-primary-limeText)' }} />
                    <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                      {item.rating}/5
                    </span>
                  </div>
                  <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                    {item.completedDate}
                  </span>
                </div>

                <div className="flex gap-sm">
                  <button className="button button-outline" style={{ flex: 1 }}>
                    <Eye size={16} />
                    View
                  </button>
                  <button className="button button-outline">
                    <Share size={16} />
                  </button>
                  <button className="button button-outline">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
          {reviews.map(review => (
            <div key={review.id} className="card card-light">
              <div className="flex items-start gap-md">
                <img
                  src={review.clientAvatar}
                  alt={review.client}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                      {review.client}
                    </h4>
                    <div className="flex items-center gap-sm">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          style={{ 
                            color: i < review.rating ? 'var(--colors-primary-limeText)' : 'var(--colors-border-subtle)',
                            fill: i < review.rating ? 'var(--colors-primary-limeText)' : 'none'
                          }} 
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                      {review.date}
                    </span>
                  </div>
                  
                  <p style={{ 
                    fontSize: 'var(--body-font-size)', 
                    color: 'var(--colors-text-primary)',
                    marginBottom: 'var(--spacing-sm)',
                    lineHeight: '1.6'
                  }}>
                    {review.review}
                  </p>
                  
                  <p style={{ 
                    fontSize: 'var(--metadata-font-size)', 
                    color: 'var(--colors-text-secondary)'
                  }}>
                    Project: {review.project}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div className="grid grid-2" style={{ gap: 'var(--spacing-xl)' }}>
          <div className="card card-light">
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 'var(--spacing-lg)' }}>
              Technical Skills
            </h3>
            <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
              {skills.map(skill => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                      {skill.name}
                    </span>
                    <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                      {skill.projects} projects
                    </span>
                  </div>
                  <div style={{ 
                    height: '8px', 
                    backgroundColor: 'var(--colors-background-surface)', 
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${skill.level}%`,
                      height: '100%',
                      backgroundColor: 'var(--colors-secondary-purple)',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card card-light">
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 'var(--spacing-lg)' }}>
              Performance Metrics
            </h3>
            <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 'var(--body-font-size)' }}>Response Time</span>
                <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', color: 'var(--colors-primary-limeText)' }}>
                  {stats.responseTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 'var(--body-font-size)' }}>Completion Rate</span>
                <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', color: 'var(--colors-primary-limeText)' }}>
                  {stats.completionRate}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 'var(--body-font-size)' }}>Client Satisfaction</span>
                <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', color: 'var(--colors-primary-limeText)' }}>
                  {stats.averageRating}/5
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 'var(--body-font-size)' }}>Repeat Clients</span>
                <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', color: 'var(--colors-primary-limeText)' }}>
                  75%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;

