import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/mockApi';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCourse, setFilterCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5); // Students per page

  // Handle logout function
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/api/students');
        setStudents(response.data.students);
        const uniqueCourses = [...new Set(response.data.students.map(student => student.course))];
        setCourses(uniqueCourses);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch students");
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Filter students by course
  const filteredStudents = filterCourse 
    ? students.filter(student => student.course === filterCourse)
    : students;

  // Get current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] py-8 px-4">
      <div className="container mx-auto bg-black bg-opacity-80 rounded-2xl shadow-2xl p-8 backdrop-blur-md border border-blue-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-blue-800">
          <h1 className="text-3xl font-extrabold text-blue-200 mb-4 md:mb-0">Student Dashboard</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            {currentUser ? (
              <>
                <Link
                  to="/add-student"
                  className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white py-2 px-5 rounded-lg shadow-md transition-colors text-center"
                >
                  Add New Student
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-5 rounded-lg shadow-md transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white py-2 px-5 rounded-lg shadow-md transition-colors"
              >
                Login to Add Students
              </Link>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="course-filter" className="block text-sm font-medium text-blue-100 mb-2">
            Filter by Course:
          </label>
          <select
            id="course-filter"
            value={filterCourse}
            onChange={(e) => {
              setFilterCourse(e.target.value);
              setCurrentPage(1); // Reset to first page when filter changes
            }}
            className="w-full md:w-64 rounded-lg border border-blue-700 shadow-sm px-4 py-2 bg-[#1a2233] text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Courses</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-400"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg" role="alert">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="bg-[#181f2a] rounded-xl shadow overflow-hidden">
              {currentStudents.length === 0 ? (
                <div className="p-6 text-center text-blue-200">No students found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-blue-800">
                    <thead className="bg-[#232c3b]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Course</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">GPA</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#181f2a] divide-y divide-blue-900">
                      {currentStudents.map(student => (
                        <tr key={student.id} className="hover:bg-blue-900 transition">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-300">{student.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-100">{student.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-300">{student.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-300">{student.course}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-300">{student.gpa}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link
                              to={`/students/${student.id}`}
                              className="text-blue-400 hover:text-white underline"
                            >
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.ceil(filteredStudents.length / studentsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? 'bg-blue-700 text-white'
                      : 'bg-[#1a2233] text-blue-300 hover:bg-blue-800'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
