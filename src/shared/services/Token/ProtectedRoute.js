import {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getuserdetails, isLoggedIn } from './token';

const ProtectedRoute = ({children, allowedRoles }) => {
  const navigate=useNavigate()
  const userRole = getuserdetails() ? getuserdetails().Role : false;
  useEffect(() => {
    if (!isLoggedIn() || !allowedRoles?.includes(userRole)) {
      navigate('/login');
    }
  }, [isLoggedIn(), allowedRoles, userRole, navigate]);
  return children;
};

export default ProtectedRoute;