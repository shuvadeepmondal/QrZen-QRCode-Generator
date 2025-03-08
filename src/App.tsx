import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/utilis/Navbar";
import Qrcodegen from "./components/qrcodegen/Qrcodegen";


const App: React.FC = () => {
  return (
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qrgeneration" element={<Qrcodegen />} />
        </Routes>
      </div>
  );

}

export default App;

