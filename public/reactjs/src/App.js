import React, { useState, useEffect } from 'react';
import './App.css';
import Header from '../src/views/Components/Header';
import Sidebar from '../src/views/Components/Sidebar';
import Feed from '../src/views/Components/Feed';
import Widget from '../src/views/Components/Widget';
import Login from '../src/views/Components/Login';

function App() {
  // localStorage.removeItem("UserData");
  // localStorage.removeItem("LoginData");
  const [user, setUser] = useState(localStorage.getItem('UserData') ? JSON.parse(localStorage.getItem('UserData')) : '');
  const [login, setLogin] = useState(true)
  const [isFeedViev, setIsFeedViev] = useState(false);

  const handleViewChange = () => {
    setLogin(!Login);
    setIsFeedViev(!isFeedViev);
  }

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('LoginData'));
    if (LoginData && LoginData.login === true) {
      console.log('true')
      handleViewChange();
    }
  }, [])

  return (
    <div className='app'>
      {login ? <div>
        <Login handleViewChange={() => handleViewChange()} />
      </div> : null}
      {isFeedViev ? <div>
        <Header />
        <div className='app_body'>
          <Sidebar />
          <Feed />
          <Widget />
        </div>
      </div> : null}
    </div>
  )
}

export default App
