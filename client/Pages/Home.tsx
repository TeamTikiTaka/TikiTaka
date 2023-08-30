import React,{useContext,useEffect,useState} from 'react'
import ParticlesBackground from "../Components/ParticlesBackground";
import { UserContext } from '../Contexts/Contexts';
function Home(){
  const {userId} = useContext(UserContext)
  const [FirstName,setFirstName]=useState('')
  
  useEffect(() => {
    const allCookies = document.cookie
      .split(';')
      .map((cookie:string) => cookie.trim());
      allCookies.forEach((cookie) => {
      if (cookie.startsWith('firstname=')){
        const firstname = cookie.split('=')[1]
        setFirstName(firstname)
      }
    })
  }),[]

  return(
    <div className="flex items-center justify-center h-screen">
      <ParticlesBackground></ParticlesBackground>
    <div className="w-3/5 bg-opacity-80 p-8 rounded-lg text-center mx-auto z-10">
      {userId === -1 ?
      <>
      <div className="text-7xl font-bold text-white">Welcome to Git Job</div>
      <div className="text-4xl text-white mt-4">Git Better, Git Hired</div>
      <div className="text-1xl text-white mt-4">
        "Elevate Your Interview Game with Git Job: Your Personal Interview Tracker 
        Keep tabs on your journey from 'Applied' to 'Hired' while mastering questions and acing that dream Engineering Interview!
         #InterviewSuccess #GitJob #TrackAndThrive"
      </div>
      </>
      :
      <>
      <div className="text-7xl font-bold text-white">  Welcome Back {FirstName}</div>
      <div className="text-4xl text-white mt-4">You're Gitting Better, You're Gitting Hired!</div>
      <div className="text-1xl text-white mt-4">
        Another Day Another Application 
        Lets Keep that Track Record up Buddy! Good Luck today, You're Gonna do Great!
         #InterviewSuccess #GitJob #TrackAndThrive
      </div>
      </>}
    </div>
  </div>
  
  )
}

export default Home