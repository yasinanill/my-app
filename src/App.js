
import './App.css';
import Register from './pages/register';
import  { Toaster } from 'react-hot-toast';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';

function App() {
  return (
    <div className="App">
    <Toaster/>
    <Routes>
        <Route   path='/'  element={ <Home/>}   />
        <Route   path='register'  element={ <Register/>}   />
        <Route   path='login'  element={ <Login/>}   />



    </Routes>

    </div>
  );
}

export default App;
