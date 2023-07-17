import '../../Login/Login.css'
import { useState, } from 'react'
import axios from 'axios'

import React from 'react'
import { useDispatch } from 'react-redux'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const dispatch = useDispatch()
    async function handleAdminLogin() {
        let {data} = await axios.post("/admin/login", { email, password })
        if (data.error) {
            setErrMessage(data.message)
        }
        else{
           dispatch({ type: "refresh" })
           
        }
    
    }

    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                        <h2 className="heading-section">Admin Login </h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="login-wrap p-0">
                            <form className="signin-form">
                                <div className="form-group">
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="email" required />
                                </div>
                                <div className="form-group">
                                    <input id="password-field" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password" required />
                                    <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                </div>
                                <div className="form-group">
                                    <button  onClick={handleAdminLogin} className="form-control btn btn-primary submit px-3">Login</button>
                                </div>
                                <div style={{ color: "red", display: "flex", justifyContent: "center" }}>
                                    {
                                        errMessage &&
                                        <p>{errMessage}</p>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login