import "./App.css";
import Login from "./page/Login";
import Home from "./page/Home";
import Register from "./page/Register";
import PageNoteFound from "./page/PageNoteFound";
import { Route, BrowserRouter, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/chat' element={<Home />} />
          <Route path='*' element={<PageNoteFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
