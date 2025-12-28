import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import {ForgotPassword} from './pages/ForgotPassword'
import Roteirizacao from './pages/Roteirizacao'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/roteirizacao" element={<Roteirizacao />} />
    </Routes>
  )
}
