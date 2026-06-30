import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import BrainstormBoard from './pages/BrainstormBoard'
import FeatureLandscape from './pages/FeatureLandscape'
import EarningsIntelligence from './pages/EarningsIntelligence'
import UntappedKnowledge from './pages/UntappedKnowledge'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<BrainstormBoard />} />
        <Route path="/feature-landscape" element={<FeatureLandscape />} />
        <Route path="/earnings-intelligence" element={<EarningsIntelligence />} />
        <Route path="/untapped-knowledge" element={<UntappedKnowledge />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Nav />
      <AnimatedRoutes />
    </HashRouter>
  )
}
