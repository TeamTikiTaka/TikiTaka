import React,{useContext,useState}  from "react";

import {useNavigate} from 'react-router-dom'
import {UserContext} from '../Contexts/Contexts'

function NavBar() {
const navigate = useNavigate()
const {userId,setUserId,setUserLogin,userLogin,setCreateUser} = useContext(UserContext)
function JobBoard(){
  navigate('/jobboard')
}
function Login(){
  setUserLogin?.(true)
  console.log(userLogin)
  // navigate('/login')
}
function Logout(){
  setUserId?.(-1)
  navigate('/')
}
function Resources(){
  navigate('/resources')
}
function CreateUser(){
  setCreateUser?.(true)
}

return(
  <>
  <div className='flex flex-row border-solid border-2 border-sky-500'>
    {userId === -1 ?
    <>
    <div className= 'text-xl text-black hover:text-purple-500 hover:translate-x-1 px-2' onClick={Login}>Login</div>
    <div className= 'text-xl text-black hover:text-purple-500 hover:translate-x-1 px-2' onClick={CreateUser}>CreateUser</div>
    </>
     :
     <>
    <div className= 'text-xl text-black hover:text-purple-500 hover:translate-x-1 px-2' onClick={Logout}>Logout</div>
    <div className= 'text-xl text-black hover:text-purple-500 hover:translate-x-1 px-2' onClick={JobBoard}>JobBoard</div>
    </> }
  <div className= 'text-xl text-black hover:text-purple-500 hover:translate-x-1 px-2' onClick={Resources}>Resourses</div>
  </div>
  </>
)

}

export default NavBar;