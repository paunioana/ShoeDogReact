
import './App.css';
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import {Route, Routes} from "react-router-dom";

import MenuAppBar from "./components/MenuAppBar";
import AboutComponent from "./components/About";
import UserComponent from "./components/UserComponent";
import AddReviewComponent from "./components/AddReviewComponent";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import {useEffect} from "react";
import {getBrands} from "./api-calls/ShoeDogApi";
import {useDispatch} from "react-redux";
import {addUserDetails} from "./actions/action";
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        let token = localStorage.getItem("token");
        let expiryDate = localStorage.getItem("expiryDate");
        let role = localStorage.getItem("role");
        let email = localStorage.getItem("email");
        dispatch(addUserDetails(token, expiryDate, role, email));
    }, []);

  return (
      <ThemeProvider theme={theme}>
    <div className="App">

          <MenuAppBar/>

   <div>
          <Routes>
              <Route path="/register" element={<RegisterComponent />}/>
              <Route path="/login"  element={<LoginComponent />}/>
              <Route path="/about"  element={<AboutComponent />}/>
              <Route path="/profile"  element={<UserComponent />}/>
              <Route path="/addReview"  element={<AddReviewComponent />}/>
          </Routes>
   </div>


    </div>
      </ThemeProvider>
  );
}

export default App;
