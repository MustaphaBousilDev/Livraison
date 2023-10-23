import './App.css'
import videoBack from './assets/background.mp4'
import {Shadow} from './components/shadow'
import {Login} from './components/Form/Login.jsx'
function App() {
  return (
    <>
      <div className='w-full h-screen'>
          <video 
            className=' w-full h-full object-cover'
            src={videoBack} 
            autoPlay 
            loop 
            muted 
          />
      </div>
      <Shadow 
        className='opacity-30'
      />
      <Login/>
    </>
  )
}

export default App
