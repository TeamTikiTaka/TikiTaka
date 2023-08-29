import React,{useState,useContext,useEffect} from "react";
import {UserContext} from '../Contexts/Contexts'
function CreateUser() {
  const [name,setName] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword]= useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [allInputsFilled,setAllInputsFilled] = useState(false)
  const [usernameExists,setUsernameExists] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const {createUser,setCreateUser,setUserLogin} = useContext(UserContext)

  useEffect(() => {
    setAllInputsFilled( username !== '' && password !== '' && confirmPassword === password);
  }, [name, username, password, confirmPassword]);
  
  const createuser= async () =>{
    try {
      const res = await fetch ('/api/login/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({username:username,password:password})
      })
      const data = await res.json()
      if(data === true){
        setCreateUser?.(false)
        setUserLogin?.(true)
        setUsernameExists(false)
      }
      if(data === false){
        setUsernameExists(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
  return (
    <>
    {createUser === true ?
   <div className='fixed inset-0 flex items-center justify-center z-10 backdrop-blur-sm text-white'>
   <div className="relative flex flex-col justify-center items-center w-1/3 h-3/6 rounded bg-blue-900 bg-opacity-70">
     <button onClick={() => { setCreateUser?.(false) }} className='absolute top-0 right-0 p-2 '>X</button>
     <div className='absolute top-0 text-3xl font-semibold'>Welcome to Git Hired!</div>
     <div className='mb-4'>Please fill out all fields</div>
     <div className="flex flex-col space-y-2 w-2/3">
       <input type='username' onChange={(e) => { setName(e.target.value) }} className='px-4 py-2 rounded-lg bg-gray-800 bg-opacity-70 placeholder-white focus:ring focus:ring-blue-300' placeholder='Name' />
       <input type='username' onChange={(e) => { setUsername(e.target.value) }} className='px-4 py-2 rounded-lg bg-gray-800 bg-opacity-70 placeholder-white focus:ring focus:ring-blue-300' placeholder='UserName' required />
       <input type={passwordVisible ? 'text' : 'password'} onChange={(e) => { setPassword(e.target.value) }} className='px-4 py-2 rounded-lg bg-gray-800 bg-opacity-70 placeholder-white focus:ring focus:ring-blue-300' placeholder='Password' required />
       <input type={passwordVisible ? 'text' : 'password'} onChange={(e) => { setConfirmPassword(e.target.value) }} className='px-4 py-2 rounded-lg bg-gray-800 bg-opacity-70  placeholder-white  focus:ring focus:ring-blue-300' placeholder='Confirm Password' required />
     </div>
     {usernameExists === true ? <div className='text-red-600 mt-2'>Username already exists. Please try again.</div> : ''}
     <button onClick={togglePasswordVisibility}>
        {passwordVisible ? 'Hide password' : 'Show password'}
      </button>
        <button type='submit' onClick={createuser} disabled={!allInputsFilled} className='w-2/3 py-2 mt-4 bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300'>
       Create User
     </button>
     <div className='mt-4'>
       Already a user? Login <a className='hover:text-white font-medium cursor-pointer' onClick={() => { setUserLogin?.(true); setCreateUser?.(false) }}>here</a>
     </div>
   </div>
 </div>
     : " "}
    </>
  )
}

export default CreateUser