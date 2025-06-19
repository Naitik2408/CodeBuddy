import { Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import CreateGroup from '../pages/CreateGroup';
import GroupPage from '../pages/GroupPage';
import AddQuestion from '../pages/AddQuestion';
import NotFound from '../pages/NotFound';

export const routes = [
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/dashboard/create-group', element: <CreateGroup /> },
  { path: '/group/:groupId', element: <GroupPage /> },
  { path: '/group/:groupId/add-question', element: <AddQuestion /> }, // Add this
  { path: '*', element: <NotFound /> },
];