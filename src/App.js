import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import injectContext from "./store/context";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
