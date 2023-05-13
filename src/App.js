import "./App.css";
import Login from "./page/Login";
import Chat from "./component/Chat";
import Register from "./page/Register";
import PageNoteFound from "./component/PageNoteFound";
import { Route, BrowserRouter, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='*' element={<PageNoteFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
