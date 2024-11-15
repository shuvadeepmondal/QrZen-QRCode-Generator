
import { Link } from 'react-router-dom';
import { Button } from '../ui/button'; 
// import logo from "../../assets/Logo.png";

const Navbar: React.FC = () => {

  return (
    <nav className="border-gray-100 py-2 fixed top-0 w-full z-50 backdrop:blur">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 py-1 mx-auto">
        <Link to="#" className="flex items-center">
          {/* <img
            src={logo}
            className="h-8 mr-3 sm:h-12"
            alt="Logo"
          /> */}
          <h2 className="self-center text-3xl text-white font-semibold whitespace-nowrap">
            Qr<span className='text-purple-500'>Zen</span>
          </h2>
        </Link>
        <div className="flex items-center lg:order-2">
          <Button variant="outline" className="text-white bg-blue-600 hover:bg-blue-700">
            Gerarate
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;