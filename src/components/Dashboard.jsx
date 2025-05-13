import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/mockApi";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCourse, setFilterCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5); // Students per page

  // Handle logout function
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".menu-container")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/api/students");
        setStudents(response.data.students);
        const uniqueCourses = [
          ...new Set(response.data.students.map((student) => student.course)),
        ];
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
    ? students.filter((student) => student.course === filterCourse)
    : students;

  // Get current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] py-8 px-4">
      <div className="container mx-auto bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-80 rounded-2xl shadow-2xl p-8 backdrop-blur-md border border-blue-200 dark:border-blue-800">
        <div className="flex flex-row justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-blue-800">
          <h1 className="text-md sm:text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-blue-200 truncate">
            Student Dashboard
          </h1>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden menu-container relative flex-shrink-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center px-3 py-2 border rounded border-gray-400 dark:border-blue-500 hover:text-blue-500 hover:border-blue-500 dark:hover:text-blue-300"
              aria-label="Toggle menu"
            >
              <svg
                className="h-5 w-5 text-gray-600 dark:text-blue-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-xl z-20 border border-gray-200 dark:border-blue-900">
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-blue-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>

                {currentUser ? (
                  <>
                    <Link
                      to="/add-student"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 text-gray-800 dark:text-blue-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Add New Student
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-left px-4 py-2 text-gray-800 dark:text-blue-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Login to Add Students
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex flex-row gap-3">
            <button
              onClick={toggleTheme}
              className="px-3 py-2 rounded-lg bg-black hover:bg-gray-800 text-white dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>

            {currentUser ? (
              <>
                <Link
                  to="/add-student"
                  className="bg-black hover:bg-gray-800 dark:bg-gradient-to-r dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-800 text-white py-2 px-5 rounded-lg shadow-md transition-colors text-center"
                >
                  Add New Student
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-800 text-white py-2 px-5 rounded-lg cursor-pointer shadow-md transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-800 text-white py-2 px-5 rounded-lg shadow-md transition-colors"
              >
                Login to Add Students
              </Link>
            )}
          </div>
        </div>

        {/* Rest of your Dashboard component remains unchanged */}
        <div className="mb-6">
          <label
            htmlFor="course-filter"
            className="block text-sm font-medium text-gray-700 dark:text-blue-100 mb-2"
          >
            Filter by Course:
          </label>
          <select
            id="course-filter"
            value={filterCourse}
            onChange={(e) => {
              setFilterCourse(e.target.value);
              setCurrentPage(1); // Reset to first page when filter changes
            }}
            className="w-full md:w-64 cursor-pointer rounded-lg border border-gray-300 dark:border-blue-700 shadow-sm px-4 py-2 bg-white dark:bg-[#1a2233] text-gray-800 dark:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 dark:border-blue-400"></div>
          </div>
        ) : error ? (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg"
            role="alert"
          >
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-[#181f2a] rounded-xl shadow overflow-hidden">
              {currentStudents.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-blue-200">
                  No students found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-blue-800">
                    <thead className="bg-gray-50 dark:bg-[#232c3b]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-blue-200 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-blue-200 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-blue-200 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-blue-200 uppercase tracking-wider">
                          Course
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-blue-200 uppercase tracking-wider">
                          GPA
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-blue-200 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-[#181f2a] divide-y divide-gray-200 dark:divide-blue-900">
                      {currentStudents.map((student) => (
                        <tr
                          key={student.id}
                          className="hover:bg-gray-50 dark:hover:bg-blue-900 transition"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-blue-300">
                            {student.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-blue-100">
                            {student.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-blue-300">
                            {student.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-blue-300">
                            {student.course}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-blue-300">
                            {student.gpa}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link
                              to={`/students/${student.id}`}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-white underline"
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
              {Array.from({
                length: Math.ceil(filteredStudents.length / studentsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 cursor-pointer py-2 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white dark:bg-blue-700"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-[#1a2233] dark:text-blue-300 dark:hover:bg-blue-800"
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
