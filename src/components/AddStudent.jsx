import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/mockApi';
import { useTheme } from '../context/ThemeContext';

const AddStudent = () => {
  const { theme, toggleTheme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [gpa, setGpa] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateGpa = (gpa) => {
    const num = parseFloat(gpa);
    return !isNaN(num) && num >= 0 && num <= 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !course || !gpa) {
      setError('All fields are required');
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }
    if (!validateGpa(gpa)) {
      setError('GPA must be a number between 0 and 10');
      setLoading(false);
      return;
    }

    try {
      await api.post('/api/students', { name, email, course, gpa });
      navigate('/');
    } catch (err) {
      setError('Failed to add student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] py-12 px-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-80 rounded-2xl shadow-2xl p-10 backdrop-blur-md border border-blue-200 dark:border-blue-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-blue-200 tracking-wider">Add Student</h2>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-blue-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg" role="alert">
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-blue-300 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-[#1a2233] border border-gray-300 dark:border-blue-700 rounded-lg text-gray-800 dark:text-blue-200 placeholder-gray-500 dark:placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-blue-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-[#1a2233] border border-gray-300 dark:border-blue-700 rounded-lg text-gray-800 dark:text-blue-200 placeholder-gray-500 dark:placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
              required
            />
          </div>
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 dark:text-blue-300 mb-1">
              Course
            </label>
            <input
              id="course"
              type="text"
              value={course}
              onChange={e => setCourse(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-[#1a2233] border border-gray-300 dark:border-blue-700 rounded-lg text-gray-800 dark:text-blue-200 placeholder-gray-500 dark:placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course name"
              required
            />
          </div>
          <div>
            <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 dark:text-blue-300 mb-1">
              GPA
            </label>
            <input
              id="gpa"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={gpa}
              onChange={e => setGpa(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-[#1a2233] border border-gray-300 dark:border-blue-700 rounded-lg text-gray-800 dark:text-blue-200 placeholder-gray-500 dark:placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter GPA (0-10)"
              required
            />
          </div>
          <div className="flex justify-end space-x-3 mt-8">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-5 py-2 border border-gray-300 dark:border-blue-700 rounded-lg text-gray-700 dark:text-blue-300 bg-white dark:bg-transparent cursor-pointer hover:bg-gray-100 dark:hover:bg-blue-800 dark:hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg cursor-pointer text-white bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-blue-700 dark:to-blue-500 dark:hover:from-blue-800 dark:hover:to-blue-600 transition font-semibold shadow-lg"
            >
              {loading ? 'Adding...' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
