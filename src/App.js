import './css/App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home" 
import About from "./components/About" 
import SendMessage from "./components/SendMessage"
import ToApprove from "./components/ToApprove"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/about" element={<About />} />
        <Route path="/sendMessage" element={<SendMessage />} />
        <Route path="/toApprove" element={<ToApprove />} />
      </Routes>
    </div>
  );
}

export default App;




