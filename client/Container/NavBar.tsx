import React, { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/Contexts';

function NavBar() {
  const navigate = useNavigate();
  const { userId, setUserId, setUserLogin, userLogin, setCreateUser } =
    useContext(UserContext);

  function deleteCookie(cookieName: string) {
    document.cookie = `${cookieName}=; max-age=0; path=/;`;
  }

  function Login() {
    setUserLogin?.(true);
    console.log(userLogin);
  }
  function Logout() {
    setUserId?.(-1);
    deleteCookie('username');
    deleteCookie('firstname');
    deleteCookie('user_id');
    navigate('/');
  }
  function CreateUser() {
    setCreateUser?.(true);
  }

  return (
    <div className="sticky top-0 flex flex-row text-xl text-white backdrop-blur-sm p-5 z-10">
      <div
        className="hover:bg-gray-100 hover:text-slate-950 px-3 py-1 mx-2 rounded-full"
        onClick={() => navigate('/')}
      >
        Home
      </div>
      {userId !== -1 && (
        <>
          <div
            className="hover:bg-gray-100 hover:text-slate-950 px-3 py-1 mx-2 rounded-full"
            onClick={() => navigate('/jobboard')}
          >
            Job Apps
          </div>
          <div
            className="hover:bg-gray-100 hover:text-slate-950 px-3 py-1 mx-2 rounded-full"
            onClick={() => alert('nothing here yet!')}
          >
            Interviews
          </div>
          <div
            className="hover:bg-gray-100 hover:text-slate-950 px-3 py-1 mx-2 rounded-full"
            onClick={() => navigate('/resources')}
          >
            Resources
          </div>
        </>
      )}

      {userId === -1 ? (
        <div
          className="hover:bg-gray-100 hover:text-slate-950 px-3 py-1 ml-auto rounded-full"
          onClick={Login}
        >
          Login
        </div>
      ) : (
        <div
          className="hover:bg-gray-100 hover:text-slate-950 px-3 py-1 ml-auto rounded-full"
          onClick={Logout}
        >
          Logout
        </div>
      )}

      {/* {userId === -1 ? (
        <>
          <div
            className=" hover:text-purple-500 hover:translate-x-1 px-2"
            onClick={CreateUser}
          >
            CreateUser
          </div>
        </>
      ) : (
        <>

        </>
      )} */}
    </div>
  );
}

export default NavBar;
