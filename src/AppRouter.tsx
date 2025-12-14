import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AuthLayout from "./auth/layout/AuthLayout";
import { LoginPage } from "./auth/layout/pages/LoginPages";
import { RegisterPage } from "./auth/layout/pages/RegisterPages";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
        <Route path="/auth/login" element={<LoginPage/>}/>
        <Route path="/auth/register" element={<RegisterPage/>}/>
        </Route>


         <Route path="/" element={<Navigate to='/auth'/>} />  
         <Route path="*" element={<Navigate to='/auth'/>} />  



      </Routes>
    </BrowserRouter>
  );
};
