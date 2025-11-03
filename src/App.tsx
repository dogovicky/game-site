import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/global/NavBar'
import SideNav from './components/global/SideNav'
import Index from './pages/Index'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <NavBar />
          {/* <SideNav /> */}
          <Routes>
            <Route path='/' element={<Index />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
