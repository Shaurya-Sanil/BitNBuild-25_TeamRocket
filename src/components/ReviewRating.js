import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Clock,
  CheckCircle,
  User,
  Calendar,
  DollarSign,
  Send,
  Heart,
  Award,
  Shield
} from 'lucide-react';

const ReviewRating = ({ user }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock project data
  const project = {
    id: 1,
    title: 'Modern Logo Design for Campus Startup',
    description: 'Looking for a talented designer to create a modern, minimalist logo for our campus-based food delivery startup.',
    budget: '$200',
    timeline: '1-2 weeks',
    deadline: 'Dec 15, 2024',
    completedDate: 'Dec 14, 2024',
    freelancer: {
      name: 'Sarah Kim',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      rating: 4.9,
      completedProjects: 45,
      responseTime: '1 hour',
      location: 'Stanford University'
    }
  };

  const ratingCategories = [
    {
      id: 'quality',
      label: 'Quality of Work',
      description: 'How satisfied are you with the final deliverables?'
    },
    {
      id: 'communication',
      label: 'Communication',
      description: 'How well did the freelancer communicate throughout the project?'
    },
    {
      id: 'timeliness',
      label: 'Timeliness',
      description: 'Did the freelancer meet deadlines and deliver on time?'
    },
    {
      id: 'professionalism',
      label: 'Professionalism',
      description: 'How professional was the freelancer\'s approach?'
    }
  ];

  const [categoryRatings, setCategoryRatings] = useState({
    quality: 0,
    communication: 0,
    timeliness: 0,
    professionalism: 0
  });

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCategoryRatingChange = (category, newRating) => {
    setCategoryRatings(prev => ({
      ...prev,
      [category]: newRating
    }));
  };

  const handleSubmitReview = async () => {
    if (rating === 0 || !reviewText.trim()) {
      alert('Please provide a rating and write a review.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    
    alert('Thank you for your review! Your feedback helps improve the GigCampus community.');
    // In a real app, this would redirect to a success page or back to projects
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return '';
    }
  };

  const getOverallRatingText = (rating) => {
    switch (rating) {
      case 1: return 'Very Dissatisfied';
      case 2: return 'Dissatisfied';
      case 3: return 'Neutral';
      case 4: return 'Satisfied';
      case 5: return 'Very Satisfied';
      default: return 'Select a rating';
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
          Rate & Review
        </h1>
        <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
          Help other clients by sharing your experience with {project.freelancer.name}
        </p>
      </div>

      {/* Project Summary */}
      <div className="card card-light" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
          Project Completed
        </h3>
        
        <div className="grid grid-3" style={{ gap: 'var(--spacing-lg)' }}>
          <div>
            <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              Project
            </h4>
            <p style={{ color: 'var(--colors-text-secondary)' }}>
              {project.title}
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              Budget
            </h4>
            <p style={{ color: 'var(--colors-primary-limeText)', fontWeight: '600' }}>
              {project.budget}
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              Completed
            </h4>
            <p style={{ color: 'var(--colors-text-secondary)' }}>
              {project.completedDate}
            </p>
          </div>
        </div>
      </div>

      {/* Freelancer Info */}
      <div className="card card-light" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-lg)' }}>
          <img
            src={project.freelancer.avatar}
            alt={project.freelancer.name}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              {project.freelancer.name}
            </h3>
            <div className="flex items-center gap-sm" style={{ marginBottom: 'var(--spacing-sm)' }}>
              <Star size={16} style={{ color: 'var(--colors-primary-limeText)' }} />
              <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                {project.freelancer.rating}
              </span>
              <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                ({project.freelancer.completedProjects} projects)
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
      </div>

      <div className="grid grid-2" style={{ gap: 'var(--spacing-xl)' }}>
        {/* Rating Form */}
        <div className="card card-light">
          <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
            Overall Rating
          </h3>
          
          {/* Overall Rating */}
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <div className="flex items-center gap-lg" style={{ marginBottom: 'var(--spacing-md)' }}>
              <div className="flex gap-sm">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0'
                    }}
                  >
                    <Star
                      size={32}
                      style={{
                        color: star <= (hoveredRating || rating) ? 'var(--colors-primary-limeText)' : 'var(--colors-border-subtle)',
                        fill: star <= (hoveredRating || rating) ? 'var(--colors-primary-limeText)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    />
                  </button>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                  {getOverallRatingText(rating)}
                </div>
                <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                  {rating > 0 && `${rating} out of 5 stars`}
                </div>
              </div>
            </div>
          </div>

          {/* Category Ratings */}
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-lg)' }}>
              Rate Specific Aspects
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
              {ratingCategories.map(category => (
                <div key={category.id}>
                  <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <div style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                      {category.label}
                    </div>
                    <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                      {category.description}
                    </div>
                  </div>
                  <div className="flex gap-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleCategoryRatingChange(category.id, star)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0'
                        }}
                      >
                        <Star
                          size={20}
                          style={{
                            color: star <= categoryRatings[category.id] ? 'var(--colors-primary-limeText)' : 'var(--colors-border-subtle)',
                            fill: star <= categoryRatings[category.id] ? 'var(--colors-primary-limeText)' : 'none',
                            transition: 'all 0.2s ease'
                          }}
                        />
                      </button>
                    ))}
                    {categoryRatings[category.id] > 0 && (
                      <span style={{ 
                        fontSize: 'var(--metadata-font-size)', 
                        color: 'var(--colors-text-secondary)',
                        marginLeft: 'var(--spacing-sm)'
                      }}>
                        {getRatingText(categoryRatings[category.id])}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Written Review */}
          <div>
            <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              Write a Review
            </h4>
            <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
              Share your experience to help other clients make informed decisions.
            </p>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Describe your experience working with this freelancer. What did you like? What could be improved?"
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
            <div style={{ 
              fontSize: 'var(--metadata-font-size)', 
              color: 'var(--colors-text-secondary)',
              marginTop: 'var(--spacing-sm)'
            }}>
              {reviewText.length} characters
            </div>
          </div>
        </div>

        {/* Tips & Guidelines */}
        <div className="card card-light">
          <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
            Review Guidelines
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div>
              <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                💡 Be Specific
              </h4>
              <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                Mention specific aspects of the work, communication style, or project management that stood out.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                🎯 Be Constructive
              </h4>
              <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                If there were issues, provide constructive feedback that could help the freelancer improve.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                ⭐ Be Honest
              </h4>
              <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                Your honest feedback helps maintain the quality of the GigCampus community.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                🤝 Be Respectful
              </h4>
              <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                Keep your review professional and respectful, even if you had a negative experience.
              </p>
            </div>
          </div>

          {/* Review Preview */}
          {rating > 0 && (
            <div style={{ 
              marginTop: 'var(--spacing-xl)',
              padding: 'var(--spacing-lg)',
              backgroundColor: 'var(--colors-background-surface)',
              borderRadius: 'var(--border-radius-lg)',
              border: '1px solid var(--colors-border-subtle)'
            }}>
              <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>
                Review Preview
              </h4>
              <div className="flex items-center gap-sm" style={{ marginBottom: 'var(--spacing-sm)' }}>
                <div className="flex gap-sm">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      style={{
                        color: star <= rating ? 'var(--colors-primary-limeText)' : 'var(--colors-border-subtle)',
                        fill: star <= rating ? 'var(--colors-primary-limeText)' : 'none'
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                  {getOverallRatingText(rating)}
                </span>
              </div>
              {reviewText && (
                <p style={{ 
                  fontSize: 'var(--metadata-font-size)', 
                  color: 'var(--colors-text-secondary)',
                  fontStyle: 'italic'
                }}>
                  "{reviewText.substring(0, 100)}{reviewText.length > 100 ? '...' : ''}"
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="card card-light" style={{ marginTop: 'var(--spacing-xl)' }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              Ready to submit your review?
            </h3>
            <p style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
              Your review will be visible on {project.freelancer.name}'s profile and help other clients.
            </p>
          </div>
          <button 
            className="button button-secondary"
            onClick={handleSubmitReview}
            disabled={isSubmitting || rating === 0 || !reviewText.trim()}
            style={{ 
              opacity: (isSubmitting || rating === 0 || !reviewText.trim()) ? 0.5 : 1,
              cursor: (isSubmitting || rating === 0 || !reviewText.trim()) ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? (
              <>
                <Clock size={16} />
                Submitting...
              </>
            ) : (
              <>
                <Send size={16} />
                Submit Review
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewRating;
