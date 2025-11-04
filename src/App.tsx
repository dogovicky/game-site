import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Index from './pages/Index'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Index />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
