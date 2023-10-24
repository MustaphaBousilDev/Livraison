import videoBack from '../assets/videoBack.mp4'

const Backgrounds = () => {
  return (
    <div className='w-full h-screen'>
          <video 
            className=' w-full h-full object-cover'
            src={videoBack} 
            autoPlay 
            loop 
            muted 
    />
    </div>
  )
}

export {
    Backgrounds
}