import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { MainPage } from './MainPage'
import { GoalsPage } from './GoalsPage'
import { Navbar } from './Navbar'

function App() {
  return (
    <BrowserRouter>
      <div className="app-content">
        <Routes>
          <Route path="/button" element={<MainPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/" element={<Navigate to="/button" replace />} />
        </Routes>
      </div>
      <Navbar />
    </BrowserRouter>
  )
}

export default App
