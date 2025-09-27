import React, { useState } from 'react';
import { 
  Filter, 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  User,
  Star,
  MessageCircle,
  Plus,
  Calendar,
  Tag,
  Eye,
  Heart
} from 'lucide-react';
import ProjectModal from './ProjectModal';
import ProposalModal from './ProposalModal';

const ProjectMarketplace = ({ user }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [likedProjects, setLikedProjects] = useState(new Set());

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'design', label: 'Design' },
    { id: 'development', label: 'Development' },
    { id: 'writing', label: 'Writing' },
    { id: 'tutoring', label: 'Tutoring' },
    { id: 'marketing', label: 'Marketing' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Modern Logo Design for Campus Startup',
      description: 'Looking for a talented designer to create a modern, minimalist logo for our campus-based food delivery startup. Should reflect innovation and trust.',
      client: {
        name: 'CampusEats',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        rating: 4.9,
        completedProjects: 45
      },
      budget: '$200 - $400',
      timeline: '1-2 weeks',
      category: 'design',
      tags: ['Logo Design', 'Branding', 'Minimalist'],
      location: 'Stanford University',
      postedDate: '2 hours ago',
      proposals: 12,
      status: 'open'
    },
    {
      id: 2,
      title: 'React Native Mobile App Development',
      description: 'Need a skilled developer to build a fitness tracking app for iOS and Android. Should include user authentication, workout tracking, and progress visualization.',
      client: {
        name: 'FitTracker Inc',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        rating: 4.7,
        completedProjects: 23
      },
      budget: '$800 - $1500',
      timeline: '3-4 weeks',
      category: 'development',
      tags: ['React Native', 'Mobile App', 'Fitness'],
      location: 'UC Berkeley',
      postedDate: '4 hours ago',
      proposals: 8,
      status: 'open'
    },
    {
      id: 3,
      title: 'Academic Writing & Research Assistance',
      description: 'Seeking help with a 15-page research paper on sustainable energy solutions. Need assistance with research, structuring, and proofreading.',
      client: {
        name: 'Emma Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        rating: 4.8,
        completedProjects: 67
      },
      budget: '$150 - $250',
      timeline: '1 week',
      category: 'writing',
      tags: ['Academic Writing', 'Research', 'Proofreading'],
      location: 'MIT',
      postedDate: '6 hours ago',
      proposals: 15,
      status: 'open'
    },
    {
      id: 4,
      title: 'Calculus Tutoring - Advanced Topics',
      description: 'Need a tutor for advanced calculus topics including multivariable calculus and differential equations. Sessions will be online via video call.',
      client: {
        name: 'David Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        rating: 4.6,
        completedProjects: 34
      },
      budget: '$30 - $50/hr',
      timeline: 'Ongoing',
      category: 'tutoring',
      tags: ['Mathematics', 'Online Tutoring', 'Advanced Calculus'],
      location: 'Harvard University',
      postedDate: '1 day ago',
      proposals: 6,
      status: 'open'
    },
    {
      id: 5,
      title: 'Social Media Marketing Campaign',
      description: 'Help launch our new product with a comprehensive social media strategy. Need content creation, scheduling, and engagement strategies for Instagram, TikTok, and LinkedIn.',
      client: {
        name: 'TechStart Solutions',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
        rating: 4.9,
        completedProjects: 89
      },
      budget: '$400 - $700',
      timeline: '2-3 weeks',
      category: 'marketing',
      tags: ['Social Media', 'Content Creation', 'Marketing Strategy'],
      location: 'NYU',
      postedDate: '2 days ago',
      proposals: 20,
      status: 'open'
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleSubmitProposal = (project) => {
    setSelectedProject(project);
    setIsProposalModalOpen(true);
  };

  const handleProposalSubmit = (proposalData) => {
    console.log('Proposal submitted:', proposalData);
    // In a real app, this would submit to the backend
    alert('Proposal submitted successfully!');
  };

  const toggleLike = (projectId) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      design: 'var(--colors-secondary-purple)',
      development: 'var(--colors-primary-lime)',
      writing: 'var(--colors-neutral-medium)',
      tutoring: 'var(--colors-secondary-purple)',
      marketing: 'var(--colors-primary-lime)'
    };
    return colors[category] || 'var(--colors-neutral-light)';
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: 'var(--spacing-md)' }}>
          Project Marketplace
        </h1>
        <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
          Discover opportunities that match your skills and interests. Connect with clients from your university and local community.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="card card-light" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="flex items-center gap-lg" style={{ marginBottom: 'var(--spacing-lg)' }}>
          <Filter size={20} style={{ color: 'var(--colors-text-secondary)' }} />
          <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className="button"
                style={{
                  backgroundColor: activeFilter === filter.id ? 'var(--colors-neutral-dark)' : 'var(--colors-background-surface)',
                  color: activeFilter === filter.id ? 'var(--colors-text-onDark)' : 'var(--colors-text-primary)',
                  border: 'none',
                  fontSize: 'var(--body-font-size)'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative' }}>
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
            placeholder="Search projects, skills, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--spacing-md) var(--spacing-md) var(--spacing-md) 48px',
              border: '2px solid var(--colors-border-subtle)',
              borderRadius: 'var(--border-radius-lg)',
              backgroundColor: 'var(--colors-background-surface)',
              fontSize: 'var(--body-font-size)',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--colors-primary-lime)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--colors-border-subtle)'}
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
        {filteredProjects.map(project => (
          <div key={project.id} className="card card-light">
            <div className="flex items-start justify-between" style={{ marginBottom: 'var(--spacing-md)' }}>
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-sm)' }}>
                  <span 
                    style={{
                      padding: '4px 8px',
                      borderRadius: 'var(--border-radius-md)',
                      backgroundColor: getCategoryColor(project.category),
                      color: 'var(--colors-text-primary)',
                      fontSize: 'var(--metadata-font-size)',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}
                  >
                    {project.category}
                  </span>
                  <span style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--metadata-font-size)' }}>
                    {project.postedDate}
                  </span>
                </div>
                
                <h3 
                  style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    marginBottom: 'var(--spacing-sm)',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease'
                  }}
                  onClick={() => handleProjectClick(project)}
                  onMouseEnter={(e) => e.target.style.color = 'var(--colors-primary-limeText)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--colors-text-primary)'}
                >
                  {project.title}
                </h3>
                
                <p style={{ 
                  color: 'var(--colors-text-secondary)', 
                  fontSize: 'var(--body-font-size)',
                  lineHeight: '1.6',
                  marginBottom: 'var(--spacing-md)'
                }}>
                  {project.description}
                </p>

                <div className="flex gap-sm" style={{ marginBottom: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                  {project.tags.map(tag => (
                    <span 
                      key={tag}
                      style={{
                        padding: '4px 8px',
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
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--spacing-sm)' }}>
                <span style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '700',
                  color: 'var(--colors-primary-limeText)'
                }}>
                  {project.budget}
                </span>
                <span style={{ 
                  fontSize: 'var(--metadata-font-size)', 
                  color: 'var(--colors-text-secondary)'
                }}>
                  {project.timeline}
                </span>
              </div>
            </div>

            {/* Client Info and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-md">
                <img
                  src={project.client.avatar}
                  alt={project.client.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                    {project.client.name}
                  </div>
                  <div className="flex items-center gap-sm">
                    <Star size={14} style={{ color: 'var(--colors-primary-limeText)' }} />
                    <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                      {project.client.rating} ({project.client.completedProjects} projects)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-md">
                <div className="flex items-center gap-sm">
                  <MapPin size={16} style={{ color: 'var(--colors-text-secondary)' }} />
                  <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                    {project.location}
                  </span>
                </div>
                
                <div className="flex items-center gap-sm">
                  <MessageCircle size={16} style={{ color: 'var(--colors-text-secondary)' }} />
                  <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                    {project.proposals} proposals
                  </span>
                </div>

                <div className="flex gap-sm">
                  <button 
                    className="button button-outline"
                    onClick={() => handleProjectClick(project)}
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="button button-outline"
                    onClick={() => toggleLike(project.id)}
                    title={likedProjects.has(project.id) ? "Remove from favorites" : "Add to favorites"}
                    style={{ color: likedProjects.has(project.id) ? '#ff6b6b' : 'var(--colors-text-secondary)' }}
                  >
                    <Heart size={16} style={{ fill: likedProjects.has(project.id) ? '#ff6b6b' : 'none' }} />
                  </button>
                  <button 
                    className="button button-primary"
                    onClick={() => handleSubmitProposal(project)}
                  >
                    <Plus size={16} />
                    Submit Proposal
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="card card-light" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-md)' }}>No projects found</h3>
          <p style={{ color: 'var(--colors-text-secondary)' }}>
            Try adjusting your filters or search terms to find more opportunities.
          </p>
        </div>
      )}

      {/* Modals */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        user={user}
      />
      
      <ProposalModal 
        project={selectedProject}
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        onSubmit={handleProposalSubmit}
      />
    </div>
  );
};

export default ProjectMarketplace;

