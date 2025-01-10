import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Chat from '../pages/Chat'

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/c/:id" element={<Chat />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes
