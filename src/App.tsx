import { BrowserRouter } from 'react-router-dom'
import './App.css'
import NavBar from './components/global/NavBar'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
