import './App.css'
import {Login} from './components/Form/Login.jsx'
import { gapi } from 'gapi-script'
import { useEffect } from 'react'
const clientID='1090604505843-uq59rok8qc8jg41c7u218gtjfvtm2669.apps.googleusercontent.com'
function App() {
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId:clientID,
        scope:''
      })
    }
    gapi.load('client:auth2',start)
  })
  return (
    <>
      <Login/>
    </>
  )
}

export default App
