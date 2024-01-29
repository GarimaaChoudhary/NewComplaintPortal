import React from 'react'
import {Route, Routes} from 'react-router-dom'
import RegisterComplaint from '../components/User/RegisterComplaint'
import RegisterUser from '../components/User/RegisterUser';
import LoginUser from '../components/User/LoginUser';
import FeedbackUser from '../components/User/FeedbackUser';

const UserRouters = () => (
  <Routes>
   
    <Route path="/" element={<RegisterUser/>}></Route>
    <Route path="/login" element={<LoginUser/>}></Route>
    <Route path="/register" element={<RegisterComplaint/>}></Route>
    <Route path="/feedback" element={<FeedbackUser/>}></Route>
  </Routes>
);

export default UserRouters;
