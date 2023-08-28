import React  from "react";
import {useNavigate} from 'react-router-dom'

function NavBar() {
const navigate = useNavigate()

function JobBoard(){
  navigate('/jobboard')
}
function Login(){
  navigate('/login')
}
function Resources(){
  navigate('/resources')
}

return(
  <>
  <div onClick={Login}>Login</div>
  <div onClick={Resources}>Resourses</div>
  <div onClick={JobBoard}>JobBoard</div>
  </>
)

}

export default NavBar;