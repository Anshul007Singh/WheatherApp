import React, { useContext } from 'react'
import Login from './Login'
import Home from './Home'
import AuthContext from '../helper/AuthContext'
import NavBar from './Navbar'


const Dashboard = () => {

    const authContext = useContext(AuthContext);

    const isLogin = authContext.state
  return (
      <div>
          {isLogin ?
              <div>
                  <NavBar/>
                  <Home />   
          </div>
               : <Login />}
    </div>
  )
}

export default Dashboard