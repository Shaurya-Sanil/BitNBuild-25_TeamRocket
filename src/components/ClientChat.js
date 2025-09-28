import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Chat from './Chat';

// ClientChat is a thin wrapper around Chat that can accept a `with` query param
// to preselect a conversation. For now we pass `user` through and Chat has
// internal mock conversations; in future this can be wired to real data.
const ClientChat = ({ user }) => {
  const [searchParams] = useSearchParams();
  const withId = searchParams.get('with');

  // We could pass the selected conversation id to Chat via props in the future.
  // For now, Chat keeps its own state; but we expose the intention by logging.
  const initialTarget = useMemo(() => {
    if (!withId) return null;
    const id = parseInt(withId, 10);
    if (Number.isNaN(id)) return null;
    return id;
  }, [withId]);

  return (
    <div>
      {/* Optionally show a contextual header for client chat */}
      <div className="container" style={{ paddingTop: 'var(--spacing-sm)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-sm)', fontSize: '1.5rem' }}>Messages</h2>
        <p style={{ color: 'var(--colors-text-secondary)' }}>Chat with freelancers you have contacted or found in Browse.</p>
      </div>

      {/* Render the chat UI. In the future we can pass initialTarget to Chat to select the conversation. */}
      <Chat user={user} initialTargetId={initialTarget} />
    </div>
  );
};

export default ClientChat;
