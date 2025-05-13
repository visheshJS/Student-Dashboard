import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AddStudent from "./components/AddStudent.jsx";
import StudentDetail from "./components/StudentDetail.jsx";
const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/add-student",

    element: (
      <PrivateRoute>
        <AddStudent />
      </PrivateRoute>
    ),
  },

  {
    path: "/students/:id",
    element: (
      <PrivateRoute>
        <StudentDetail />
      </PrivateRoute>
    ),
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
