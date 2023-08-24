import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";

function App() {
  return (
    <div className="App">
      <h1>HENRY FOOD - Christian Araneda</h1>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path={`/detail/:id`} element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
