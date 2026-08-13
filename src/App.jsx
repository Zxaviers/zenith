// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StarsBackground from './components/StarsBackground'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './Sections/Navbar'
import Footer from './Sections/Footer'
import Home from './views/Home'
import ProjectDetail from './views/ProjectDetail'
import DevlogList from './views/DevlogList'
import DevlogPost from './views/DevlogPost'
import NotFound from './views/NotFound'

import logo from './assets/black.png'

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative flex flex-col min-h-screen text-white scroll-smooth">
        <Preloader />
        <StarsBackground />
        <ScrollProgress />
        <Navbar logo={logo} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/devlog" element={<DevlogList />} />
          <Route path="/devlog/:slug" element={<DevlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}
