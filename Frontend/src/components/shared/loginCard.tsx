import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { getUserByEmail } from '@/api/user';
import useGlobalContext from '@/hooks/useGlobalContext';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);

export function CardDemo() {
  const { setUser } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [claims, setClaims] = useState<{ email?: string } | null>(null);

  // Check URL params on initial render
  const params = new URLSearchParams(window.location.search);
  const hasTokenHash = params.get('token_hash');

  const [verifying, setVerifying] = useState(!!hasTokenHash);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState(false);

  useEffect(() => {
    // Check if we have token_hash in URL (magic link callback)
    const params = new URLSearchParams(window.location.search);
    const token_hash = params.get('token_hash');
    //const type = params.get('type');

    if (token_hash) {
      // Verify the OTP token
      supabase.auth
        .verifyOtp({
          token_hash,
          type: 'email',
        })
        .then(({ error }) => {
          if (error) {
            setAuthError(error.message);
          } else {
            setAuthSuccess(true);
            // Clear URL params
            window.history.replaceState({}, document.title, '/');
          }
          setVerifying(false);
        });
    }

    // Check for existing session using getClaims
    supabase.auth.getClaims().then(({ data }) => {
      if (data) {
        console.log('Existing session found:', data.claims);
        setClaims(data.claims);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(({ data }) => {
        if (data) {
          console.log('Auth state changed, updated claims:', data.claims);
          setClaims(data.claims);
        }
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);

    const login = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (login.error) {
      alert(login.error.message);
    } else {
      alert('Login successful!');
    }

    const data = await getUserByEmail(email);
    console.log('User data:', data);
    setUser(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setClaims(null);
    setUser(null);
  };

  // Show verification state
  if (verifying) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>Confirming your magic link...</p>
        <p>Loading...</p>
      </div>
    );
  }

  // Show auth error
  if (authError) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>✗ Authentication failed</p>
        <p>{authError}</p>
        <button
          onClick={() => {
            setAuthError(null);
            window.history.replaceState({}, document.title, '/');
          }}
        >
          Return to login
        </button>
      </div>
    );
  }

  // Show auth success (briefly before claims load)
  if (authSuccess && !claims) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>✓ Authentication successful!</p>
        <p>Loading your account...</p>
      </div>
    );
  }

  // If user is logged in, show welcome screen
  if (claims) {
    return (
      <div>
        <h1>Welcome!</h1>
        <p>You are logged in as: {claims.email}</p>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    );
  }

  // Show login form
  return (
    <div>
      <p>Sign in with your email and password below</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading}>
          {loading ? <span>Loading</span> : <span>Sign In</span>}
        </button>
      </form>
    </div>
  );
}
