import './App.css'
import { UserProvider } from './contexts/UserContext'
import AppRouter from './routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </>
  )
}

export default App
