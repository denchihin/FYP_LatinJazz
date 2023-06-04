import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from './Signin';
import Manufacturer from "./Manufacturer";
import Supplier from './Supplier';
import Consumer from './Consumer';
import NotFound from './Notfound';
import Checkaccount from './Checkaccount';
import Checkartwork from './Checkartwork';
import Signup from './Signup'
import Transfer from './Transfer'
import Tracker from './Tracker'
import ShoppingCart from './ShoppingCart';


function App() {

  return (
<div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/Manufacturer" element={<Manufacturer />} />    
          <Route path="/Supplier" element={<Supplier />} /> 
          <Route path="/Consumer" element={<Consumer />} />
          <Route path="/CheckAC" element={<Checkaccount />} />
          <Route path="/CheckAW" element={<Checkartwork />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Transfer" element={<Transfer />} />
          <Route path="/Tracker" element={<Tracker />} />
          <Route path="/Shop" element={<ShoppingCart />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
