import { useEffect } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { Analytics } from "@vercel/analytics/react"
import Home from "./pages/Home/Home"
import ArticlePage from "./pages/Article/Article"
import './App.css';
import './index.css';

// Ao trocar de rota: vai para a âncora (ex.: /#artigos) ou para o topo.
const ScrollManager = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) target.scrollIntoView()
    else window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname, hash])

  return null
}

const App = () => (
  <>
    <ScrollManager />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artigos/:slug" element={<ArticlePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <Analytics />
  </>
)

export default App
