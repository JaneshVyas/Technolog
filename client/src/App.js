import { useContext } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Settings from './pages/settings/Settings';
import Single from './pages/single/Single';
import Write from './pages/write/Write'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Context } from './context/Context';

function App() {

  const { user } = useContext(Context);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/register' element={user ? <Home/> : <Register />} />
        <Route path='/login' element={user ? <Home/> : <Login />} />
        <Route path='/write' element={user ? <Write/> : <Register />} />
        <Route path='/settings' element={user ? <Settings/> : <Register />} />
        <Route path='/post/:postId' element={<Single />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
