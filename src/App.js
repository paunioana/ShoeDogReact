
import './App.css';
import RegisterComponent from "./RegisterComponent";
import LoginComponent from "./LoginComponent";
import {Route, Routes} from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">

          <NavBar/>

   <div>
          <Routes>
              <Route path="/" element={<RegisterComponent />}/>
              <Route path="/register" element={<RegisterComponent />}/>
              <Route path="/login"  element={<LoginComponent />}/>
          </Routes>
   </div>


    </div>
  );
}

export default App;
