import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Upload,
  Download,
  Eye,
  Calendar,
  User,
  Star,
  FileText,
  Image,
  Video,
  Archive,
  Send,
  Paperclip,
  MoreVertical
} from 'lucide-react';

const ProjectProgress = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Mock project data
  const project = {
    id: 1,
    title: 'Modern Logo Design for Campus Startup',
    description: 'Looking for a talented designer to create a modern, minimalist logo for our campus-based food delivery startup.',
    budget: '$200',
    timeline: '1-2 weeks',
    deadline: 'Dec 15, 2024',
    status: 'in-progress',
    progress: 75,
    freelancer: {
      name: 'Sarah Kim',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      rating: 4.9,
      completedProjects: 45,
      responseTime: '1 hour'
    }
  };

  const milestones = [
    {
      id: 1,
      title: 'Initial Concepts',
      description: 'Create 3-5 initial logo concepts',
      status: 'completed',
      dueDate: 'Dec 5, 2024',
      completedDate: 'Dec 4, 2024',
      deliverables: [
        { name: 'Concept 1 - Minimalist', type: 'image', url: '#' },
        { name: 'Concept 2 - Modern', type: 'image', url: '#' },
        { name: 'Concept 3 - Creative', type: 'image', url: '#' }
      ]
    },
    {
      id: 2,
      title: 'Refined Design',
      description: 'Refine selected concept based on feedback',
      status: 'completed',
      dueDate: 'Dec 10, 2024',
      completedDate: 'Dec 9, 2024',
      deliverables: [
        { name: 'Refined Logo Design', type: 'image', url: '#' },
        { name: 'Color Variations', type: 'image', url: '#' }
      ]
    },
    {
      id: 3,
      title: 'Final Files',
      description: 'Deliver final logo files in all formats',
      status: 'in-progress',
      dueDate: 'Dec 15, 2024',
      completedDate: null,
      deliverables: []
    },
    {
      id: 4,
      title: 'Brand Guidelines',
      description: 'Create simple brand guidelines document',
      status: 'pending',
      dueDate: 'Dec 18, 2024',
      completedDate: null,
      deliverables: []
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'freelancer',
      name: 'Sarah Kim',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      message: 'Hi! I\'ve uploaded the initial concepts for your logo. Please take a look and let me know which direction you prefer.',
      timestamp: '2 hours ago',
      attachments: [
        { name: 'concept-1.png', type: 'image', size: '2.1 MB' },
        { name: 'concept-2.png', type: 'image', size: '1.8 MB' },
        { name: 'concept-3.png', type: 'image', size: '2.3 MB' }
      ]
    },
    {
      id: 2,
      sender: 'client',
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      message: 'Thanks Sarah! I really like concept 2 - the modern one. Can you refine it with a slightly different color scheme? Maybe something more vibrant.',
      timestamp: '1 hour ago',
      attachments: []
    },
    {
      id: 3,
      sender: 'freelancer',
      name: 'Sarah Kim',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      message: 'Perfect! I\'ll work on refining concept 2 with a more vibrant color palette. I\'ll have the updated version ready by tomorrow.',
      timestamp: '30 minutes ago',
      attachments: []
    }
  ];

  const files = [
    {
      id: 1,
      name: 'concept-1-minimalist.png',
      type: 'image',
      size: '2.1 MB',
      uploadedBy: 'Sarah Kim',
      uploadedDate: 'Dec 4, 2024',
      milestone: 'Initial Concepts'
    },
    {
      id: 2,
      name: 'concept-2-modern.png',
      type: 'image',
      size: '1.8 MB',
      uploadedBy: 'Sarah Kim',
      uploadedDate: 'Dec 4, 2024',
      milestone: 'Initial Concepts'
    },
    {
      id: 3,
      name: 'refined-logo-final.png',
      type: 'image',
      size: '2.5 MB',
      uploadedBy: 'Sarah Kim',
      uploadedDate: 'Dec 9, 2024',
      milestone: 'Refined Design'
    },
    {
      id: 4,
      name: 'color-variations.png',
      type: 'image',
      size: '3.2 MB',
      uploadedBy: 'Sarah Kim',
      uploadedDate: 'Dec 9, 2024',
      milestone: 'Refined Design'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'pending': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'var(--colors-primary-lime)';
      case 'in-progress': return 'var(--colors-secondary-purple)';
      case 'pending': return 'var(--colors-text-secondary)';
      default: return 'var(--colors-text-secondary)';
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log('File selected:', file.name);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'milestones', label: 'Milestones', icon: CheckCircle },
    { id: 'files', label: 'Files', icon: Archive },
    { id: 'chat', label: 'Messages', icon: MessageCircle }
  ];

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <Link 
          to="/client/my-projects" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--spacing-sm)',
            color: 'var(--colors-text-secondary)',
            textDecoration: 'none',
            marginBottom: 'var(--spacing-md)'
          }}
        >
          <ArrowLeft size={16} />
          Back to My Projects
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
          {project.title}
        </h1>
        <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
          Working with {project.freelancer.name} • Due {project.deadline}
        </p>
      </div>

      {/* Project Summary */}
      <div className="card card-light" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="grid grid-4" style={{ gap: 'var(--spacing-lg)' }}>
          <div>
            <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              Budget
            </h4>
            <p style={{ color: 'var(--colors-primary-limeText)', fontSize: '1.25rem', fontWeight: '700' }}>
              {project.budget}
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              Timeline
            </h4>
            <p style={{ color: 'var(--colors-text-secondary)' }}>
              {project.timeline}
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              Progress
            </h4>
            <div className="flex items-center gap-sm">
              <div style={{ 
                flex: 1, 
                height: '8px', 
                backgroundColor: 'var(--colors-border-subtle)', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${project.progress}%`,
                  height: '100%',
                  backgroundColor: 'var(--colors-primary-lime)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <span style={{ fontSize: 'var(--metadata-font-size)', fontWeight: '600' }}>
                {project.progress}%
              </span>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              Status
            </h4>
            <div className="flex items-center gap-sm">
              <Clock size={16} style={{ color: 'var(--colors-secondary-purple)' }} />
              <span style={{ color: 'var(--colors-secondary-purple)', textTransform: 'capitalize' }}>
                {project.status.replace('-', ' ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Freelancer Info */}
      <div className="card card-light" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-md">
            <img
              src={project.freelancer.avatar}
              alt={project.freelancer.name}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            <div>
              <h3 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                {project.freelancer.name}
              </h3>
              <div className="flex items-center gap-sm" style={{ marginBottom: 'var(--spacing-sm)' }}>
                <Star size={14} style={{ color: 'var(--colors-primary-limeText)' }} />
                <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                  {project.freelancer.rating} ({project.freelancer.completedProjects} projects)
                </span>
              </div>
              <div className="flex items-center gap-sm">
                <Clock size={14} style={{ color: 'var(--colors-text-secondary)' }} />
                <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                  Responds within {project.freelancer.responseTime}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-sm">
            <button className="button button-outline">
              <MessageCircle size={16} />
              Message
            </button>
            <button className="button button-primary">
              <Eye size={16} />
              View Profile
            </button>
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
          {/* Recent Activity */}
          <div className="card card-light">
            <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
              Recent Activity
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              <div className="flex items-center gap-md">
                <CheckCircle size={20} style={{ color: 'var(--colors-primary-lime)' }} />
                <div>
                  <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                    Milestone completed: Refined Design
                  </div>
                  <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                    Dec 9, 2024 • Sarah Kim
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-md">
                <Upload size={20} style={{ color: 'var(--colors-secondary-purple)' }} />
                <div>
                  <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                    Files uploaded: Color variations
                  </div>
                  <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                    Dec 9, 2024 • Sarah Kim
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-md">
                <MessageCircle size={20} style={{ color: 'var(--colors-neutral-medium)' }} />
                <div>
                  <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                    New message received
                  </div>
                  <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                    30 minutes ago • Sarah Kim
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="card card-light">
            <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
              Next Steps
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              <div className="flex items-center gap-md">
                <Clock size={20} style={{ color: 'var(--colors-secondary-purple)' }} />
                <div>
                  <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                    Final Files Due
                  </div>
                  <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                    Dec 15, 2024
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-md">
                <AlertCircle size={20} style={{ color: 'var(--colors-text-secondary)' }} />
                <div>
                  <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                    Brand Guidelines
                  </div>
                  <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                    Dec 18, 2024
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'milestones' && (
        <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
          {milestones.map(milestone => {
            const StatusIcon = getStatusIcon(milestone.status);
            return (
              <div key={milestone.id} className="card card-light">
                <div className="flex items-start gap-lg">
                  <div style={{ minWidth: '40px' }}>
                    <StatusIcon 
                      size={24} 
                      style={{ color: getStatusColor(milestone.status) }} 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                      <h3 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                        {milestone.title}
                      </h3>
                      <span style={{ 
                        fontSize: 'var(--metadata-font-size)', 
                        color: 'var(--colors-text-secondary)'
                      }}>
                        Due: {milestone.dueDate}
                      </span>
                    </div>
                    
                    <p style={{ 
                      color: 'var(--colors-text-secondary)', 
                      fontSize: 'var(--body-font-size)',
                      marginBottom: 'var(--spacing-md)'
                    }}>
                      {milestone.description}
                    </p>

                    {milestone.completedDate && (
                      <div style={{ 
                        fontSize: 'var(--metadata-font-size)', 
                        color: 'var(--colors-primary-limeText)',
                        marginBottom: 'var(--spacing-md)'
                      }}>
                        ✓ Completed on {milestone.completedDate}
                      </div>
                    )}

                    {milestone.deliverables.length > 0 && (
                      <div>
                        <h4 style={{ fontSize: 'var(--metadata-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                          Deliverables:
                        </h4>
                        <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
                          {milestone.deliverables.map((deliverable, index) => (
                            <div key={index} className="flex items-center gap-sm" style={{
                              padding: 'var(--spacing-sm)',
                              backgroundColor: 'var(--colors-background-surface)',
                              borderRadius: 'var(--border-radius-md)',
                              fontSize: 'var(--metadata-font-size)'
                            }}>
                              {deliverable.type === 'image' && <Image size={14} />}
                              {deliverable.type === 'video' && <Video size={14} />}
                              {deliverable.type === 'document' && <FileText size={14} />}
                              <span>{deliverable.name}</span>
                              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <Download size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'files' && (
        <div className="card card-light">
          <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
            Project Files
          </h3>
          <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
            {files.map(file => (
              <div key={file.id} className="flex items-center justify-between" style={{
                padding: 'var(--spacing-md)',
                backgroundColor: 'var(--colors-background-surface)',
                borderRadius: 'var(--border-radius-lg)',
                border: '1px solid var(--colors-border-subtle)'
              }}>
                <div className="flex items-center gap-md">
                  {file.type === 'image' && <Image size={20} style={{ color: 'var(--colors-text-secondary)' }} />}
                  {file.type === 'video' && <Video size={20} style={{ color: 'var(--colors-text-secondary)' }} />}
                  {file.type === 'document' && <FileText size={20} style={{ color: 'var(--colors-text-secondary)' }} />}
                  <div>
                    <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                      {file.name}
                    </div>
                    <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                      {file.size} • {file.milestone} • {file.uploadedDate}
                    </div>
                  </div>
                </div>
                <div className="flex gap-sm">
                  <button className="button button-outline" style={{ fontSize: 'var(--metadata-font-size)', padding: '4px 8px' }}>
                    <Eye size={14} />
                    Preview
                  </button>
                  <button className="button button-primary" style={{ fontSize: 'var(--metadata-font-size)', padding: '4px 8px' }}>
                    <Download size={14} />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="grid grid-2" style={{ gap: 'var(--spacing-xl)' }}>
          {/* Messages */}
          <div className="card card-light">
            <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
              Messages
            </h3>
            <div style={{ 
              height: '400px', 
              overflowY: 'auto', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              {messages.map(message => (
                <div key={message.id} className={`flex gap-md ${message.sender === 'client' ? 'flex-row-reverse' : ''}`}>
                  <img
                    src={message.avatar}
                    alt={message.name}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      padding: 'var(--spacing-md)',
                      backgroundColor: message.sender === 'client' ? 'var(--colors-primary-lime)' : 'var(--colors-background-surface)',
                      borderRadius: 'var(--border-radius-lg)',
                      marginBottom: 'var(--spacing-sm)'
                    }}>
                      <p style={{ 
                        fontSize: 'var(--body-font-size)',
                        marginBottom: message.attachments.length > 0 ? 'var(--spacing-sm)' : '0'
                      }}>
                        {message.message}
                      </p>
                      {message.attachments.length > 0 && (
                        <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
                          {message.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center gap-sm" style={{
                              padding: '4px 8px',
                              backgroundColor: 'var(--colors-background-default)',
                              borderRadius: 'var(--border-radius-md)',
                              fontSize: 'var(--metadata-font-size)'
                            }}>
                              <Paperclip size={12} />
                              <span>{attachment.name}</span>
                              <span style={{ color: 'var(--colors-text-secondary)' }}>
                                ({attachment.size})
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div style={{ borderTop: '1px solid var(--colors-border-subtle)', paddingTop: 'var(--spacing-md)' }}>
              <div className="flex gap-sm" style={{ marginBottom: 'var(--spacing-sm)' }}>
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="file-upload" className="button button-outline" style={{ cursor: 'pointer' }}>
                  <Paperclip size={16} />
                  Attach
                </label>
                {selectedFile && (
                  <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                    {selectedFile.name}
                  </span>
                )}
              </div>
              <div className="flex gap-sm">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    padding: 'var(--spacing-md)',
                    border: '2px solid var(--colors-border-subtle)',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: 'var(--body-font-size)',
                    outline: 'none'
                  }}
                />
                <button 
                  className="button button-primary"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card card-light">
            <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
              Quick Actions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              <button className="button button-secondary">
                <CheckCircle size={16} />
                Approve Current Work
              </button>
              <button className="button button-outline">
                <AlertCircle size={16} />
                Request Changes
              </button>
              <button className="button button-outline">
                <Clock size={16} />
                Extend Deadline
              </button>
              <button className="button button-outline">
                <MoreVertical size={16} />
                More Options
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectProgress;
