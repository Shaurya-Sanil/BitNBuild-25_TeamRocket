import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Plus,
  X,
  DollarSign,
  Calendar,
  Tag,
  FileText,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';
import { projectService } from '../firebase/database';

const PostProject = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    skills: [],
    budget: '',
    timeline: '',
    deadline: '',
    additionalRequirements: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Business',
    'Lifestyle',
    'Tutoring & Education'
  ];

  const skillSuggestions = [
    'Logo Design', 'Web Development', 'Content Writing', 'Social Media Marketing',
    'Video Editing', 'Photography', 'UI/UX Design', 'SEO', 'Copywriting',
    'Data Analysis', 'Tutoring', 'Translation', 'Voice Over', 'Animation',
    'Mobile App Development', 'E-commerce', 'Branding', 'Email Marketing'
  ];

  const timelineOptions = [
    'Less than 1 week',
    '1-2 weeks',
    '2-4 weeks',
    '1-2 months',
    '2+ months',
    'Ongoing'
  ];

  const steps = [
    { number: 1, title: 'Project Details', icon: FileText },
    { number: 2, title: 'Budget & Timeline', icon: DollarSign },
    { number: 3, title: 'Review & Submit', icon: CheckCircle }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillAdd = (skill) => {
    if (!formData.skills.includes(skill) && formData.skills.length < 10) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleSkillRemove = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      alert('Please log in to post a project');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        skills: formData.skills,
        budget: formData.budget,
        timeline: formData.timeline,
        deadline: formData.deadline,
        additionalRequirements: formData.additionalRequirements,
        clientName: user.displayName || user.email || 'Client',
        status: 'open',
        proposals: 0
      };

      await projectService.createProject(projectData, user.uid);
      alert('Project posted successfully!');
      navigate('/client/my-projects');
    } catch (err) {
      console.error('Error posting project:', err);
      setError('Failed to post project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.category && formData.skills.length > 0;
      case 2:
        return formData.budget && formData.timeline && formData.deadline;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <Link 
          to="/client/dashboard" 
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
          Back to Dashboard
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
          Post a New Project
        </h1>
        <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
          Describe your project requirements and find the perfect freelancer for your needs.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="card card-light" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className="flex items-center">
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: isCompleted ? 'var(--colors-primary-lime)' : isActive ? 'var(--colors-neutral-dark)' : 'var(--colors-border-subtle)',
                    color: isCompleted ? 'var(--colors-primary-limeText)' : isActive ? 'var(--colors-text-onDark)' : 'var(--colors-text-secondary)',
                    marginRight: 'var(--spacing-sm)'
                  }}
                >
                  {isCompleted ? <CheckCircle size={20} /> : <StepIcon size={20} />}
                </div>
                <div>
                  <div style={{ 
                    fontSize: 'var(--body-font-size)', 
                    fontWeight: isActive ? '600' : '400',
                    color: isActive ? 'var(--colors-text-primary)' : 'var(--colors-text-secondary)'
                  }}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div style={{ 
                    width: '40px', 
                    height: '2px', 
                    backgroundColor: isCompleted ? 'var(--colors-primary-lime)' : 'var(--colors-border-subtle)',
                    margin: '0 var(--spacing-md)'
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="card card-light" style={{ 
          marginBottom: 'var(--spacing-xl)', 
          backgroundColor: '#fef2f2', 
          border: '1px solid #fecaca',
          color: '#dc2626'
        }}>
          <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>Error</h3>
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-2" style={{ gap: 'var(--spacing-xl)' }}>
        {/* Form */}
        <div className="card card-light">
          {currentStep === 1 && (
            <div>
              <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
                Project Details
              </h3>
              
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: 'var(--body-font-size)', 
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Logo Design for Campus Startup"
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '2px solid var(--colors-border-subtle)',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: 'var(--body-font-size)',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--colors-primary-lime)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--colors-border-subtle)'}
                />
              </div>

              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: 'var(--body-font-size)', 
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Project Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your project requirements, expectations, and any specific details..."
                  rows={6}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '2px solid var(--colors-border-subtle)',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: 'var(--body-font-size)',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--colors-primary-lime)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--colors-border-subtle)'}
                />
              </div>

              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: 'var(--body-font-size)', 
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '2px solid var(--colors-border-subtle)',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: 'var(--body-font-size)',
                    outline: 'none',
                    backgroundColor: 'var(--colors-background-default)',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--colors-primary-lime)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--colors-border-subtle)'}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: 'var(--body-font-size)', 
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Required Skills * (Select up to 10)
                </label>
                
                {/* Selected Skills */}
                <div className="flex gap-sm" style={{ marginBottom: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                  {formData.skills.map(skill => (
                    <span 
                      key={skill}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        padding: '4px 8px',
                        backgroundColor: 'var(--colors-primary-lime)',
                        borderRadius: 'var(--border-radius-md)',
                        fontSize: 'var(--metadata-font-size)',
                        color: 'var(--colors-primary-limeText)'
                      }}
                    >
                      {skill}
                      <button
                        onClick={() => handleSkillRemove(skill)}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          cursor: 'pointer',
                          padding: '0',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Skill Suggestions */}
                <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
                  {skillSuggestions
                    .filter(skill => !formData.skills.includes(skill))
                    .slice(0, 12)
                    .map(skill => (
                      <button
                        key={skill}
                        onClick={() => handleSkillAdd(skill)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: 'var(--colors-background-surface)',
                          border: '1px solid var(--colors-border-subtle)',
                          borderRadius: 'var(--border-radius-md)',
                          fontSize: 'var(--metadata-font-size)',
                          color: 'var(--colors-text-secondary)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = 'var(--colors-primary-lime)';
                          e.target.style.color = 'var(--colors-primary-limeText)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'var(--colors-background-surface)';
                          e.target.style.color = 'var(--colors-text-secondary)';
                        }}
                      >
                        {skill}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
                Budget & Timeline
              </h3>
              
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: 'var(--body-font-size)', 
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Budget Range *
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="e.g., $200 - $400 or $30/hr"
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '2px solid var(--colors-border-subtle)',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: 'var(--body-font-size)',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--colors-primary-lime)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--colors-border-subtle)'}
                />
              </div>

              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: 'var(--body-font-size)', 
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Expected Timeline *
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '2px solid var(--colors-border-subtle)',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: 'var(--body-font-size)',
                    outline: 'none',
                    backgroundColor: 'var(--colors-background-default)',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--colors-primary-lime)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--colors-border-subtle)'}
                >
                  <option value="">Select timeline</option>
                  {timelineOptions.map(timeline => (
                    <option key={timeline} value={timeline}>{timeline}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: 'var(--body-font-size)', 
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Deadline *
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '2px solid var(--colors-border-subtle)',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: 'var(--body-font-size)',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--colors-primary-lime)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--colors-border-subtle)'}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: 'var(--body-font-size)', 
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Additional Requirements
                </label>
                <textarea
                  value={formData.additionalRequirements}
                  onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                  placeholder="Any additional requirements, preferences, or special instructions..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '2px solid var(--colors-border-subtle)',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: 'var(--body-font-size)',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--colors-primary-lime)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--colors-border-subtle)'}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
                Review & Submit
              </h3>
              
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                  Project Title
                </h4>
                <p style={{ color: 'var(--colors-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                  {formData.title}
                </p>

                <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                  Description
                </h4>
                <p style={{ color: 'var(--colors-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                  {formData.description}
                </p>

                <div className="grid grid-2" style={{ gap: 'var(--spacing-md)' }}>
                  <div>
                    <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                      Category
                    </h4>
                    <p style={{ color: 'var(--colors-text-secondary)' }}>
                      {formData.category}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                      Budget
                    </h4>
                    <p style={{ color: 'var(--colors-text-secondary)' }}>
                      {formData.budget}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                      Timeline
                    </h4>
                    <p style={{ color: 'var(--colors-text-secondary)' }}>
                      {formData.timeline}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                      Deadline
                    </h4>
                    <p style={{ color: 'var(--colors-text-secondary)' }}>
                      {formData.deadline}
                    </p>
                  </div>
                </div>

                <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                  Required Skills
                </h4>
                <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
                  {formData.skills.map(skill => (
                    <span 
                      key={skill}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: 'var(--colors-primary-lime)',
                        borderRadius: 'var(--border-radius-md)',
                        fontSize: 'var(--metadata-font-size)',
                        color: 'var(--colors-primary-limeText)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between" style={{ marginTop: 'var(--spacing-xl)' }}>
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="button button-outline"
              style={{ 
                opacity: currentStep === 1 ? 0.5 : 1,
                cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>
            
            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className="button button-primary"
                style={{ 
                  opacity: !isStepValid(currentStep) ? 0.5 : 1,
                  cursor: !isStepValid(currentStep) ? 'not-allowed' : 'pointer'
                }}
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="button button-secondary"
                style={{ 
                  opacity: isSubmitting ? 0.5 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Posting...' : 'Post Project'}
              </button>
            )}
          </div>
        </div>

        {/* Tips Sidebar */}
        <div className="card card-light">
          <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
            Tips for Better Results
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div>
              <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                📝 Clear Description
              </h4>
              <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                Be specific about what you need. Include examples, references, or detailed requirements.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                💰 Realistic Budget
              </h4>
              <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                Research market rates for similar projects to set a competitive budget.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                ⏰ Reasonable Timeline
              </h4>
              <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                Allow enough time for quality work. Rushed projects often lead to poor results.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                🎯 Relevant Skills
              </h4>
              <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                Select skills that match your project needs to attract qualified freelancers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostProject;
