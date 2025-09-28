import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { userService } from '../firebase/database';

const Auth = ({ setUser }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [role, setRole] = useState('freelancer'); // 'freelancer' | 'client'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password || (mode === 'signup' && !name)) return;

    setLoading(true);
    setError('');

    try {
      let userCredential;
      
      if (mode === 'signup') {
        // Create new user account
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update the user's display name
        await updateProfile(userCredential.user, {
          displayName: name
        });

        // Create user profile in Firestore
        const userData = {
          displayName: name,
          email: email,
          role: role,
          avatar: '',
          reputation: 0,
          completedProjects: 0,
          totalEarnings: 0,
          createdAt: new Date()
        };

        await userService.createOrUpdateUser(userCredential.user.uid, userData);
      } else {
        // Sign in existing user
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      // Get user data from Firestore
      const userData = await userService.getUserById(userCredential.user.uid);
      
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        role: userData?.role || role,
        avatar: userData?.avatar || '',
        reputation: userData?.reputation || 0,
        completedProjects: userData?.completedProjects || 0,
        totalEarnings: userData?.totalEarnings || 0
      };

      setUser(user);
      
      // Navigate based on role
      if (user.role === 'client') {
        navigate('/client/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please try logging in instead.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-not-found':
        return 'No account found with this email. Please sign up first.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xl)' }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        {/* Role selection cards */}
        <div className="grid grid-2" style={{ gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
          <div
            className={`card ${role === 'client' ? 'card-purple' : 'card-light'}`}
            onClick={() => setRole('client')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setRole('client'); }}
            style={{ cursor: 'pointer' }}
          >
            <h3 className="heading">I'm a Client</h3>
            <p className="body">Post projects, review proposals, and hire talent.</p>
            <div style={{ marginTop: 'var(--spacing-md)' }}>
              <button
                className={`button ${role === 'client' ? 'button-primary' : 'button-outline'}`}
                onClick={(e) => { e.preventDefault(); setRole('client'); setMode('signup'); }}
              >Continue as Client</button>
            </div>
          </div>

          <div
            className={`card ${role === 'freelancer' ? 'card-lime' : 'card-light'}`}
            onClick={() => setRole('freelancer')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setRole('freelancer'); }}
            style={{ cursor: 'pointer' }}
          >
            <h3 className="heading">I'm a Freelancer</h3>
            <p className="body">Find gigs, submit proposals, and get paid.</p>
            <div style={{ marginTop: 'var(--spacing-md)' }}>
              <button
                className={`button ${role === 'freelancer' ? 'button-primary' : 'button-outline'}`}
                onClick={(e) => { e.preventDefault(); setRole('freelancer'); setMode('signup'); }}
              >Continue as Freelancer</button>
            </div>
          </div>
        </div>

        <div className="card card-light">
          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-md)' }}>
            <div>
              <h2 className="heading" style={{ fontSize: '1.25rem' }}>{mode === 'login' ? 'Welcome back' : 'Create an account'}</h2>
              <p className="body" style={{ marginTop: '8px' }}>{role === 'client' ? 'Signing in as a Client' : 'Signing in as a Freelancer'}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`button ${mode === 'login' ? 'button-primary' : 'button-outline'}`}
                disabled={loading}
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`button ${mode === 'signup' ? 'button-primary' : 'button-outline'}`}
                disabled={loading}
              >
                Sign up
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div style={{ 
              padding: 'var(--spacing-md)', 
              backgroundColor: '#fef2f2', 
              border: '1px solid #fecaca',
              borderRadius: 'var(--border-radius-md)',
              color: '#dc2626',
              marginBottom: 'var(--spacing-md)'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={submit} style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
            <div style={{ flex: 1 }}>
              {mode === 'signup' && (
                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label className="metadata">Full name</label>
                  <input value={name} onChange={e => setName(e.target.value)} className="" style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', border: '1px solid var(--colors-border-subtle)' }} />
                </div>
              )}

              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <label className="metadata">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" required style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', border: '1px solid var(--colors-border-subtle)' }} />
              </div>

              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <label className="metadata">Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" required style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', border: '1px solid var(--colors-border-subtle)' }} />
              </div>

              <div style={{ marginTop: 'var(--spacing-md)' }}>
                <button 
                  type="submit" 
                  className="button button-primary"
                  disabled={loading}
                  style={{ opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Please wait...' : (mode === 'login' ? 'Log in' : 'Create account')}
                </button>
              </div>
            </div>

            <div style={{ width: 260 }}>
              <div style={{ padding: 'var(--spacing-md)', borderRadius: '12px', backgroundColor: 'var(--colors-background-surface)', height: '100%' }}>
                <h4 className="heading">Selected role</h4>
                <p className="body" style={{ marginTop: '6px' }}>{role === 'client' ? 'Client — post projects and hire freelancers.' : 'Freelancer — find gigs and get paid.'}</p>
                <div style={{ marginTop: 'var(--spacing-md)' }}>
                  <div className="metadata">Switch role</div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button type="button" className={`button ${role === 'freelancer' ? 'button-primary' : 'button-outline'}`} onClick={() => setRole('freelancer')}>Freelancer</button>
                    <button type="button" className={`button ${role === 'client' ? 'button-primary' : 'button-outline'}`} onClick={() => setRole('client')}>Client</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
