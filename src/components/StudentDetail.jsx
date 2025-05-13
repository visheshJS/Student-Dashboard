import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/mockApi';
import { useTheme } from '../context/ThemeContext';

const StudentDetail = () => {
  const { theme, toggleTheme } = useTheme();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`/api/students/${id}`);
        setStudent(response.data.student);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch student');
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364]">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-xl shadow-lg" role="alert">
          <p>{error}</p>
        </div>
        <Link to="/" className="mt-6 text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-white underline">
          &larr; Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364]">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-xl shadow-lg">
          <p>Student not found</p>
        </div>
        <Link to="/" className="mt-6 text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-white underline">
          &larr; Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] px-4">
      <div className="max-w-xl w-full bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-80 rounded-2xl shadow-2xl p-10 backdrop-blur-md border border-blue-200 dark:border-blue-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-blue-200 tracking-wider">Student Profile</h2>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-blue-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        
        <img 
          src={student.avatar} 
          alt={student.name} 
          className="w-32 h-32 hover:scale-105 transition duration-300 ease-in-out transform rounded-full mx-auto shadow-lg border-4 border-gray-200 dark:border-blue-700 mb-6" 
        />

        <div className="space-y-6">
          <div className="flex justify-between border-b border-gray-200 dark:border-blue-900 pb-4">
            <span className="text-gray-700 dark:text-blue-100 font-semibold">Full Name:</span>
            <span className="text-gray-900 dark:text-blue-300">{student.name}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 dark:border-blue-900 pb-4">
            <span className="text-gray-700 dark:text-blue-100 font-semibold">Email:</span>
            <span className="text-gray-900 dark:text-blue-300">{student.email}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 dark:border-blue-900 pb-4">
            <span className="text-gray-700 dark:text-blue-100 font-semibold">Course:</span>
            <span className="text-gray-900 dark:text-blue-300">{student.course}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 dark:text-blue-100 font-semibold">GPA:</span>
            <span className="text-gray-900 dark:text-blue-300">{student.gpa}</span>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-blue-700 dark:to-blue-500 dark:hover:from-blue-800 dark:hover:to-blue-600 transition font-semibold shadow-lg"
          >
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
