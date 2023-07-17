import React from 'react'
import '../../Login/Login.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

function CreateUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setconfPassword] = useState('')
    const [errMessage, setError] = useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()
        let {data} = await axios.post("/admin/createUser", { name, email, phone, password, confPassword })
        console.log(data)
        if (data.error) {
            setError(data.message)
        }
        else{
            return navigate('/admin')

        }
    }
    useEffect(() => {
        if (password !== confPassword) {
            setError('password must be same')
        }
        else {
            setError('')
        }
    }, [password, confPassword])
    return (
        <div className=''>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">create user </h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <div className="login-wrap p-0">
                                <h3 className="mb-4 text-center"> </h3>
                                <form action="#" className="signin-form">
                                    <div className="form-group">
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Username" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="email" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="phone no" required />
                                    </div>
                                    <div className="form-group">
                                        <input id="password-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" required />
                                        <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                    </div>
                                    <div className="form-group">
                                        <input id="password-field" type="password" value={confPassword} onChange={(e) => setconfPassword(e.target.value)} className="form-control" placeholder="confirm Password" required />
                                        <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" onClick={handleSubmit} className="form-control btn btn-primary submit px-3">Create</button>
                                    </div>
                                    <div style={{ color: "red", display: "flex", justifyContent: "center" }}>
                                        {
                                            errMessage &&
                                            <p>{errMessage}</p>
                                        }
                                    </div>
                                    <div className="form-group d-md-flex">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CreateUser