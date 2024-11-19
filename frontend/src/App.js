import {Outlet} from 'react-router-dom'; 
import './App.css';
import Navigation from './components/layout/navigation_bar';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
function App() {
  return (
    <div className="App">
       <ToastContainer/>
       <Navigation/>
       <main className='py-3'>
            <Outlet/>
       </main>
    </div>
  );
}

export default App;
