
import './Home.css'
import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {
    const dispatch = useDispatch()
    async function handleLogout() {
        if (window.confirm("Are you sure logout ")) {
            await axios.get('/logout')
            dispatch({ type: "refresh" })
        }
    }
   
    const user= useSelector((state)=>state.user)
    const baseImgUrl="http://localhost:8000/uploads/"
    console.log(user.details.profile)
    return (
        <div className="userHomeContainer">
            <div className="userCard" style={{ background: "white" }}>
                
                <div className=""style={{display:'flex',justifyContent:"center" ,paddingBottom:'20px'}}>

                <h3>Profile</h3>
                </div>
                <div className="user-profile-img">
                <img src={baseImgUrl + user.details.profile} alt="avathar" className="rounded-circle" style={{width: "100px",height:'100px' ,color:"black"}} />
              
                {/* <button className='editUser-btn' onClick={()=>setOpen(true)} >Change</button> */}
                </div>
                <div className="mt-3">
                    <div className="profile-row">
                        <div className="row-element">
                            <h5 className="text-dark">Name </h5>
                        </div>
                        <div className="row-element">
                            <h6 className="text-dark">{user.details.name} </h6>
                        </div>
                    </div>
                    <div className="profile-row">
                        <div className="row-element">
                            <h5 className="text-dark">Email </h5>
                        </div>
                        <div  className="row-element">
                            <h6 className="text-dark">{user.details.email} </h6>
                        </div>
                    </div>
                    <div className="profile-row">
                        <div className="row-element">
                            <h5 className="text-dark">Ph </h5>
                        </div>
                        <div className="row-element">
                            <h6 className="text-dark">{user.details.phone} </h6>
                        </div>
                    </div>
                    <div className="user-profile-btns">
                    <div className="btn-section">
                        <Link to={"/editProfile/"+user.details._id}>
                    <button className="editUser-btn">Edit profile</button>
                        </Link>
                    </div>
                    <div className="btn-section">
                    <button onClick={handleLogout} className="user-logout">logout</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home