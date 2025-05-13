import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/mockApi';

const AddStudent = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] py-12 px-4">
      <div className="max-w-lg w-full bg-black bg-opacity-80 rounded-2xl shadow-2xl p-10 backdrop-blur-md border border-blue-800">
        <h2 className="text-3xl font-extrabold text-blue-200 mb-8 text-center tracking-wider">Add New Student</h2>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg" role="alert">
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a2233] border border-blue-700 rounded-lg text-blue-200 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name"
              required
            />
          </div>
          <div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a2233] border border-blue-700 rounded-lg text-blue-200 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input
              id="course"
              type="text"
              value={course}
              onChange={e => setCourse(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a2233] border border-blue-700 rounded-lg text-blue-200 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Course"
              required
            />
          </div>
          <div>
            <input
              id="gpa"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={gpa}
              onChange={e => setGpa(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a2233] border border-blue-700 rounded-lg text-blue-200 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="GPA"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-5 py-2 border border-blue-700 rounded-lg text-blue-300 bg-transparent hover:bg-blue-800 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 transition font-semibold shadow-lg"
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
