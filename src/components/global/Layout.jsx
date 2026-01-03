import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="d-flex flex-grow-1">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <main
          className="flex-grow-1 p-4"
          style={{
            marginLeft: '250px',
            transition: 'margin-left 0.3s ease'
          }}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout

