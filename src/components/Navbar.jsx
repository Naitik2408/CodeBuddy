import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="w-full bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        CodeBuddy
      </h1>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">👋 {user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-sm"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 text-sm"
          >
            Register
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
