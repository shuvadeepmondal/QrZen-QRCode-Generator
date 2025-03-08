// import { Routes, Route } from "react-router-dom";
// import Home from "./components/home/Home";
// import Navbar from "./components/utilis/Navbar";
// import Qrcodegen from "./components/qrcodegen/Qrcodegen";

// import ParticleBackground from "./components/ui/Particlebackground";
import SolarSystem from "./components/ui/SolarSystem";


const App: React.FC = () => {
  return (
      <div className="min-h-screen">
        <SolarSystem/>
        {/* <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qrgeneration" element={<Qrcodegen />} />
        </Routes> */}
      </div>
  );

}

export default App;

