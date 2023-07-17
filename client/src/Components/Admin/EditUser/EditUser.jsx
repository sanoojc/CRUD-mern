import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditUser() {
    const {id}=useParams()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setNumber]=useState('')
    const [errMessage,setErr]=useState('')
    const navigate=useNavigate()
     useEffect(()=>{(

         async function(){
          const {data}= await axios.get('/admin/getEdit-user/'+id)
            setName(data.name)
            setEmail(data.email)
            setNumber(data.phone)
        }) ()
    },[])
    async function editUserData(e){
        e.preventDefault()
        const {data}=await axios.post('/admin/editUser',{id,name,email,phone})
        if(data.error){
            setErr(data.message)
        }
        else{
            return navigate('/admin')
        }
    }
    return (
        <section className="ftco-section">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center mb-5">
                    <h2 className="heading-section">Edit Profile </h2>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-wrap p-0">
                        <h3 className="mb-4 text-center"> </h3>
                        <form className="signin-form">
                            <div className="form-group">
                                <input type="text"value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Username" required />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" required />
                            </div>
                            <div className="form-group">
                                <input type="number" value={phone}  onChange={(e)=>setNumber(e.target.value)}  className="form-control" placeholder="phone no" required />
                            </div>
                            <div className="form-group">
                                <button  onClick={editUserData} className="form-control btn btn-primary submit px-3">EDIT</button>
                            </div>
                            <div className="">
                                {
                                    errMessage &&
                                    <p style={{color:'red'}} >{errMessage}</p>
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

export default EditUser