import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/mockApi';

const StudentDetail = () => {
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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-xl shadow-lg" role="alert">
          <p>{error}</p>
        </div>
        <Link to="/" className="mt-6 text-blue-300 hover:text-white underline">
          &larr; Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-xl shadow-lg">
          <p>Student not found</p>
        </div>
        <Link to="/" className="mt-6 text-blue-300 hover:text-white underline">
          &larr; Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
      <div className="max-w-xl w-full bg-black bg-opacity-80 rounded-2xl shadow-2xl p-10 backdrop-blur-md border border-blue-800">
        <h2 className="text-3xl font-extrabold text-blue-200 mb-8 text-center tracking-wider">Student Information</h2>
        <div className="space-y-6">
          <div className="flex justify-between border-b border-blue-900 pb-4">
            <span className="text-blue-100 font-semibold">Full Name:</span>
            <span className="text-blue-300">{student.name}</span>
          </div>
          <div className="flex justify-between border-b border-blue-900 pb-4">
            <span className="text-blue-100 font-semibold">Email:</span>
            <span className="text-blue-300">{student.email}</span>
          </div>
          <div className="flex justify-between border-b border-blue-900 pb-4">
            <span className="text-blue-100 font-semibold">Course:</span>
            <span className="text-blue-300">{student.course}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 font-semibold">GPA:</span>
            <span className="text-blue-300">{student.gpa}</span>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 transition font-semibold shadow-lg"
          >
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
