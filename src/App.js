import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navigation';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alertc';

function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert message="This is a alert—check it out!" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
