import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  CheckCircle,
  AlertCircle,
  XCircle,
  Edit,
  Trash2,
  Users as UsersIcon
} from 'lucide-react';
import { projectService } from '../firebase/database';

const MyProjects = ({ user }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'open', label: 'Open for Bids' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'review', label: 'Under Review' },
    { id: 'completed', label: 'Completed' },
    { id: 'closed', label: 'Closed' }
  ];

  // Load projects from Firebase
  useEffect(() => {
    const loadProjects = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        setError(null);
        const projectsData = await projectService.getProjectsByClient(user.uid);
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
  }, [user]);

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.status === activeFilter;
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.skills && project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())));
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    const colors = {
      'open': 'var(--colors-primary-lime)',
      'in-progress': 'var(--colors-secondary-purple)',
      'review': 'var(--colors-neutral-medium)',
      'completed': 'var(--colors-text-secondary)',
      'closed': 'var(--colors-text-secondary)'
    };
    return colors[status] || 'var(--colors-text-secondary)';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return UsersIcon;
      case 'in-progress': return Clock;
      case 'review': return Eye;
      case 'completed': return CheckCircle;
      case 'closed': return XCircle;
      default: return AlertCircle;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'open': return 'Open for Bids';
      case 'in-progress': return 'In Progress';
      case 'review': return 'Under Review';
      case 'completed': return 'Completed';
      case 'closed': return 'Closed';
      default: return status;
    }
  };

  const handleEditProject = (projectId) => {
    console.log('Edit project:', projectId);
    // Navigate to edit page or open edit modal
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      console.log('Delete project:', projectId);
      // Delete project logic
    }
  };

  const handleViewBids = (projectId) => {
    console.log('View bids for project:', projectId);
    // Navigate to bids page
  };

  const handleViewProgress = (projectId) => {
    console.log('View progress for project:', projectId);
    // Navigate to project progress page
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: 'var(--spacing-md)' }}>
          My Projects
        </h1>
        <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
          Manage your posted projects, review bids, and track progress.
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
            placeholder="Search your projects..."
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

      {/* Quick Actions */}
      <div className="card card-light" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="heading">Quick Actions</h3>
            <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
              Manage your projects efficiently
            </p>
          </div>
          <div className="flex gap-md">
            <Link to="/client/post-project" className="button button-secondary">
              <Plus size={16} />
              Post New Project
            </Link>
            <Link to="/client/browse-freelancers" className="button button-outline">
              <UsersIcon size={16} />
              Browse Freelancers
            </Link>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="card card-light" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Loading your projects...</h3>
          <p style={{ color: 'var(--colors-text-secondary)' }}>
            Please wait while we fetch your projects.
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
          {filteredProjects.map(project => {
            const StatusIcon = getStatusIcon(project.status);
            return (
              <div key={project.id} className="card card-light">
                <div className="flex items-start justify-between" style={{ marginBottom: 'var(--spacing-md)' }}>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-sm)' }}>
                      <span 
                        style={{
                          padding: '4px 8px',
                          borderRadius: 'var(--border-radius-md)',
                          backgroundColor: 'var(--colors-secondary-purple)',
                          color: 'var(--colors-text-primary)',
                          fontSize: 'var(--metadata-font-size)',
                          fontWeight: '600'
                        }}
                      >
                        {project.category}
                      </span>
                      <div className="flex items-center gap-sm">
                        <StatusIcon size={14} style={{ color: getStatusColor(project.status) }} />
                        <span style={{ 
                          fontSize: 'var(--metadata-font-size)', 
                          color: getStatusColor(project.status),
                          fontWeight: '600'
                        }}>
                          {getStatusText(project.status)}
                        </span>
                      </div>
                      <span style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--metadata-font-size)' }}>
                        Posted {project.createdAt ? new Date(project.createdAt.seconds * 1000).toLocaleDateString() : 'Recently'}
                      </span>
                    </div>
                    
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '600', 
                      marginBottom: 'var(--spacing-sm)'
                    }}>
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
                    <span style={{ 
                      fontSize: 'var(--metadata-font-size)', 
                      color: 'var(--colors-text-secondary)'
                    }}>
                      Due: {project.deadline}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-md">
                    <div className="flex items-center gap-sm">
                      <MessageCircle size={16} style={{ color: 'var(--colors-text-secondary)' }} />
                      <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                        {project.proposals || 0} proposals
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-sm">
                    {project.status === 'open' && (project.proposals || 0) > 0 && (
                      <button 
                        className="button button-primary"
                        onClick={() => handleViewBids(project.id)}
                      >
                        <Eye size={16} />
                        View Bids ({project.proposals || 0})
                      </button>
                    )}
                    
                    {project.status === 'open' && (
                      <button 
                        className="button button-outline"
                        onClick={() => handleEditProject(project.id)}
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                    )}
                    
                    {project.status === 'open' && (
                      <button 
                        className="button button-outline"
                        onClick={() => handleDeleteProject(project.id)}
                        style={{ color: '#ef4444', borderColor: '#ef4444' }}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="card card-light" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-md)' }}>No projects found</h3>
          <p style={{ color: 'var(--colors-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
            {searchTerm ? 'Try adjusting your search terms.' : 'You haven\'t posted any projects yet.'}
          </p>
          <Link to="/client/post-project" className="button button-secondary">
            <Plus size={16} />
            Post Your First Project
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyProjects;
