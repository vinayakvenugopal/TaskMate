import {Container} from 'react-bootstrap'
import Header from './components/Header'
import {Outlet} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TodoProvider } from './context/TodoContext'
function App() {
 
  return (
   <>
   <TodoProvider>
    <Header/>
   <ToastContainer />   
   <Container className='my-2'>
   <Outlet/>
   </Container>
   </TodoProvider>
   </>
  )
}

export default App
