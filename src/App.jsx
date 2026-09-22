import { Navigate, Route, Routes } from 'react-router-dom'

import AppLayout from './components/AppLayout.jsx'
import AILab from './pages/AILab.jsx'
import CocktailDetail from './pages/CocktailDetail.jsx'
import Cocktails from './pages/Cocktails.jsx'
import HomePage from './pages/HomePage.jsx'
import MyBar from './pages/MyBar.jsx'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="cocktails" element={<Cocktails />} />
        <Route path="cocktails/:id" element={<CocktailDetail />} />
        <Route path="ai" element={<AILab />} />
        <Route path="bar" element={<MyBar />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  )
}

export default App
