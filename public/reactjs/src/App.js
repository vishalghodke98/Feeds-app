import React, { useState, useEffect } from 'react';
import './App.css';
import Header from '../src/views/Components/Header';
import Sidebar from '../src/views/Components/Sidebar';
import Feed from '../src/views/Components/Feed';
import Widget from '../src/views/Components/Widget';
import Login from '../src/views/Components/Login';

function App() {
  localStorage.removeItem("UserData");
  const [user, setUser] = useState(localStorage.getItem('UserData') ? JSON.parse(localStorage.getItem('UserData')) : '');
  const [login, setLogin] = useState(true)
  const [isFeedViev, setIsFeedViev] = useState(false);

  const handleViewChange = () => {
    setLogin(false);
    setIsFeedViev(true);
  }


  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('LoginData'));
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
