import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Shield,
  Download,
  Eye,
  Star,
  AlertCircle,
  CreditCard,
  Banknote,
  Calendar,
  User,
  FileText,
  Image,
  Video,
  Archive,
  ThumbsUp,
  ThumbsDown,
  MessageCircle
} from 'lucide-react';

const PaymentApproval = ({ user }) => {
  const [approvalStatus, setApprovalStatus] = useState('pending'); // pending, approved, rejected
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Mock project data
  const project = {
    id: 1,
    title: 'Modern Logo Design for Campus Startup',
    description: 'Looking for a talented designer to create a modern, minimalist logo for our campus-based food delivery startup.',
    budget: '$200',
    timeline: '1-2 weeks',
    deadline: 'Dec 15, 2024',
    status: 'delivered',
    freelancer: {
      name: 'Sarah Kim',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      rating: 4.9,
      completedProjects: 45,
      responseTime: '1 hour'
    },
    escrowAmount: '$200',
    deliveryDate: 'Dec 14, 2024'
  };

  const deliverables = [
    {
      id: 1,
      name: 'Final Logo Design - PNG',
      type: 'image',
      size: '2.5 MB',
      description: 'High-resolution PNG logo in multiple sizes',
      url: '#'
    },
    {
      id: 2,
      name: 'Final Logo Design - SVG',
      type: 'image',
      size: '1.2 MB',
      description: 'Vector SVG format for scalability',
      url: '#'
    },
    {
      id: 3,
      name: 'Logo Variations',
      type: 'image',
      size: '3.8 MB',
      description: 'Color variations and alternative layouts',
      url: '#'
    },
    {
      id: 4,
      name: 'Brand Guidelines',
      type: 'document',
      size: '1.5 MB',
      description: 'Simple brand guidelines document',
      url: '#'
    }
  ];

  const milestones = [
    {
      id: 1,
      title: 'Initial Concepts',
      status: 'completed',
      completedDate: 'Dec 4, 2024'
    },
    {
      id: 2,
      title: 'Refined Design',
      status: 'completed',
      completedDate: 'Dec 9, 2024'
    },
    {
      id: 3,
      title: 'Final Files',
      status: 'completed',
      completedDate: 'Dec 14, 2024'
    },
    {
      id: 4,
      title: 'Brand Guidelines',
      status: 'completed',
      completedDate: 'Dec 14, 2024'
    }
  ];

  const handleApproveWork = () => {
    setApprovalStatus('approved');
    setShowPaymentModal(true);
  };

  const handleRejectWork = () => {
    setShowRejectionModal(true);
  };

  const handleConfirmRejection = () => {
    if (rejectionReason.trim()) {
      setApprovalStatus('rejected');
      setShowRejectionModal(false);
      setRejectionReason('');
    }
  };

  const handleReleasePayment = () => {
    console.log('Releasing payment...');
    setShowPaymentModal(false);
    // In a real app, this would trigger the payment release
    alert('Payment released successfully!');
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image': return Image;
      case 'video': return Video;
      case 'document': return FileText;
      default: return Archive;
    }
  };

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
          Review & Approve Work
        </h1>
        <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
          {project.freelancer.name} has delivered the final work for your project
        </p>
      </div>

      {/* Project Summary */}
      <div className="card card-light" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="grid grid-4" style={{ gap: 'var(--spacing-lg)' }}>
          <div>
            <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              Project Budget
            </h4>
            <p style={{ color: 'var(--colors-primary-limeText)', fontSize: '1.25rem', fontWeight: '700' }}>
              {project.budget}
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              Escrow Amount
            </h4>
            <p style={{ color: 'var(--colors-secondary-purpleText)', fontSize: '1.25rem', fontWeight: '700' }}>
              {project.escrowAmount}
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              Delivered On
            </h4>
            <p style={{ color: 'var(--colors-text-secondary)' }}>
              {project.deliveryDate}
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              Status
            </h4>
            <div className="flex items-center gap-sm">
              <CheckCircle size={16} style={{ color: 'var(--colors-primary-lime)' }} />
              <span style={{ color: 'var(--colors-primary-lime)', textTransform: 'capitalize' }}>
                {project.status}
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

      <div className="grid grid-2" style={{ gap: 'var(--spacing-xl)' }}>
        {/* Deliverables */}
        <div className="card card-light">
          <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
            Final Deliverables
          </h3>
          <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
            {deliverables.map(deliverable => {
              const FileIcon = getFileIcon(deliverable.type);
              return (
                <div key={deliverable.id} className="flex items-center justify-between" style={{
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--colors-background-surface)',
                  borderRadius: 'var(--border-radius-lg)',
                  border: '1px solid var(--colors-border-subtle)'
                }}>
                  <div className="flex items-center gap-md">
                    <FileIcon size={24} style={{ color: 'var(--colors-text-secondary)' }} />
                    <div>
                      <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                        {deliverable.name}
                      </div>
                      <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                        {deliverable.description}
                      </div>
                      <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                        {deliverable.size}
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
              );
            })}
          </div>
        </div>

        {/* Project Timeline */}
        <div className="card card-light">
          <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
            Project Timeline
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex items-center gap-md">
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%',
                  backgroundColor: 'var(--colors-primary-lime)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <CheckCircle size={16} style={{ color: 'var(--colors-primary-limeText)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                    {milestone.title}
                  </div>
                  <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                    Completed on {milestone.completedDate}
                  </div>
                </div>
                {index < milestones.length - 1 && (
                  <div style={{ 
                    width: '2px', 
                    height: '20px', 
                    backgroundColor: 'var(--colors-border-subtle)',
                    marginLeft: '12px'
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Approval Actions */}
      <div className="card card-light" style={{ marginTop: 'var(--spacing-xl)' }}>
        <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
          Review & Approval
        </h3>
        
        {approvalStatus === 'pending' && (
          <div>
            <div style={{ 
              padding: 'var(--spacing-lg)',
              backgroundColor: 'var(--colors-background-surface)',
              borderRadius: 'var(--border-radius-lg)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-md)' }}>
                <Shield size={24} style={{ color: 'var(--colors-secondary-purple)' }} />
                <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                  Payment Protection
                </h4>
              </div>
              <p style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-secondary)' }}>
                Your payment of {project.escrowAmount} is securely held in escrow. Once you approve the work, 
                the payment will be released to {project.freelancer.name}. If you're not satisfied, 
                you can request changes or reject the work.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                  Are you satisfied with the delivered work?
                </h4>
                <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                  Review all deliverables carefully before making your decision.
                </p>
              </div>
              <div className="flex gap-md">
                <button 
                  className="button button-outline"
                  onClick={handleRejectWork}
                  style={{ color: '#ef4444', borderColor: '#ef4444' }}
                >
                  <ThumbsDown size={16} />
                  Request Changes
                </button>
                <button 
                  className="button button-secondary"
                  onClick={handleApproveWork}
                >
                  <ThumbsUp size={16} />
                  Approve & Release Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {approvalStatus === 'approved' && (
          <div style={{ 
            padding: 'var(--spacing-lg)',
            backgroundColor: 'var(--colors-primary-lime)',
            borderRadius: 'var(--border-radius-lg)',
            textAlign: 'center'
          }}>
            <CheckCircle size={48} style={{ color: 'var(--colors-primary-limeText)', marginBottom: 'var(--spacing-md)' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              Work Approved!
            </h3>
            <p style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-primary-limeText)' }}>
              Payment has been released to {project.freelancer.name}. Thank you for using GigCampus!
            </p>
          </div>
        )}

        {approvalStatus === 'rejected' && (
          <div style={{ 
            padding: 'var(--spacing-lg)',
            backgroundColor: 'var(--colors-background-surface)',
            borderRadius: 'var(--border-radius-lg)',
            border: '1px solid #ef4444'
          }}>
            <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-md)' }}>
              <XCircle size={24} style={{ color: '#ef4444' }} />
              <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                Changes Requested
              </h4>
            </div>
            <p style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-secondary)' }}>
              You've requested changes to the work. {project.freelancer.name} will be notified and can submit revised deliverables.
            </p>
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card card-light" style={{ maxWidth: '500px', width: '90%' }}>
            <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
              Request Changes
            </h3>
            <p style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
              Please provide specific feedback about what needs to be changed or improved.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Describe what changes you'd like to see..."
              rows={4}
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                border: '2px solid var(--colors-border-subtle)',
                borderRadius: 'var(--border-radius-md)',
                fontSize: 'var(--body-font-size)',
                outline: 'none',
                resize: 'vertical',
                marginBottom: 'var(--spacing-lg)'
              }}
            />
            <div className="flex gap-md" style={{ justifyContent: 'flex-end' }}>
              <button 
                className="button button-outline"
                onClick={() => setShowRejectionModal(false)}
              >
                Cancel
              </button>
              <button 
                className="button button-outline"
                onClick={handleConfirmRejection}
                disabled={!rejectionReason.trim()}
                style={{ color: '#ef4444', borderColor: '#ef4444' }}
              >
                Request Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card card-light" style={{ maxWidth: '400px', width: '90%' }}>
            <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
              Release Payment
            </h3>
            <div style={{ 
              padding: 'var(--spacing-lg)',
              backgroundColor: 'var(--colors-background-surface)',
              borderRadius: 'var(--border-radius-lg)',
              marginBottom: 'var(--spacing-lg)',
              textAlign: 'center'
            }}>
              <DollarSign size={32} style={{ color: 'var(--colors-primary-limeText)', marginBottom: 'var(--spacing-sm)' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
                {project.escrowAmount}
              </div>
              <p style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-secondary)' }}>
                Will be released to {project.freelancer.name}
              </p>
            </div>
            <div className="flex gap-md" style={{ justifyContent: 'flex-end' }}>
              <button 
                className="button button-outline"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </button>
              <button 
                className="button button-secondary"
                onClick={handleReleasePayment}
              >
                Release Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentApproval;
