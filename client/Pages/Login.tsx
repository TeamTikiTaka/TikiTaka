import React,{useState,useContext} from "react";
import {UserContext} from '../Contexts/Contexts'
function Login() {
  const [username,setUsername] = useState('')
  const [password,setPassword]= useState('')
  const {setUserId,userLogin,setUserLogin} = useContext(UserContext)
  const login= async () =>{
    try {
      const res = await fetch ('/api/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({username,password})
      })
      const data = await res.json()
      if(data === 'true'){
        setUserId?.(data.UserId)
      }
      if(data === 'false'){
        return "wrong username or password"
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    {userLogin === true ?
    <div className='flex flex-col justify-center w-100 border-solid border-2 border-sky-500' >
    <button onClick={()=>{setUserLogin?.(false)}}>X</button>
    <input type='username' onChange={(e)=>{setUsername(e.target.value)}} className='bg-blue-500' placeholder='UserName Here'/>
    <input type='password' onChange={(e)=>{setPassword(e.target.value)}} className='bg-blue-500' placeholder='Password Here'/>
    <button type='submit' onClick={login} className='bg-blue-500 border-r-4'>Login</button>
    HELLO
    </div>
     : " "}
    </>
  )
}

export default Login