import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Star,
  MessageCircle,
  Clock,
  DollarSign,
  User,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  Award,
  Shield,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

const BidReview = ({ user }) => {
  const [selectedBid, setSelectedBid] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock project data
  const project = {
    id: 1,
    title: 'Modern Logo Design for Campus Startup',
    description: 'Looking for a talented designer to create a modern, minimalist logo for our campus-based food delivery startup. Should reflect innovation and trust.',
    budget: '$200 - $400',
    timeline: '1-2 weeks',
    deadline: 'Dec 15, 2024',
    category: 'Graphics & Design',
    postedDate: 'Dec 1, 2024',
    totalBids: 12
  };

  const bids = [
    {
      id: 1,
      freelancer: {
        name: 'David Park',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        rating: 4.9,
        completedProjects: 45,
        totalEarnings: 12500,
        responseTime: '1 hour',
        location: 'Stanford University',
        joinedDate: 'Jan 2022',
        skills: ['Logo Design', 'Branding', 'Illustration', 'Adobe Illustrator', 'Photoshop']
      },
      bidAmount: '$180',
      timeline: '1 week',
      message: `Hi! I'm excited about your logo design project. I have extensive experience in logo design for campus organizations and startups. 

I understand you need a modern, minimalist logo that reflects innovation and trust. I'll create several concepts for you to choose from, and we can iterate until you're completely satisfied.

My process includes:
- Initial concept sketches (3-5 options)
- Refined designs based on your feedback
- Final logo in multiple formats (PNG, SVG, AI)
- Brand guidelines document

I'm available for revisions and can deliver within 1 week. Looking forward to working with you!`,
      submittedDate: 'Dec 2, 2024',
      status: 'pending',
      portfolio: [
        {
          title: 'Tech Startup Logo',
          image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
          description: 'Modern logo for a fintech startup'
        },
        {
          title: 'Campus Club Branding',
          image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=200&fit=crop',
          description: 'Complete branding package for university club'
        }
      ],
      reviews: [
        {
          client: 'Sarah Johnson',
          rating: 5,
          comment: 'Excellent work! David delivered exactly what I envisioned and was very responsive to feedback.',
          project: 'Logo Design',
          date: 'Nov 2024'
        },
        {
          client: 'Mike Chen',
          rating: 5,
          comment: 'Professional and creative. Highly recommend for any design work.',
          project: 'Brand Identity',
          date: 'Oct 2024'
        }
      ]
    },
    {
      id: 2,
      freelancer: {
        name: 'Lisa Wang',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        rating: 4.8,
        completedProjects: 32,
        totalEarnings: 8900,
        responseTime: '2 hours',
        location: 'UC Berkeley',
        joinedDate: 'Mar 2022',
        skills: ['Logo Design', 'UI/UX Design', 'Branding', 'Figma', 'Adobe Creative Suite']
      },
      bidAmount: '$220',
      timeline: '1-2 weeks',
      message: `Hello! I'm a graphic designer with a passion for creating memorable brand identities. Your project caught my attention because I love working with campus organizations.

I'll provide you with:
- 3 initial logo concepts
- 2 rounds of revisions
- Final files in all necessary formats
- A simple brand guide

I'm committed to understanding your vision and creating something that truly represents your startup. Let's discuss your preferences and get started!`,
      submittedDate: 'Dec 2, 2024',
      status: 'pending',
      portfolio: [
        {
          title: 'Restaurant Logo',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
          description: 'Vibrant logo design for local restaurant'
        }
      ],
      reviews: [
        {
          client: 'Emma Rodriguez',
          rating: 4,
          comment: 'Good work, took a bit longer than expected but quality was solid.',
          project: 'Logo Design',
          date: 'Nov 2024'
        }
      ]
    },
    {
      id: 3,
      freelancer: {
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        rating: 4.7,
        completedProjects: 28,
        totalEarnings: 6700,
        responseTime: '3 hours',
        location: 'MIT',
        joinedDate: 'Jun 2022',
        skills: ['Logo Design', 'Print Design', 'Branding', 'Typography', 'Adobe Illustrator']
      },
      bidAmount: '$250',
      timeline: '2 weeks',
      message: `Hi there! I specialize in logo design and have worked with several campus startups. I understand the importance of creating a logo that resonates with your target audience.

My approach includes:
- Thorough research on your industry and competitors
- Multiple design concepts
- Collaborative refinement process
- Professional delivery in all formats

I'm confident I can create a logo that perfectly captures your startup's innovative spirit. Let's discuss your vision!`,
      submittedDate: 'Dec 3, 2024',
      status: 'pending',
      portfolio: [],
      reviews: [
        {
          client: 'Alex Johnson',
          rating: 5,
          comment: 'James was professional and delivered great results. Would work with him again.',
          project: 'Brand Identity',
          date: 'Oct 2024'
        }
      ]
    },
    {
      id: 4,
      freelancer: {
        name: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        rating: 4.6,
        completedProjects: 19,
        totalEarnings: 4200,
        responseTime: '4 hours',
        location: 'NYU',
        joinedDate: 'Sep 2022',
        skills: ['Logo Design', 'Illustration', 'Digital Art', 'Procreate', 'Adobe Photoshop']
      },
      bidAmount: '$160',
      timeline: '1 week',
      message: `Hello! I'm a creative designer who loves working on logo projects. Your campus startup sounds exciting!

I'll create a modern, clean logo that represents innovation and trust. My process is collaborative, and I'll keep you updated throughout the design process.

What I'll deliver:
- 3 unique logo concepts
- Unlimited revisions until you're satisfied
- High-resolution files in multiple formats
- Quick turnaround time

Looking forward to bringing your vision to life!`,
      submittedDate: 'Dec 3, 2024',
      status: 'rejected',
      portfolio: [],
      reviews: []
    }
  ];

  const filteredBids = bids.filter(bid => {
    if (filterStatus === 'all') return true;
    return bid.status === filterStatus;
  });

  const handleAcceptBid = (bidId) => {
    if (window.confirm('Are you sure you want to accept this bid? This will start the project with the selected freelancer.')) {
      console.log('Accept bid:', bidId);
      // Update bid status and create project
    }
  };

  const handleRejectBid = (bidId) => {
    if (window.confirm('Are you sure you want to reject this bid?')) {
      console.log('Reject bid:', bidId);
      // Update bid status
    }
  };

  const handleMessageFreelancer = (freelancerId) => {
    console.log('Message freelancer:', freelancerId);
    // Open chat or navigate to messages
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
          Review Bids
        </h1>
        <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
          {project.totalBids} freelancers have submitted bids for your project
        </p>
      </div>

      {/* Project Summary */}
      <div className="card card-light" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h3 className="heading" style={{ marginBottom: 'var(--spacing-lg)' }}>
          Project: {project.title}
        </h3>
        
        <div className="grid grid-3" style={{ gap: 'var(--spacing-lg)' }}>
          <div>
            <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
              Budget Range
            </h4>
            <p style={{ color: 'var(--colors-text-secondary)' }}>
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
              Deadline
            </h4>
            <p style={{ color: 'var(--colors-text-secondary)' }}>
              {project.deadline}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="card card-light" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="flex gap-sm">
          {[
            { id: 'all', label: 'All Bids', count: bids.length },
            { id: 'pending', label: 'Pending', count: bids.filter(b => b.status === 'pending').length },
            { id: 'accepted', label: 'Accepted', count: bids.filter(b => b.status === 'accepted').length },
            { id: 'rejected', label: 'Rejected', count: bids.filter(b => b.status === 'rejected').length }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setFilterStatus(filter.id)}
              className="button"
              style={{
                backgroundColor: filterStatus === filter.id ? 'var(--colors-neutral-dark)' : 'var(--colors-background-surface)',
                color: filterStatus === filter.id ? 'var(--colors-text-onDark)' : 'var(--colors-text-primary)',
                border: 'none',
                fontSize: 'var(--body-font-size)'
              }}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Bids List */}
      <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
        {filteredBids.map(bid => (
          <div key={bid.id} className="card card-light">
            <div className="flex items-start gap-lg">
              {/* Freelancer Profile */}
              <div style={{ minWidth: '200px' }}>
                <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-md)' }}>
                  <img
                    src={bid.freelancer.avatar}
                    alt={bid.freelancer.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                      {bid.freelancer.name}
                    </h4>
                    <div className="flex items-center gap-sm">
                      <Star size={14} style={{ color: 'var(--colors-primary-limeText)' }} />
                      <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                        {bid.freelancer.rating} ({bid.freelancer.completedProjects} projects)
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                  <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                    <strong>Response Time:</strong> {bid.freelancer.responseTime}
                  </div>
                  <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                    <strong>Location:</strong> {bid.freelancer.location}
                  </div>
                  <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                    <strong>Joined:</strong> {bid.freelancer.joinedDate}
                  </div>
                </div>

                <div>
                  <h5 style={{ fontSize: 'var(--metadata-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                    Skills:
                  </h5>
                  <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
                    {bid.freelancer.skills.slice(0, 3).map(skill => (
                      <span 
                        key={skill}
                        style={{
                          padding: '2px 6px',
                          backgroundColor: 'var(--colors-primary-lime)',
                          borderRadius: 'var(--border-radius-md)',
                          fontSize: 'var(--metadata-font-size)',
                          color: 'var(--colors-primary-limeText)'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                    {bid.freelancer.skills.length > 3 && (
                      <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                        +{bid.freelancer.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bid Details */}
              <div style={{ flex: 1 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-md)' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                      Bid Proposal
                    </h3>
                    <div className="flex items-center gap-lg">
                      <div className="flex items-center gap-sm">
                        <DollarSign size={16} style={{ color: 'var(--colors-primary-limeText)' }} />
                        <span style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', color: 'var(--colors-primary-limeText)' }}>
                          {bid.bidAmount}
                        </span>
                      </div>
                      <div className="flex items-center gap-sm">
                        <Clock size={16} style={{ color: 'var(--colors-text-secondary)' }} />
                        <span style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-secondary)' }}>
                          {bid.timeline}
                        </span>
                      </div>
                      <div className="flex items-center gap-sm">
                        <Calendar size={16} style={{ color: 'var(--colors-text-secondary)' }} />
                        <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>
                          Submitted {bid.submittedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    padding: '4px 8px',
                    borderRadius: 'var(--border-radius-md)',
                    backgroundColor: bid.status === 'pending' ? 'var(--colors-primary-lime)' : 
                                   bid.status === 'accepted' ? 'var(--colors-secondary-purple)' : 'var(--colors-text-secondary)',
                    color: bid.status === 'pending' ? 'var(--colors-primary-limeText)' : 'var(--colors-text-onDark)',
                    fontSize: 'var(--metadata-font-size)',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {bid.status}
                  </div>
                </div>

                <div style={{ 
                  backgroundColor: 'var(--colors-background-surface)',
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--border-radius-lg)',
                  marginBottom: 'var(--spacing-md)'
                }}>
                  <p style={{ 
                    fontSize: 'var(--body-font-size)',
                    lineHeight: '1.6',
                    color: 'var(--colors-text-primary)'
                  }}>
                    {bid.message}
                  </p>
                </div>

                {/* Portfolio Preview */}
                {bid.portfolio.length > 0 && (
                  <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <h5 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                      Portfolio Samples:
                    </h5>
                    <div className="flex gap-md">
                      {bid.portfolio.slice(0, 2).map((item, index) => (
                        <div key={index} style={{ textAlign: 'center' }}>
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{
                              width: '80px',
                              height: '60px',
                              borderRadius: 'var(--border-radius-md)',
                              objectFit: 'cover',
                              marginBottom: 'var(--spacing-sm)'
                            }}
                          />
                          <div style={{ fontSize: 'var(--metadata-font-size)', fontWeight: '600' }}>
                            {item.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Reviews */}
                {bid.reviews.length > 0 && (
                  <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <h5 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                      Recent Reviews:
                    </h5>
                    {bid.reviews.slice(0, 1).map((review, index) => (
                      <div key={index} style={{ 
                        padding: 'var(--spacing-sm)',
                        backgroundColor: 'var(--colors-background-surface)',
                        borderRadius: 'var(--border-radius-md)',
                        fontSize: 'var(--metadata-font-size)'
                      }}>
                        <div className="flex items-center gap-sm" style={{ marginBottom: 'var(--spacing-sm)' }}>
                          <Star size={12} style={{ color: 'var(--colors-primary-limeText)' }} />
                          <span style={{ fontWeight: '600' }}>{review.client}</span>
                          <span style={{ color: 'var(--colors-text-secondary)' }}>• {review.project}</span>
                        </div>
                        <p style={{ color: 'var(--colors-text-secondary)' }}>
                          "{review.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-sm">
                    <button 
                      className="button button-outline"
                      onClick={() => handleMessageFreelancer(bid.freelancer.name)}
                    >
                      <MessageCircle size={16} />
                      Message
                    </button>
                    <button 
                      className="button button-outline"
                      onClick={() => setSelectedBid(bid)}
                    >
                      <Eye size={16} />
                      View Full Profile
                    </button>
                  </div>
                  
                  {bid.status === 'pending' && (
                    <div className="flex gap-sm">
                      <button 
                        className="button button-outline"
                        onClick={() => handleRejectBid(bid.id)}
                        style={{ color: '#ef4444', borderColor: '#ef4444' }}
                      >
                        <XCircle size={16} />
                        Reject
                      </button>
                      <button 
                        className="button button-secondary"
                        onClick={() => handleAcceptBid(bid.id)}
                      >
                        <CheckCircle size={16} />
                        Accept Bid
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBids.length === 0 && (
        <div className="card card-light" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-md)' }}>No bids found</h3>
          <p style={{ color: 'var(--colors-text-secondary)' }}>
            {filterStatus === 'all' ? 'No bids have been submitted yet.' : `No ${filterStatus} bids found.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default BidReview;
