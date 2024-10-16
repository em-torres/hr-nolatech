import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import EvaluationForm from './components/EvaluationForm';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                  } />
                  <Route path="/evaluation" element={
                      <PrivateRoute>
                          <EvaluationForm />
                      </PrivateRoute>
                  } />
                  <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
          </Router>
      </AuthProvider>
  );
}

export default App;
