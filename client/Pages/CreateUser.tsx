import React,{useState,useContext,useEffect} from "react";
import {UserContext} from '../Contexts/Contexts'
function CreateUser() {
  const [name,setName] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword]= useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [allInputsFilled,setAllInputsFilled] = useState(false)
  const [usernameExists,setUsernameExists] = useState(false)
  const {createUser,setCreateUser,setUserLogin} = useContext(UserContext)

  useEffect(() => {
    setAllInputsFilled(name !== '' && username !== '' && password !== '' && confirmPassword === password);
  }, [name, username, password, confirmPassword]);
  
  const createuser= async () =>{
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
        setCreateUser?.(false)
        setUserLogin?.(true)
        setUsernameExists(false)
      }
      if(data === 'false'){
        setUsernameExists(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
    {createUser === true ?
    <div className='fixed inset-0 flex items-center justify-center z-10 backdrop-blur-sm ' >
      <div className='relative flex flex-col justify-center items-center w-1/3 h-2/5 rounded  bg-sky-500 ' >
        <button onClick={()=>{setCreateUser?.(false)}} className='absolute top-0 right-0 p-2 rounded-2xl border-none'>X</button>
        <div className='absolute top-0 text-3xl'>Welcome to Git Hired!</div>
        <div>Please fill out all fields</div>
        <input type='username' onChange={(e)=>{setName(e.target.value)}} className=' w-2/5 rounded m-2' placeholder='Name' required/>
        <input type='username' onChange={(e)=>{setUsername(e.target.value)}} className=' w-2/5 rounded m-2' placeholder='UserName' required/>
        <input type='password' onChange={(e)=>{setPassword(e.target.value)}} className=' w-2/5 rounded m-2' placeholder='Password' required/>
        <input type='password' onChange={(e)=>{setConfirmPassword(e.target.value)}} className=' w-2/5 rounded m-2' placeholder='Confirm Password' required/>
        {usernameExists === true ? <div className='text-red-600'>Username already exists please try again</div>:''}
        <button type='submit' onClick={createuser} disabled={!allInputsFilled}className='bg-blue-500 w-2/5 rounded' >Create User</button>
        <div>Already a user? Login <a className='hover:text-white font-medium' onClick={()=>{setUserLogin?.(true);setCreateUser?.(false)}}>here</a></div>
    </div>
    </div>
     : " "}
    </>
  )
}

export default CreateUser