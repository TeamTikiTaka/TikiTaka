import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

const Resources = () => {
  const [addResource,setAddResource]= useState('')
  const [addResourceName, setAddResourceName] = useState('')
  const [resources, setResources] = useState([]);
  
const addNewResource = async() =>{
try {
  const res = await fetch('/addnewresource',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ link: addResource, name:addResourceName}),
  })
} catch (error) {
  console.log(error)
}
}

const fetchResources = async () => {
  try {
    const res = await fetch('/getresources'); // Replace with your backend endpoint
    const data = await res.json();
    setResources(data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchResources();
}, []);

  return (
    <div className='flex flex-col items-center justify-center '>
       <div className='flex flex-row items-center space-x-2'>
          <input
            type='text'
            placeholder='Enter the link'
            onChange={(e)=>{setAddResource(e.target.value)}}
            className='border rounded p-1'
          />
           <input
          type='text'
          placeholder='Enter the name'
          onChange={(e) => {setAddResourceName(e.target.value);}}
          className='border rounded p-1'
        />
       <button onClick={addNewResource} className='bg-blue-500 text-white px-3 py-1 rounded'>
            Add
          </button></div>
    <div className='text-5xl text-white underline'>
      Main Resources
    </div>
    <div className='text-white flex flex-row items-center text-3xl space-x-10'>
      <Link className='flex flex-row' target="_blank" rel="noopener noreferrer" to={'https://leetcode.com'}>
        <img alt="Leetcode" />
        Leetcode
      </Link>
      <Link className='flex flex-row ' target="_blank" rel="noopener noreferrer" to={'https://drive.google.com/drive/u/0/my-drive'}>
        <img className="w-10 h-10 p-0.5 mx-5" src='/assets/googledrive.png' alt="Google Drive" />
        Google Drive
      </Link>
      <Link className='flex flex-row ' target="_blank" rel="noopener noreferrer" to={'https://github.com'}>
        <img alt="Github" />
        Github
      </Link>
      <Link className='flex flex-row' target="_blank" rel="noopener noreferrer" to={'https://LinkedIn.com'}>
        <img alt="LinkedIn" />
        LinkedIn
      </Link>
    </div>
    <div className='text-5xl text-white underline'>
      Other Resources
    </div>
    <div className='text-white flex flex-row items-center text-3xl space-x-10'>
    <div>
        {/* {resources.map((resource, index) => (
          <div key={index}>
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              {resource.name}
            </a>
          </div>
        ))} */}
      </div>
    </div>
  </div>
  )
}
// example Data
// [
//   {
//     "link": "https://example.com",
//     "name": "Example Link"
//   },
//   {
//     "link": "https://example.com",
//     "name": "Example Link"
//   },
//   // ... other resources
// ]

export default Resources