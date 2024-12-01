import { Route, Routes } from "react-router-dom";
import Customgen from "./components/customqr/Customgen";
import Home from "./components/home/Home";
import Navbar from "./components/utilis/Navbar";
// import Qrcodegen from "./components/qrcodegen/Qrcodegen";


const App: React.FC = () => {
  return (
    <div className="bg-slate-400">
      <Navbar/> 
      <div className="pt-[80px]"> {/* Padding to prevent overlap with navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customqr" element={<Customgen />} />
        </Routes>
      </div>
    </div>
  );

}

export default App;

