import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

function UserEditProfile() {
    const {id}=useParams()
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[phone,setNumber]=useState('')
    const[profile,setImage]=useState(null)
    useEffect(()=>{
        (async function(){
            let {data}= await axios.get("/edit-user/"+id)
            if(data.error){
                console.log(data.error)
            }else{
                setName(data.user.name)
                setEmail(data.user.email)
                setNumber(data.user.phone)
            }
        })()
    },[])
    const navigate = useNavigate()
    const dispatch=useDispatch()

    async function EditUser(e){
        e.preventDefault();
        let {data}=await axios.post("/editUserProfile",{id,name,email,phone,profile},{headers: {
            'Content-Type': 'multipart/form-data'}})
        if(data.error){
            alert(data.message)
        }
        else{
           navigate("/")
           dispatch({type:"refresh"})
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
                    <form action="#" className="signin-form">
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
                            <input type="file"   onChange={(e)=>setImage(e.target.files[0])} accept='image/*' name='profile'  className="form-control"  required />
                        </div>
                        <div className="form-group" style={{display:'flex',alignItems:'center'}}>
                            <button type="submit" onClick={EditUser} className="form-control btn btn-primary submit px-3">EDIT</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default UserEditProfile