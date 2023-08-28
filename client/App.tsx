import React, {useState} from "react";
import MainContainer from "./Container/MainContainer";
import NavBar from "./Container/NavBar";
import { UserContext } from './Contexts/Contexts';

const App = () => {
  
  const [userId, setUserId] = useState(-1);
  const [userLogin,setUserLogin] = useState(false)
  
  return (
    <>
    <UserContext.Provider value = {{userId,setUserId,userLogin,setUserLogin}}>
    <NavBar/>
    <MainContainer/>
    </UserContext.Provider>
    </>
  )
}

export default App