import React, { useEffect } from 'react';
import { Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import MainLayout from '../components/layout/MainLayout';
import LoginPage from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import UserDetails from '../pages/UserDetails';
import Restaurants from '../pages/Restaurants';
import RestaurantDetails from '../pages/RestaurantDetails';
import RestaurantEmployees from '../pages/RestaurantEmployees';
import RestaurantMenu from '../pages/RestaurantMenu';
import BulkUploadMenu from '../pages/BulkUploadMenu';
import Lessons from '../pages/Lessons';
import LessonDetails from '../pages/LessonDetails';
import AssignLessons from '../pages/AssignLessons';
import AcceptInvite from '../pages/AcceptInvite';
import ForgotPassword from '../pages/ForgotPassword';
import LandingPage from '../pages/LandingPage';
import RestaurantManagement from '../pages/RestaurantManagement';
import StaffManagement from '../pages/StaffManagement';
import AddUser from '../pages/AddUser';
import BulkUploadUsers from '../pages/BulkUploadUsers';
import CSVTemplateGuide from '../pages/CSVTemplateGuide';
import MenuManagement from '../pages/MenuManagement';
import LessonProgress from '../pages/LessonProgress';
import ProfilePage from '../pages/Profile';
import EditProfilePage from '../pages/ProfileEdit';
import SecurityPage from '../pages/ProfileSecurity';
import authService from '../services/authService';
import ManageSubscription from '../pages/ManageSubscription';
import WineList from '../pages/WineList'
import MyLessons from '../pages/MyLessons'
import Progress from '../pages/TrainingProgressPage'
import FoodList from '../pages/FoodList';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.getCurrentUser()?.accessToken;
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = authService.getCurrentUser()?.accessToken;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export const routes = [
  {
    element: <AuthLayout />,
    children: [
      { 
        path: '/', 
        element: <PublicRoute><LandingPage /></PublicRoute> 
      },
      { 
        path: '/login', 
        element: <PublicRoute><LoginPage /></PublicRoute> 
      },
      { 
        path: '/signup', 
        element: <PublicRoute><Signup /></PublicRoute> 
      },
      { 
        path: '/accept-invite', 
        element: <PublicRoute><AcceptInvite /></PublicRoute> 
      },
      { 
        path: '/forgot-password', 
        element: <PublicRoute><ForgotPassword /></PublicRoute> 
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/users', element: <Users /> },
      { path: '/users/:id', element: <UserDetails /> },
      { path: '/restaurants', element: <Restaurants /> },
      { path: '/restaurants/:id', element: <RestaurantDetails /> },
      { path: '/restaurants/:id/employees', element: <RestaurantEmployees /> },
      { path: '/restaurants/:id/menu', element: <RestaurantMenu /> },
      { path: '/restaurants/:id/bulk-upload', element: <BulkUploadMenu /> },
      { path: '/lessons', element: <Lessons /> },
      { path: '/lessons/:id', element: <LessonDetails /> },
      { path: '/assign-lessons', element: <AssignLessons /> },
      { path: '/restaurant-management', element: <RestaurantManagement /> },
      { path: '/staff-management', element: <StaffManagement /> },
      { path: '/add-user', element: <AddUser /> },
      { path: '/bulk-upload-users', element: <BulkUploadUsers /> },
      { path: '/csv-template-guide', element: <CSVTemplateGuide /> },
      { path: '/menu-management', element: <MenuManagement /> },
      { path: '/lesson-progress', element: <LessonProgress /> },
      { path: '/profile-page', element: <ProfilePage /> },
      { path: '/edit-profile', element: <EditProfilePage /> },
      { path: '/profile-security', element: <SecurityPage /> },
      {path: '/my-lessons', element: <MyLessons/>},
      { path: '/wine-list', element: <WineList/>},
      { path: '/food-list', element: <FoodList/>},
      { path: '/progress', element:<Progress/>},
      { path: '/subscription', element: <ManageSubscription/>}

    ],
  },
]; 