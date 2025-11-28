import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/home" element={<Navigate to="/" replace />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<SignUp />}></Route>
    </Routes>
  )
}

export default App
