import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
// import Error from "./components/Error/Error";
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="App">
      {/* {location.pathname !== "/" && <Nav />} */}
      <h1>HENRY FOOD</h1>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path={`/detail/:id`} element={<Detail />} />
        <Route path="/form" element={<Form />} />
        {/* <Route path="*" element={<Error />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
