import './App.css'
import Inscreption from './pages/Inscreption'
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Home from './pages/Home';
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/inscription' element={<Inscreption />}/>
        <Route path='/verifyEmail/:token?' element={<VerifyEmail />} />
        <Route path='/forgotPassword' element={<ForgotPassword/>} />
      </Routes>
      </Router>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

export default App
