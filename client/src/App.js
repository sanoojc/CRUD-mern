
import './App.css';
import axios from 'axios'
import { useEffect} from 'react';
import {Navigate, Route,Routes} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home';
import AdminLogin from './Components/Admin/Login/Login'
import AdminHome from './Components/Admin/Home/AdminHome'
import UserEditProfile from './Components/UserEditProfile/UserEditProfile';
import CreateUser from './Components/Admin/CreateUser/CreateUser';
import EditUser from './Components/Admin/EditUser/EditUser';


function App() {
  axios.defaults.baseURL = "http://localhost:8000/";
  axios.defaults.withCredentials = true;
  
  const {user, admin, refresh} = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/check-auth");
      dispatch({ type: "user", payload: { login: data.loggedIn, details:data.user } })
      let { data:adminData } = await axios.get("/admin/check-auth");
      dispatch({ type: "admin", payload: { login: adminData.loggedIn } })
    })()
  },[refresh])

  return (
    <div className="App">
        {
          user.login===false &&
      <Routes>
          <Route path='/login' element={<Login></Login>}/>
          <Route path='/signup' element={<Signup></Signup>}/>
          <Route path='/' element={ <Navigate to={'/login'}/>}/>
          <Route path='/profile' element={<Navigate to={'/login'}/>}/>
          <Route path='/editProfile' element={<Navigate to={'/login'}/>}/>
      </Routes>
        }
        {
          user.login===true &&
          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={ <Navigate to={'/'}/>}/>
          <Route path='/signup' element={<Navigate to={'/'}/>}/>
        <Route path='/editProfile/:id' element={<UserEditProfile/>}/>
      </Routes>
        }
        {
          admin.login===false && 
      <Routes>
        <Route path='/admin/login' element={<AdminLogin></AdminLogin>}/>
        <Route path='/admin' element={<Navigate to={'/admin/login'}/>}/>
        <Route path='/admin/home' element={<Navigate to={'/admin/login'}/>}/>
        <Route path='/admin/createUser' element={<Navigate to={'/admin/login'}/>}/>
      </Routes>
        }
        {
          admin.login===true && 
      <Routes>
        <Route path='/admin/login' element={<AdminHome/>}/>
        <Route path='/admin' element={<Navigate to={'/admin/login'}/>}/>
        <Route path='/admin/home' element={<Navigate to={'/admin/login'}/>}/>
        <Route path='/admin/createUser' element={<CreateUser></CreateUser>}/>
        <Route path='/admin/editUser/:id' element={<EditUser></EditUser>}/>
      </Routes>
        }
    </div>
  );
}

export default App;
