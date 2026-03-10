import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './layouts/Layout'

const Home = lazy(() => import('./pages/Home'))
const LoginSignup = lazy(() => import('./pages/LoginSignup'))
const JobListings = lazy(() => import('./pages/JobListings'))
const JobDetail = lazy(() => import('./pages/JobDetail'))
const Profile = lazy(() => import('./pages/Profile'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading…</div>}>
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<JobListings />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
