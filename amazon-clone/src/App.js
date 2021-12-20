import './styles/main.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Login from './components/Login'
import { auth } from './firebase'
// import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useStateValue } from './components/StateProvider'
import Checkout from './components/Checkout'

function App() {
  const [{}, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      const user = auth.currentUser
      if (user) {
        console.log(`User: ${user.email}`)
      }

      if (authUser) {
        // user logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
          // sends into data layer
        })
      } else {
        // user logged out
        dispatch({
          type: 'SET_USER',
          user: null,
          // erases from data layer
        })
      }
    })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
