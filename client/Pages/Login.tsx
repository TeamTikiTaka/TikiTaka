import React, { useState, useContext } from 'react';
import { UserContext } from '../Contexts/Contexts';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setUserId, userLogin, setUserLogin, createUser, setCreateUser } =
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


  const createAccount = async () => {
    try {
      const res = await fetch('/api/login/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          firstname: firstname,
        }),
      });
      const data = await res.json();
      if (data) {
        setUserId?.(1);
        setUserLogin?.(false);
        setLoginFailed(false);
        setCreateUser!(false);
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
        <div
          className="fixed inset-0 z-10 backdrop-blur-sm text-white"
          onClick={() => {
            // setUserLogin?.(false);
            // setLoginFailed(false);
          }}
        >
          <div className="relative flex flex-col items-center w-1/3 bg-neutral-800 py-10 m-auto mt-48 bg-opacity-50">
            <button
              onClick={() => {
                setUserLogin?.(false);
                setLoginFailed(false);
              }}
              className="absolute top-3 right-4"
            >
              X
            </button>
            <div className="flex w-3/4 bg-opacity-50">
              <span
                className={`rounded-t-lg ${
                  !createUser && 'bg-neutral-500'
                } px-5 w-max grow p-3 text-center`}
                onClick={(e) => {
                  setCreateUser?.(false);
                  setUserLogin?.(true);
                }}
              >
                Login
              </span>
              <span
                className={`rounded-t-lg ${
                  createUser && 'bg-neutral-500'
                } px-5 w-max grow p-3 text-center`}
                onClick={(e) => {
                  setCreateUser?.(true);
                  // setUserLogin?.(false);
                }}
              >
                Signup
              </span>
            </div>

            {userLogin && !createUser && (
              <div className="flex flex-col bg-neutral-500 w-3/4 p-3 rounded-b-lg">
                <input
                  type="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className="m-2 px-4 py-2 bg-opacity-70 bg-gray-800"
                  placeholder="Username"
                />
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="m-2 px-4 py-2 bg-opacity-70 bg-gray-800"
                  placeholder="Password"
                />
                <button onClick={togglePasswordVisibility}>
                  {passwordVisible ? 'Hide password' : 'Show password'}
                </button>
                <button
                  type="submit"
                  onClick={login}
                  className="w-2/3 py-2 mt-4 bg-neutral-950 m-auto rounded-full hover:bg-gray-100 hover:text-slate-950"
                >
                  Sign In
                </button>
              </div>
            )}
            {createUser && (
              <div className="flex flex-col bg-neutral-500 w-3/4 p-3 rounded-b-lg">
                <input
                  type="name"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className="m-2 px-4 py-2 bg-opacity-70 bg-gray-800"
                  placeholder="Name"
                />
                <input
                  type="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className="m-2 px-4 py-2 bg-opacity-70 bg-gray-800"
                  placeholder="Username"
                />
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="m-2 px-4 py-2 bg-opacity-70 bg-gray-800"
                  placeholder="Password"
                />
                <button onClick={togglePasswordVisibility}>
                  {passwordVisible ? 'Hide password' : 'Show password'}
                </button>
                <button
                  type="submit"
                  onClick={createAccount}
                  className="w-2/3 py-2 mt-4 bg-neutral-950 m-auto rounded-full hover:bg-gray-100 hover:text-slate-950"
                >
                  Create Account
                </button>
              </div>
            )}

            {/* {loginFailed === true ? (
              <div className="text-red-600 mt-2">
                Username or password does not exist
              </div>
            ) : (
              ''
            )} */}
          </div>
        </div>
      ) : (
        ' '
      )}
    </>
  );
}

export default Login;
