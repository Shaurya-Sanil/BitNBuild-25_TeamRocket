import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Save,
  Edit3,
  X
} from 'lucide-react';
import { userService } from '../firebase/database';

const UserProfile = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    skills: [],
    avatar: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        skills: user.skills || [],
        avatar: user.avatar || ''
      });
    }
  }, [user]);

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

  const handleSave = async () => {
    setLoading(true);
    setError('');

    try {
      await userService.createOrUpdateUser(user.uid, formData);
      onUpdate({ ...user, ...formData });
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const skillSuggestions = [
    'Web Development', 'Mobile Development', 'UI/UX Design', 'Graphic Design',
    'Content Writing', 'Digital Marketing', 'Data Analysis', 'Photography',
    'Video Editing', 'Translation', 'Tutoring', 'Consulting'
  ];

  if (!user) {
    return (
      <div className="container" style={{ paddingTop: 'var(--spacing-xl)' }}>
        <div className="card card-light" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
          <h3>Please log in to view your profile</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xl)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
            My Profile
          </h1>
          <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
            Manage your profile information and preferences.
          </p>
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
          {/* Profile Info */}
          <div className="card card-light">
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 className="heading">Profile Information</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="button button-outline"
                disabled={loading}
              >
                {isEditing ? <X size={16} /> : <Edit3 size={16} />}
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
              {/* Avatar */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--colors-primary-lime)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--colors-primary-limeText)',
                  fontWeight: '600',
                  fontSize: '2rem',
                  margin: '0 auto var(--spacing-md)',
                  position: 'relative'
                }}>
                  {formData.displayName ? formData.displayName.charAt(0).toUpperCase() : 'U'}
                  {isEditing && (
                    <button
                      style={{
                        position: 'absolute',
                        bottom: '0',
                        right: '0',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--colors-primary-lime)',
                        border: '2px solid var(--colors-background-default)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Camera size={16} />
                    </button>
                  )}
                </div>
                <p style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                  {formData.displayName || 'User'}
                </p>
                <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                  {user.role === 'client' ? 'Client' : 'Freelancer'}
                </p>
              </div>

              {/* Form Fields */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: 'var(--body-font-size)', 
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => handleInputChange('displayName', e.target.value)}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '2px solid var(--colors-border-subtle)',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: 'var(--body-font-size)',
                    outline: 'none',
                    backgroundColor: isEditing ? 'var(--colors-background-default)' : 'var(--colors-background-surface)',
                    transition: 'border-color 0.2s ease'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: 'var(--body-font-size)', 
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '2px solid var(--colors-border-subtle)',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: 'var(--body-font-size)',
                    backgroundColor: 'var(--colors-background-surface)',
                    color: 'var(--colors-text-secondary)'
                  }}
                />
                <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)', marginTop: 'var(--spacing-sm)' }}>
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: 'var(--body-font-size)', 
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your phone number"
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '2px solid var(--colors-border-subtle)',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: 'var(--body-font-size)',
                    outline: 'none',
                    backgroundColor: isEditing ? 'var(--colors-background-default)' : 'var(--colors-background-surface)',
                    transition: 'border-color 0.2s ease'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: 'var(--body-font-size)', 
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your location"
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '2px solid var(--colors-border-subtle)',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: 'var(--body-font-size)',
                    outline: 'none',
                    backgroundColor: isEditing ? 'var(--colors-background-default)' : 'var(--colors-background-surface)',
                    transition: 'border-color 0.2s ease'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: 'var(--body-font-size)', 
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '2px solid var(--colors-border-subtle)',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: 'var(--body-font-size)',
                    outline: 'none',
                    resize: 'vertical',
                    backgroundColor: isEditing ? 'var(--colors-background-default)' : 'var(--colors-background-surface)',
                    transition: 'border-color 0.2s ease'
                  }}
                />
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="button button-primary"
                  style={{ 
                    opacity: loading ? 0.7 : 1,
                    alignSelf: 'flex-start'
                  }}
                >
                  <Save size={16} />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="card card-light">
            <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
              Skills & Expertise
            </h3>

            <div>
              <label style={{ 
                display: 'block', 
                fontSize: 'var(--body-font-size)', 
                fontWeight: '600',
                marginBottom: 'var(--spacing-sm)'
              }}>
                Your Skills
              </label>
              
              {/* Selected Skills */}
              <div className="flex gap-sm" style={{ marginBottom: 'var(--spacing-md)', flexWrap: 'wrap' }}>
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
                    {isEditing && (
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
                    )}
                  </span>
                ))}
              </div>

              {/* Skill Suggestions */}
              {isEditing && (
                <div>
                  <p style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                    Add Skills
                  </p>
                  <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
                    {skillSuggestions
                      .filter(skill => !formData.skills.includes(skill))
                      .slice(0, 8)
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
