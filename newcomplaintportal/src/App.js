import logo from './logo.svg';
import './App.css';
import RegisterComplaint from './components/User/RegisterComplaint';
import {BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
import UserRouters from './Routers/UserRouters';
import AdminRouters from './Routers/AdminRouters';
import RegisterUser from './components/User/RegisterUser';
import LoginUser from './components/User/LoginUser';
import FeedbackUser from './components/User/FeedbackUser';

function App() {
  return (
    <div className="App">
     <Router>
     <Routes>
    <Route path="/*" element={<UserRouters/>}></Route>
    <Route path='/admin/*'element={<AdminRouters/>}></Route>
   {/*} <Route path="/" element={<RegisterUser/>}></Route>
    <Route path="/login" element={<LoginUser/>}></Route>
    <Route path="/register" element={<RegisterComplaint/>}></Route>
  <Route path="/feedback" element={<FeedbackUser/>}></Route>*/}
      </Routes>
  </Router>
  
     

      
      
      
     
    </div>
  );
}

export default App;
