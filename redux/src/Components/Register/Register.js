import { useNavigate } from 'react-router-dom';
import { initTWE, Input, Ripple } from 'tw-elements';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Store/AuthContext';
import { GoogleLogin } from '@react-oauth/google'; // Import Google Login library
import './Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const { setIsAuthenticated } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    initTWE({ Input, Ripple });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful!');
        setIsAuthenticated(true);
        navigate('/', { state: { success: 'Registration successful!' } });
      } else {
        setError(data.error.message || 'An error occurred.');
      }
    } catch (error) {
      setError('Failed to connect to the server.');
    }
  };

  // Handle Google login
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      const response = await fetch('http://localhost:1337/api/connect/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: credential }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        navigate('/', { state: { success: 'Login with Google successful!' } });
      } else {
        setError(data.error.message || 'Google login failed.');
      }
    } catch (error) {
      setError('Failed to connect to the server.');
    }
  };

  return (
    <section className="h-auto">
      <div className="container h-full px-6 py-24">
        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>
          <div className="w-full md:w-8/12 lg:ms-6 lg:w-5/12">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="relative mb-6 w-full">
                <input
                  type="text"
                  className="py-6 w-full peer block min-h-[auto] rounded border-0 bg-transparent px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary"
                  id="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
                <label
                  htmlFor="username"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                >
                  Username
                </label>
              </div>
              <div className="relative mb-6 w-full">
                <input
                  type="email"
                  className="py-6 w-full peer block min-h-[auto] rounded border-0 bg-transparent px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                >
                  Email address
                </label>
              </div>
              <div className="relative mb-6 w-full">
                <input
                  type="password"
                  className="py-6 w-full peer block min-h-[auto] rounded border-0 bg-transparent px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                >
                  Password
                </label>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <button
                type="submit"
                className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 focus:bg-primary-accent-300"
              >
                Register
              </button>
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold">OR</p>
              </div>

              {/* Google Login button */}
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
                
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
