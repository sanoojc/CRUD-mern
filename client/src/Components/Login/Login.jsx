import React from 'react'
import '../Login/Login.css'
import { useState } from 'react'
import { func } from 'prop-types'
import axios from 'axios'
import { Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'

function Login() {
  const dispatch=useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMessage,setMessage]=useState('')
  async function submit(e) {
    e.preventDefault()
    let { data } = await axios.post('/login', { email, password })
    console.log(data);
    if(!data.error){
    dispatch({type:"refresh"})
    setMessage('')
    }else{
      setMessage(data.message)
    }
  }

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="heading-section">Login </h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-wrap p-0">
              <h3 className="mb-4 text-center">Have an account?</h3>
              <form action="#" className="signin-form">
                <div className="form-group">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="email" required />
                </div>
                <div className="form-group">
                  <input id="password-field" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password" required />
                  <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                </div>
                <div className="form-group">
                  <button type="submit" onClick={submit} className="form-control btn btn-primary submit px-3">Sign In</button>
                </div>
                <div  style={{color:"red",display:"flex", justifyContent:"center"}}>
                  {
                    errMessage &&
                    <p>{errMessage}</p>
                  }
                  {/* <div className="w-50">
                    <label className="checkbox-wrap checkbox-primary">
                      Remember Me
                      <input type="checkbox" checked />
                      <span className="checkmark"></span>
                    </label>
                  </div> */}
                  {/* <div className="w-50 text-md-right">
                    <a href="#" style={{ color: '#fff' }}>Forgot Password</a>
                  </div> */}
                </div>
              </form>
              <Link to={'/signup'}>
                <p className="w-100 text-center">&mdash; Or Sign Up  &mdash;</p>
              </Link>
              {/* <div className="social d-flex text-center">
                <a href="#" className="px-2 py-2 mr-md-1 rounded"><span className="ion-logo-facebook mr-2"></span> Facebook</a>
                <a href="#" className="px-2 py-2 ml-md-1 rounded"><span className="ion-logo-twitter mr-2"></span> Twitter</a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login