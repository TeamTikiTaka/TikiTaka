import React, {useState, useEffect, type SetStateAction, type Dispatch} from "react";
import MainContainer from "./Container/MainContainer";
import NavBar from "./Container/NavBar";
import { UserContext } from './Contexts/Contexts';

const App = () => {
  const [globalFirstName,setGlobalFirstName]:[string,Dispatch<SetStateAction<string>>] = useState('')
  const [userId, setUserId]:[number,Dispatch<SetStateAction<number>>] = useState(-1);
  const [userLogin,setUserLogin] = useState(false)
  const [createUser,setCreateUser] = useState(false)

  useEffect(() => {
    const allCookies = document.cookie
      .split(';')
      .map((cookie) => cookie.trim());
    console.log(allCookies)
    allCookies.forEach((cookie) => {
      if (cookie.startsWith('username=')) {
        const username = cookie.split('=')[1];
        // setGlobalUsername(username);
      } 
        if (cookie.startsWith('firstname=')){
        const firstname = cookie.split('=')[1];
        setGlobalFirstName(firstname);
      }
        if (cookie.startsWith('user_id=')){
        const userid = cookie.split('=')[1]
        setUserId(Number(userid))
        console.log('User Id in App: ', userid)
      }
    });
  }, [document.cookie])
 
  return (
    <>
    <UserContext.Provider value = {{userId,setUserId,userLogin,setUserLogin,createUser,setCreateUser,globalFirstName,setGlobalFirstName}}>
    <NavBar/>
    <MainContainer/>
    </UserContext.Provider>
    </>
  )
}

export default App