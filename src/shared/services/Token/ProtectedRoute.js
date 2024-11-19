import {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getuserdetails, isLoggedIn } from './token';

const ProtectedRoute = ({children, allowedRoles }) => {
  // console.log(children)
  const navigate=useNavigate()
  const userRole = getuserdetails() ? getuserdetails().Role : false;
  // console.log(userRole)
  useEffect(() => {
    if (!isLoggedIn() || !allowedRoles?.includes(userRole)) {
      navigate('/login');
    }
  }, [isLoggedIn(), allowedRoles, userRole, navigate]);
  return children;
};

export default ProtectedRoute;