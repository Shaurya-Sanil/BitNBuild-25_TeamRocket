import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, MessageCircle } from 'lucide-react';

const BrowseFreelancers = ({ user }) => {
  const navigate = useNavigate();

  const freelancers = [
    {
      id: 1,
      name: 'Sarah Kim',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=160&h=160&fit=crop&crop=face',
      title: 'Logo & Brand Designer',
      rating: 4.9,
      university: 'Stanford',
      bio: 'Brand-focused designer creating modern, memorable logos and identities for startups and campus orgs.',
      skills: ['Logo Design', 'Branding', 'Illustration'],
      hourlyRate: '$40/hr',
      availability: '10 hrs/week',
      location: 'Palo Alto, CA'
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face',
      title: 'Fullstack Developer',
      rating: 4.8,
      university: 'UC Berkeley',
      bio: 'Fullstack engineer specialized in React and Node.js with experience building marketplace platforms.',
      skills: ['React', 'Node.js', 'Databases'],
      hourlyRate: '$50/hr',
      availability: '20 hrs/week',
      location: 'Berkeley, CA'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=face',
      title: 'Social Media Marketer',
      rating: 4.7,
      university: 'MIT',
      bio: 'Helps campus brands grow engagement through data-driven content and campaign strategy.',
      skills: ['Content', 'Ads', 'Strategy'],
      hourlyRate: '$35/hr',
      availability: '15 hrs/week',
      location: 'Cambridge, MA'
    },
    {
      id: 4,
      name: 'Alex Johnson',
      avatar: '',
      title: 'Mobile App Designer',
      rating: 4.6,
      university: 'Harvard',
      bio: 'UI/UX designer focusing on mobile-first experiences and polished prototypes.',
      skills: ['Figma', 'Prototyping', 'User Research'],
      hourlyRate: '$45/hr',
      availability: '5 hrs/week',
      location: 'Cambridge, MA'
    }
  ];

  const handleMessage = (freelancer) => {
    navigate(`/client/chat?with=${freelancer.id}`);
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xl)' }}>
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 700 }}>Browse Freelancers</h1>
        <p style={{ color: 'var(--colors-text-secondary)' }}>Find talented freelancers from your campus and message them directly.</p>
      </div>

      <div className="grid grid-2" style={{ gap: 'var(--spacing-lg)' }}>
        {freelancers.map(f => (
          <div key={f.id} className="card card-light" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', minHeight: 320 }}>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'flex-start' }}>
              {f.avatar ? (
                <img src={f.avatar} alt={f.name} style={{ width: 84, height: 84, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              ) : (
                <div style={{ width: 84, height: 84, borderRadius: '50%', backgroundColor: 'var(--colors-neutral-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>{f.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-sm)' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</div>
                    <div style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--metadata-font-size)' }}>{f.title} • {f.university}</div>
                  </div>
                  <div style={{ textAlign: 'right', marginLeft: 'var(--spacing-md)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--colors-primary-limeText)' }}>{f.hourlyRate}</div>
                    <div style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--metadata-font-size)' }}>{f.availability}</div>
                  </div>
                </div>

                <p style={{ color: 'var(--colors-text-secondary)', marginTop: '8px', marginBottom: '8px' }}>{f.bio}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  {f.skills.map(skill => (
                    <span key={skill} style={{ padding: '4px 8px', backgroundColor: 'var(--colors-background-surface)', borderRadius: 'var(--border-radius-md)', fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)', border: '1px solid var(--colors-border-subtle)' }}>{skill}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--colors-text-secondary)' }}>
                    <Star size={14} style={{ color: 'var(--colors-primary-limeText)' }} />
                    <span>{f.rating}</span>
                    <span style={{ marginLeft: 8 }}>{f.location}</span>
                  </div>

                  <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                    <Link to={`/portfolio`} className="button button-outline">View Profile</Link>
                    <button className="button button-primary" onClick={() => handleMessage(f)}>
                      <MessageCircle size={14} style={{ marginRight: 6 }} /> Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseFreelancers;
