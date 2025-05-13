import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setPasswordError('');
    if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await signup(email, password);
      navigate('/');
    } catch (error) {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <div className="max-w-md w-full bg-black bg-opacity-80 rounded-2xl shadow-2xl p-10 backdrop-blur-md border border-blue-800">
        <h2 className="text-3xl font-extrabold text-blue-200 mb-8 text-center tracking-wider">Signup to a new account</h2>
        {(error || passwordError) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error} {passwordError}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-2 bg-[#1a2233] border border-blue-700 rounded-lg text-blue-200 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-4 py-2 bg-[#1a2233] border border-blue-700 rounded-lg text-blue-200 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 transition font-semibold shadow-lg"
          >
            {loading ? 'Creating an account...' : 'Sign Up'}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-blue-200">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-400 hover:text-white">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
