import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login.js'
import Register from './components/Register'
import Home from './components/Home'
import Node from './components/Node'
import AllTrans from "./components/AllTrans.js";
import MyTrans from "./components/MyTrans.js";
import Blockchain from "./components/Blockchain.js";
import './App.css';
import OptimizedTrans from "./components/OptimizedTrans.js";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/home/:id' element={<Home />} />
          <Route exact path='/node/:id1/:id2' element={<Node />} />
          <Route exact path='/viewAllTrans' element={<AllTrans />} />
          <Route exact path='/viewMyTrans' element={<MyTrans />} />
          <Route exact path='/viewOptimizedTrans' element={<OptimizedTrans />} />
          <Route exact path='/viewBlockchain' element={<Blockchain />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
