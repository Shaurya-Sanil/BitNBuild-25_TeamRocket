import React, { useState, useEffect } from 'react';
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
import { projectService, proposalService } from '../firebase/database';

const ProjectMarketplace = ({ user }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'Graphics & Design', label: 'Design' },
    { id: 'Programming & Tech', label: 'Development' },
    { id: 'Writing & Translation', label: 'Writing' },
    { id: 'Tutoring & Education', label: 'Tutoring' },
    { id: 'Digital Marketing', label: 'Marketing' }
  ];

  // Load projects from Firebase
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const projectsData = await projectService.getAllProjects();
        // Sort by creation date (newest first)
        const sortedProjects = projectsData.sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
          return dateB - dateA;
        });
        setProjects(sortedProjects);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.skills && project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())));
    
    return matchesFilter && matchesSearch;
  });

  const handleProjectClick = (project) => {
    // Transform project data to include client object for modals
    const transformedProject = {
      ...project,
      client: {
        name: project.clientName || 'Client',
        avatar: project.clientAvatar || '/default-avatar.png',
        rating: project.clientRating || 'N/A',
        completedProjects: project.clientCompletedProjects || 0
      }
    };
    setSelectedProject(transformedProject);
    setIsProjectModalOpen(true);
  };

  const handleSubmitProposal = (project) => {
    // Transform project data to include client object for modals
    const transformedProject = {
      ...project,
      client: {
        name: project.clientName || 'Client',
        avatar: project.clientAvatar || '/default-avatar.png',
        rating: project.clientRating || 'N/A',
        completedProjects: project.clientCompletedProjects || 0
      }
    };
    setSelectedProject(transformedProject);
    setIsProposalModalOpen(true);
  };

  const handleProposalSubmit = async (proposalData) => {
    try {
      if (!user) {
        alert('Please log in to submit a proposal');
        return;
      }
      
      await proposalService.createProposal(proposalData, selectedProject.id, user.uid);
      alert('Proposal submitted successfully!');
    } catch (error) {
      console.error('Error submitting proposal:', error);
      alert('Failed to submit proposal. Please try again.');
    }
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

      {/* Loading State */}
      {loading && (
        <div className="card card-light" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Loading projects...</h3>
          <p style={{ color: 'var(--colors-text-secondary)' }}>
            Please wait while we fetch the latest projects.
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="card card-light" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-md)', color: '#ef4444' }}>Error</h3>
          <p style={{ color: 'var(--colors-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
            {error}
          </p>
          <button 
            className="button button-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Projects Grid */}
      {!loading && !error && (
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
                      {project.createdAt ? new Date(project.createdAt.seconds * 1000).toLocaleDateString() : 'Recently posted'}
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
                    {project.skills && project.skills.map(skill => (
                      <span 
                        key={skill}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: 'var(--colors-background-surface)',
                          borderRadius: 'var(--border-radius-md)',
                          fontSize: 'var(--metadata-font-size)',
                          color: 'var(--colors-text-secondary)',
                          border: '1px solid var(--colors-border-subtle)'
                        }}
                      >
                        {skill}
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
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--colors-primary-lime)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--colors-primary-limeText)',
                    fontWeight: '600',
                    fontSize: 'var(--body-font-size)'
                  }}>
                    {project.clientName ? project.clientName.charAt(0).toUpperCase() : 'C'}
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                      {project.clientName || 'Client'}
                    </div>
                    <div className="flex items-center gap-sm">
                      <Star size={14} style={{ color: 'var(--colors-primary-limeText)' }} />
                      <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                        New Client
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-md">
                  <div className="flex items-center gap-sm">
                    <MessageCircle size={16} style={{ color: 'var(--colors-text-secondary)' }} />
                    <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                      {project.proposals || 0} proposals
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
      )}

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
        user={user}
      />
    </div>
  );
};

export default ProjectMarketplace;

