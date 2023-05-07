import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Signup';
import Signin from './Signin';
import Checkaccount from './Checkaccount';
import Manufacturer from "./Manufacturer";
import Supplier from './Supplier';
import Consumer from './Consumer';
import Complete from './Complete';
import Transfer from './Transfer';
import Checkartwork from './Checkartwork';
import Tracker from './Tracker';


function App() {

  return (
<div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/CheckAC" element={<Checkaccount />} />
          <Route path="/CheckAW" element={<Checkartwork />} />     
          <Route path="/Manufacturer" element={<Manufacturer />} />    
          <Route path="/Supplier" element={<Supplier />} /> 
          <Route path="/Consumer" element={<Consumer />} />
          <Route path="/Complete" element={<Complete />} />
          <Route path="/Transfer" element={<Transfer />} />
          <Route path="/Tracker" element={<Tracker />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
