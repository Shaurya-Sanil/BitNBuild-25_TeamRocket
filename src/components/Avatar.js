import React from 'react';

const Avatar = ({ src, alt = '', size = 40, className = '' }) => {
  const displaySrc = src || null;
  const name = alt || 'User';
  const initials = name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();

  const commonStyle = {
    width: size,
    height: size,
    borderRadius: '50%'
  };

  if (displaySrc) {
    return (
      <img
        src={displaySrc}
        alt={name}
        className={className}
        style={{ ...commonStyle, objectFit: 'cover' }}
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        ...commonStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--colors-neutral-medium)',
        color: 'var(--colors-text-onDark)',
        fontWeight: 700,
        fontSize: Math.max(12, Math.round(size / 2.8))
      }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
