import React, { useState } from 'react'
import '../styles/Login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = (event) => {
    event.preventDefault()

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate('/')
      })
      .catch((error) => alert(error.message))
  }

  const register = (event) => {
    event.preventDefault()
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          navigate('/')
        }
      })
      .catch((error) => alert(error.message))
  }

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="logo"
        />
      </Link>

      <div className="login-container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={signIn} className="login-signInButton">
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the Yard Conditions of Use {' &'}
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={register} className="login-registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  )
}

export default Login
