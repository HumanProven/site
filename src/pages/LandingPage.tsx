import { useState, FormEvent } from 'react';
import './LandingPage.css';

interface BetaSignupForm {
  email: string;
  name: string;
}

export default function LandingPage() {
  const [formData, setFormData] = useState<BetaSignupForm>({
    email: '',
    name: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      if (!apiUrl) {
        setStatus('error');
        setMessage('Configuration error. Please contact support.');
        return;
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Check if response contains an error
      if (result.error) {
        setStatus('error');
        setMessage(result.error);
      } else if (result.message || response.ok) {
        setStatus('success');
        setMessage('Thank you for signing up! We\'ll be in touch soon.');
        setFormData({ email: '', name: '' });
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Unable to submit. Please check your connection and try again.');
    }
  };

  const socialLinks = [
    {
      label: 'Reddit',
      href: 'https://www.reddit.com/r/HumanProven/',
      ariaLabel: 'Join our subreddit',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon" aria-hidden="true">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
        </svg>
      )
    },
    {
      label: 'Bluesky',
      href: 'https://humanproven.bsky.social/',
      ariaLabel: 'Stay up to date on Bluesky',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon" aria-hidden="true">
          <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>
        </svg>
      )
    },
    {
      label: 'Patreon',
      href: 'https://www.patreon.com/c/HumanProven',
      ariaLabel: 'Help sponsor this project',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon" aria-hidden="true">
          <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003"/>
        </svg>
      )
    },
    {
      label: 'GitHub',
      href: 'https://github.com/HumanProven',
      ariaLabel: 'Submit issues or discussions on what you would like to see next',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon" aria-hidden="true">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      )
    },
  ];

  return (
    <div className="landing-page">
      <main className="landing-container" role="main">
        {/* Logo Section */}
        <div className="logo-section" role="banner">
          <div className="logo-container">
            <img
              src="/HumanProvenLogo.svg"
              alt="HumanProven"
              className="logo"
            />
          </div>
        </div>

        {/* Hero Section */}
        <section className="hero-section" aria-labelledby="hero-heading">
          <h1 id="hero-heading" className="hero-title">
            A bot free social media with NO data tracking
          </h1>
          <div className="hero-description-group" aria-describedby="hero-heading">
            <p className="hero-description">
              Restoring the internet and social media to it's pre-bot era built with secure, human-verified authentication.
            </p>
            <p className="hero-description">
              No tracking or selling of your personal data, no more rage-bait bot posts!
            </p>
          </div>
        </section>

        {/* Social Links Section */}
        <section className="social-section" aria-labelledby="social-heading">
          <h2 id="social-heading" className="social-title">
            Follow and Support Us
          </h2>
          <ul className="social-grid" role="list">
            {socialLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="social-link"
                  aria-label={link.ariaLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                  <span className="social-label">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Call to Action */}
        <section className="cta-section" aria-label="Call to action">
          <p className="cta-text">
            Be among the first to experience it. You can't get in without a referral.
          </p>
        </section>

        {/* Signup Section */}
        <section className="signup-section" aria-labelledby="signup-heading">
          <h2 id="signup-heading" className="signup-title">
            Request Beta Access
          </h2>
          <form onSubmit={handleSubmit} className="beta-form" noValidate>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                required
                aria-required="true"
                aria-describedby={status === 'error' ? 'form-error' : undefined}
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
                required
                aria-required="true"
                aria-describedby={status === 'error' ? 'form-error' : undefined}
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={status === 'loading'}
              aria-busy={status === 'loading'}
            >
              {status === 'loading' ? 'Submitting...' : 'Join the Waitlist'}
            </button>

            {message && (
              <div
                className={`form-message ${status}`}
                role={status === 'error' ? 'alert' : 'status'}
                id={status === 'error' ? 'form-error' : 'form-success'}
                aria-live="polite"
              >
                {message}
              </div>
            )}
          </form>
        </section>

        {/* Footer */}
        <footer className="footer" role="contentinfo">
          <p className="footer-text">
            &copy; {new Date().getFullYear()} HumanProven. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
