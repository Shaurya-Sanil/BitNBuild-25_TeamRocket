import React, { useState } from 'react';
import Modal from './Modal';
import { 
  Star, 
  MapPin, 
  Clock, 
  DollarSign, 
  User, 
  Calendar,
  MessageCircle,
  Eye,
  Heart,
  Share2,
  Download,
  CheckCircle,
  Award,
  TrendingUp
} from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'budget', label: 'Budget' }
  ];

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
    <Modal isOpen={isOpen} onClose={onClose} title={project.title} size="large">
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
        {/* Left Column - Project Details */}
        <div>
          {/* Project Header */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-md)' }}>
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
                Posted {project.postedDate}
              </span>
            </div>
            
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-md)' }}>
              {project.title}
            </h1>
            
            <p style={{ 
              color: 'var(--colors-text-secondary)', 
              fontSize: 'var(--body-font-size)',
              lineHeight: '1.6',
              marginBottom: 'var(--spacing-lg)'
            }}>
              {project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-md">
              <button 
                className="button button-primary"
                style={{ flex: 1 }}
              >
                <MessageCircle size={16} />
                Submit Proposal
              </button>
              <button 
                className="button button-outline"
                onClick={() => setIsLiked(!isLiked)}
                style={{ color: isLiked ? '#ff6b6b' : 'var(--colors-text-secondary)' }}
              >
                <Heart size={16} style={{ fill: isLiked ? '#ff6b6b' : 'none' }} />
              </button>
              <button className="button button-outline">
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-sm" style={{ marginBottom: 'var(--spacing-lg)' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="button"
                style={{
                  backgroundColor: activeTab === tab.id ? 'var(--colors-neutral-dark)' : 'var(--colors-background-surface)',
                  color: activeTab === tab.id ? 'var(--colors-text-onDark)' : 'var(--colors-text-primary)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            {activeTab === 'overview' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>
                  Project Overview
                </h3>
                <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                  <div className="flex items-start gap-md">
                    <Eye size={20} style={{ color: 'var(--colors-text-secondary)', marginTop: '2px' }} />
                    <div>
                      <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                        What we're looking for
                      </h4>
                      <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
                        {project.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-md">
                    <CheckCircle size={20} style={{ color: 'var(--colors-primary-limeText)', marginTop: '2px' }} />
                    <div>
                      <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                        Deliverables
                      </h4>
                      <ul style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)', paddingLeft: 'var(--spacing-md)' }}>
                        <li>High-quality, professional work</li>
                        <li>Source files and documentation</li>
                        <li>Regular progress updates</li>
                        <li>Revision rounds as needed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'requirements' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>
                  Requirements
                </h3>
                <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                  <div>
                    <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                      Skills Required
                    </h4>
                    <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
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
                  
                  <div>
                    <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                      Experience Level
                    </h4>
                    <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
                      Intermediate to Advanced level experience preferred
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>
                  Timeline
                </h3>
                <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                  <div className="flex items-center gap-md">
                    <Calendar size={20} style={{ color: 'var(--colors-text-secondary)' }} />
                    <div>
                      <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                        Project Duration
                      </h4>
                      <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
                        {project.timeline}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-md">
                    <Clock size={20} style={{ color: 'var(--colors-text-secondary)' }} />
                    <div>
                      <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                        Deadline
                      </h4>
                      <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
                        Flexible timeline with regular check-ins
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'budget' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>
                  Budget & Payment
                </h3>
                <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                  <div className="flex items-center gap-md">
                    <DollarSign size={20} style={{ color: 'var(--colors-primary-limeText)' }} />
                    <div>
                      <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                        Budget Range
                      </h4>
                      <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
                        {project.budget}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-md">
                    <Award size={20} style={{ color: 'var(--colors-secondary-purpleText)' }} />
                    <div>
                      <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                        Payment Terms
                      </h4>
                      <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
                        50% upfront, 50% upon completion
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Client Info & Actions */}
        <div>
          {/* Client Card */}
          <div className="card card-light" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-lg)' }}>
              About the Client
            </h3>
            
            <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <img
                src={project.client.avatar}
                alt={project.client.name}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <div>
                <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                  {project.client.name}
                </h4>
                <div className="flex items-center gap-sm">
                  <Star size={14} style={{ color: 'var(--colors-primary-limeText)' }} />
                  <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                    {project.client.rating} ({project.client.completedProjects} projects)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-md)' }}>
              <MapPin size={16} style={{ color: 'var(--colors-text-secondary)' }} />
              <span style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-secondary)' }}>
                {project.location}
              </span>
            </div>

            <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <MessageCircle size={16} style={{ color: 'var(--colors-text-secondary)' }} />
              <span style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-secondary)' }}>
                {project.proposals} proposals received
              </span>
            </div>

            <button className="button button-primary" style={{ width: '100%' }}>
              Contact Client
            </button>
          </div>

          {/* Project Stats */}
          <div className="card card-light">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-lg)' }}>
              Project Statistics
            </h3>
            
            <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-secondary)' }}>
                  Views
                </span>
                <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                  127
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-secondary)' }}>
                  Proposals
                </span>
                <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                  {project.proposals}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-secondary)' }}>
                  Avg. Response Time
                </span>
                <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                  2 hours
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-secondary)' }}>
                  Success Rate
                </span>
                <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', color: 'var(--colors-primary-limeText)' }}>
                  98%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectModal;
