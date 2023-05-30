import "./App.css";
import Login from "./page/Login";
import Home from "./page/Home";
import Register from "./page/Register";
import PageNoteFound from "./page/PageNoteFound";
import { Route, BrowserRouter, Routes,Navigate } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from './context/AuthContext'

function App() {
 const {currentUser} = useContext(AuthContext)
 const ProtectedRoute = ({children}) => {
  if(!currentUser) {
    return <Navigate to="/login"/>
  }else{
    return children
  }
 }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={
           <ProtectedRoute> 
            <Home />
            </ProtectedRoute>
            } />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='*' element={<PageNoteFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
