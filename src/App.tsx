import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/create-post/create-post';
import { Fact } from './pages/generate-fact';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
      },
    },
  });

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Router>
          <AppContent />
        </Router>
      </QueryClientProvider>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/signup') {
      console.log('Hello');
    }
  }, [location.pathname]);

  const renderNavbar = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <>
      {renderNavbar && <Navbar />}
      <Routes>
        <Route path="/home" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createfact" element={<Fact />} />
      </Routes>
    </>
  );
}

export default App;
