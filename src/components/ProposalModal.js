import React, { useState } from 'react';
import Modal from './Modal';
import { 
  DollarSign, 
  Calendar, 
  FileText, 
  Upload,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const ProposalModal = ({ project, isOpen, onClose, onSubmit }) => {
  const [proposal, setProposal] = useState({
    bidAmount: '',
    timeline: '',
    message: '',
    deliverables: '',
    attachments: []
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!proposal.bidAmount) newErrors.bidAmount = 'Bid amount is required';
    if (!proposal.timeline) newErrors.timeline = 'Timeline is required';
    if (!proposal.message) newErrors.message = 'Proposal message is required';
    if (!proposal.deliverables) newErrors.deliverables = 'Deliverables description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(proposal);
    onClose();
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setProposal(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setProposal(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Submit Proposal - ${project.title}`} size="large">
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
          {/* Project Summary */}
          <div 
            style={{
              padding: 'var(--spacing-lg)',
              backgroundColor: 'var(--colors-background-surface)',
              borderRadius: 'var(--border-radius-lg)',
              border: '1px solid var(--colors-border-subtle)'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>
              Project Summary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md)' }}>
              <div>
                <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                  Budget Range
                </p>
                <p style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                  {project.budget}
                </p>
              </div>
              <div>
                <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                  Timeline
                </p>
                <p style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                  {project.timeline}
                </p>
              </div>
              <div>
                <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                  Client
                </p>
                <p style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                  {project.client.name}
                </p>
              </div>
              <div>
                <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                  Proposals Received
                </p>
                <p style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                  {project.proposals}
                </p>
              </div>
            </div>
          </div>

          {/* Bid Amount */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: 'var(--body-font-size)', 
              fontWeight: '600', 
              marginBottom: 'var(--spacing-sm)',
              color: 'var(--colors-text-primary)'
            }}>
              Your Bid Amount *
            </label>
            <div style={{ position: 'relative' }}>
              <DollarSign 
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
                type="number"
                value={proposal.bidAmount}
                onChange={(e) => setProposal(prev => ({ ...prev, bidAmount: e.target.value }))}
                placeholder="Enter your bid amount"
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md) var(--spacing-md) var(--spacing-md) 40px',
                  border: `2px solid ${errors.bidAmount ? '#ef4444' : 'var(--colors-border-subtle)'}`,
                  borderRadius: 'var(--border-radius-lg)',
                  fontSize: 'var(--body-font-size)',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--colors-primary-lime)'}
                onBlur={(e) => e.target.style.borderColor = errors.bidAmount ? '#ef4444' : 'var(--colors-border-subtle)'}
              />
            </div>
            {errors.bidAmount && (
              <p style={{ color: '#ef4444', fontSize: 'var(--metadata-font-size)', marginTop: 'var(--spacing-sm)' }}>
                {errors.bidAmount}
              </p>
            )}
            <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--metadata-font-size)', marginTop: 'var(--spacing-sm)' }}>
              This amount will be held in escrow once your proposal is accepted.
            </p>
          </div>

          {/* Timeline */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: 'var(--body-font-size)', 
              fontWeight: '600', 
              marginBottom: 'var(--spacing-sm)',
              color: 'var(--colors-text-primary)'
            }}>
              Your Timeline *
            </label>
            <div style={{ position: 'relative' }}>
              <Calendar 
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
                value={proposal.timeline}
                onChange={(e) => setProposal(prev => ({ ...prev, timeline: e.target.value }))}
                placeholder="e.g., 2 weeks, 1 month"
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md) var(--spacing-md) var(--spacing-md) 40px',
                  border: `2px solid ${errors.timeline ? '#ef4444' : 'var(--colors-border-subtle)'}`,
                  borderRadius: 'var(--border-radius-lg)',
                  fontSize: 'var(--body-font-size)',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--colors-primary-lime)'}
                onBlur={(e) => e.target.style.borderColor = errors.timeline ? '#ef4444' : 'var(--colors-border-subtle)'}
              />
            </div>
            {errors.timeline && (
              <p style={{ color: '#ef4444', fontSize: 'var(--metadata-font-size)', marginTop: 'var(--spacing-sm)' }}>
                {errors.timeline}
              </p>
            )}
          </div>

          {/* Proposal Message */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: 'var(--body-font-size)', 
              fontWeight: '600', 
              marginBottom: 'var(--spacing-sm)',
              color: 'var(--colors-text-primary)'
            }}>
              Proposal Message *
            </label>
            <textarea
              value={proposal.message}
              onChange={(e) => setProposal(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Explain why you're the best fit for this project. Include your relevant experience and approach..."
              rows={6}
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                border: `2px solid ${errors.message ? '#ef4444' : 'var(--colors-border-subtle)'}`,
                borderRadius: 'var(--border-radius-lg)',
                fontSize: 'var(--body-font-size)',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--colors-primary-lime)'}
              onBlur={(e) => e.target.style.borderColor = errors.message ? '#ef4444' : 'var(--colors-border-subtle)'}
            />
            {errors.message && (
              <p style={{ color: '#ef4444', fontSize: 'var(--metadata-font-size)', marginTop: 'var(--spacing-sm)' }}>
                {errors.message}
              </p>
            )}
          </div>

          {/* Deliverables */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: 'var(--body-font-size)', 
              fontWeight: '600', 
              marginBottom: 'var(--spacing-sm)',
              color: 'var(--colors-text-primary)'
            }}>
              Deliverables *
            </label>
            <textarea
              value={proposal.deliverables}
              onChange={(e) => setProposal(prev => ({ ...prev, deliverables: e.target.value }))}
              placeholder="List all deliverables you will provide (e.g., source files, documentation, revisions, etc.)"
              rows={4}
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                border: `2px solid ${errors.deliverables ? '#ef4444' : 'var(--colors-border-subtle)'}`,
                borderRadius: 'var(--border-radius-lg)',
                fontSize: 'var(--body-font-size)',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--colors-primary-lime)'}
              onBlur={(e) => e.target.style.borderColor = errors.deliverables ? '#ef4444' : 'var(--colors-border-subtle)'}
            />
            {errors.deliverables && (
              <p style={{ color: '#ef4444', fontSize: 'var(--metadata-font-size)', marginTop: 'var(--spacing-sm)' }}>
                {errors.deliverables}
              </p>
            )}
          </div>

          {/* File Attachments */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: 'var(--body-font-size)', 
              fontWeight: '600', 
              marginBottom: 'var(--spacing-sm)',
              color: 'var(--colors-text-primary)'
            }}>
              Portfolio Samples (Optional)
            </label>
            
            <div 
              style={{
                border: '2px dashed var(--colors-border-subtle)',
                borderRadius: 'var(--border-radius-lg)',
                padding: 'var(--spacing-xl)',
                textAlign: 'center',
                backgroundColor: 'var(--colors-background-surface)',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease'
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFileUpload({ target: { files: e.dataTransfer.files } });
              }}
              onClick={() => document.getElementById('file-upload').click()}
            >
              <Upload size={32} style={{ color: 'var(--colors-text-secondary)', marginBottom: 'var(--spacing-md)' }} />
              <p style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-secondary)' }}>
                Drag & drop files here or click to browse
              </p>
              <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)', marginTop: 'var(--spacing-sm)' }}>
                PDF, DOC, images up to 10MB each
              </p>
            </div>
            
            <input
              id="file-upload"
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />

            {/* Attached Files */}
            {proposal.attachments.length > 0 && (
              <div style={{ marginTop: 'var(--spacing-md)' }}>
                <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                  Attached Files:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                  {proposal.attachments.map((file, index) => (
                    <div 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'var(--spacing-sm)',
                        backgroundColor: 'var(--colors-background-surface)',
                        borderRadius: 'var(--border-radius-md)',
                        border: '1px solid var(--colors-border-subtle)'
                      }}
                    >
                      <div className="flex items-center gap-sm">
                        <FileText size={16} style={{ color: 'var(--colors-text-secondary)' }} />
                        <span style={{ fontSize: 'var(--body-font-size)' }}>
                          {file.name}
                        </span>
                        <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#ef4444',
                          padding: 'var(--spacing-sm)'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Terms and Conditions */}
          <div 
            style={{
              padding: 'var(--spacing-lg)',
              backgroundColor: 'var(--colors-primary-lime)',
              borderRadius: 'var(--border-radius-lg)',
              border: '1px solid var(--colors-primary-limeText)'
            }}
          >
            <div className="flex items-start gap-md">
              <AlertCircle size={20} style={{ color: 'var(--colors-primary-limeText)', marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', color: 'var(--colors-primary-limeText)', marginBottom: 'var(--spacing-sm)' }}>
                  Important Terms
                </h4>
                <ul style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-primary-limeText)', lineHeight: '1.6' }}>
                  <li>Your bid amount will be held in escrow once accepted</li>
                  <li>You agree to deliver work according to the timeline specified</li>
                  <li>Payment will be released upon project completion and client approval</li>
                  <li>All communications must go through the GigCampus platform</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-md">
            <button 
              type="button" 
              onClick={onClose}
              className="button button-outline"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="button button-primary"
              style={{ flex: 1 }}
            >
              <CheckCircle size={16} />
              Submit Proposal
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ProposalModal;
