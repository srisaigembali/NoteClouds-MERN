import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navigation';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alertc';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert} />
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route exact path="/about" element={<About />} />
          <Route
            exact
            path="/login"
            element={<Login showAlert={showAlert} />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup showAlert={showAlert} />}
          />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
