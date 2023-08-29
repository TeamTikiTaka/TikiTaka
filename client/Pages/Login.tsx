import React, { useState, useContext } from 'react';
import { UserContext } from '../Contexts/Contexts';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setUserId, userLogin, setUserLogin, setCreateUser } =
    useContext(UserContext);
  const login = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json()
      const allCookies = document.cookie
        .split(';')
        .map((cookie) => cookie.trim())
      let Username
      let firstname
      allCookies.forEach((cookie) => {
        if (cookie.startsWith('username=')) {
          Username = cookie.split('=')[1]
        } else if (cookie.startsWith('firstname=')) {
          firstname = cookie.split('=')[1]
        }
      });
      console.log(Username, firstname);
      if (data === true) {
        setUserLogin?.(false);
        setLoginFailed(false);
      }
      if (data === false) {
        setLoginFailed(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {userLogin === true ? (
        <div className="fixed inset-0 flex items-center justify-center z-10 backdrop-blur-sm text-white">
          <div className="relative flex flex-col justify-center items-center w-1/3 h-2/5 rounded bg-blue-900 bg-opacity-70">
            <button
              onClick={() => {
                setUserLogin?.(false);
                setLoginFailed(false);
              }}
              className="absolute top-0 right-0 p-2 "
            >
              X
            </button>
            <div className="absolute top-0 text-3xl font-semibold">
              Welcome back to Git Hired!
            </div>
            <div className="flex flex-col space-y-2 w-2/3">
              <input
                type="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="px-4 py-2 rounded-lg bg-gray-800 bg-opacity-70  placeholder-white focus:ring focus:ring-blue-300"
                placeholder="UserName Here"
              />
              <input
                type={passwordVisible ? 'text' : 'password'}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="px-4 py-2 rounded-lg bg-gray-800 bg-opacity-70  placeholder-white focus:ring focus:ring-blue-300"
                placeholder="Password Here"
              />
            </div>
            {loginFailed === true ? (
              <div className="text-red-600 mt-2">
                Username or password does not exist
              </div>
            ) : (
              ''
            )}
            <button onClick={togglePasswordVisibility}>
              {passwordVisible ? 'Hide password' : 'Show password'}
            </button>
            <button
              type="submit"
              onClick={login}
              className="w-2/3 py-2 mt-4 bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
            >
              Login
            </button>
            <div className="mt-4">
              Not a User? Sign up{' '}
              <a
                className="hover:text-white font-medium cursor-pointer"
                onClick={() => {
                  setCreateUser?.(true);
                  setUserLogin?.(false);
                }}
              >
                here
              </a>
            </div>
          </div>
        </div>
      ) : (
        ' '
      )}
    </>
  );
}

export default Login;
