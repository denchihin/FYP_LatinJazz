import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from './Signup';
import Signin from './Signin';
import Checkaccount from './Checkaccount';
import Manufacturer from "./Manufacturer";
import Supplier from './Supplier';

function App() {

  return (
<div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/CheckAC" element={<Checkaccount />} />
          <Route path="/Manufacturer" element={<Manufacturer />} />    
          <Route path="/Supplier" element={<Supplier />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
