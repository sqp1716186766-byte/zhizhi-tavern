import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import GlobalAtmosphere from './GlobalAtmosphere.jsx'
import Navbar from './Navbar.jsx'

function AppLayout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })

    const sectionTitle = location.pathname === '/'
      ? '酒馆大厅'
      : location.pathname.startsWith('/cocktails/')
        ? '鸡尾酒详情'
        : {
            '/cocktails': '鸡尾酒图鉴',
            '/ai': 'AI 调酒实验室',
            '/bar': '我的酒馆',
          }[location.pathname] || '酒馆大厅'

    document.title = `${sectionTitle} · 吱吱酒馆`
  }, [location.pathname])

  return (
    <div className="app-shell min-h-screen bg-[#160d0d] text-[#fff7df]">
      <GlobalAtmosphere />
      <Navbar />
      <span key={`loader-${location.pathname}`} className="route-loader" aria-hidden="true" />
      <main id="main-content">
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AppLayout
