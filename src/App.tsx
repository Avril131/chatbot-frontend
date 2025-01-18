import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from '@/pages/Login'
import PublicLayout from '@/components/PublicLayout'
import Chat from '@/pages/Chat'
import "./App.css"
import NewChat from './pages/NewChat'

function App() {

  return (
    <Router>
      <Routes>

        {/* login page, without any layout */}
        <Route path="login" element={<Login />} />

        {/* other pages, use public layout */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<NewChat />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
