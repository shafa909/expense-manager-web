import './App.css';

import AuthPage from './pages/authPage/AuthPage';
import Dashboard from './pages/dashboard/Dashboard'
import TripPage from './pages/tripPage/TripPage';

import { UserContext } from './userContext/UserContext';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';

function App() {

  const [currentUser, setCurrentUser] = useState({ user_name: '', user_id: '' });

  return (
    <div className="App">
      <UserContext.Provider value={[currentUser, setCurrentUser]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trip/:tripid" element={<TripPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
