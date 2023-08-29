import React,{useState,useContext} from "react";
import {UserContext} from '../Contexts/Contexts'
function Login() {
  const [username,setUsername] = useState('')
  const [password,setPassword]= useState('')
  const [loginFailed, setLoginFailed] = useState(false)
  const {setUserId,userLogin,setUserLogin,setCreateUser} = useContext(UserContext)
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
      if(data === true){
        setUserId?.(1)
        setUserLogin?.(false)
        setLoginFailed(false)
      }
      if(data === false){
        setLoginFailed(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    {userLogin === true ?
    <div className='fixed inset-0 flex items-center justify-center z-10 backdrop-blur-sm ' >
      <div className='relative flex flex-col justify-center items-center w-1/3 h-2/5 rounded  bg-sky-500 ' >
        <button onClick={()=>{setUserLogin?.(false)}} className='absolute top-0 right-0 p-2 rounded-2xl border-none'>X</button>
        <div className='absolute top-0 text-3xl'>Welcome back to Git Hired!</div>
        <input type='username' onChange={(e)=>{setUsername(e.target.value)}} className=' w-2/5 rounded m-2' placeholder='UserName Here'/>
        <input type='password' onChange={(e)=>{setPassword(e.target.value)}} className=' w-2/5 rounded m-2' placeholder='Password Here'/>
        {loginFailed === true ? <div className='text-red-600'> Username or password does not exists</div>:''}
        <button type='submit' onClick={login} className='bg-blue-500 w-2/5 rounded' >Login</button>
        <div>Not a User? Sign up <a className='hover:text-white font-me' onClick={()=>{setCreateUser?.(true);setUserLogin?.(false)}}>here</a></div>
    </div>
    </div>
     : " "}
    </>
  )
}

export default Login