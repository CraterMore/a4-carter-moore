import './App.css';
import './pico.pink.min.css'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';


function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
   </Routes>
  );
}

export default App;
