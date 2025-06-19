import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { routes } from './router/routes';
import Navbar from './components/Navbar';

const App = () => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <>
      {/* Don't show navbar on NotFound or optional pages if needed */}
      {/* {location.pathname !== '*' && <Navbar />} */}

      <Routes>
        {routes.map(({ path, element }) => {
          if (path.startsWith('/dashboard')) {
            return (
              <Route
                key={path}
                path={path}
                element={token ? element : <Navigate to="/login" />}
              />
            );
          }
          return <Route key={path} path={path} element={element} />;
        })}
      </Routes>
    </>
  );
};

export default App;
