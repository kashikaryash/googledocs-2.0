window.global ||= window;
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Logo = () => {
  return (
    <Link
      to="/document/create"
      className="flex flex-shrink-0 justify-center items-center w-14 h-14 hover:bg-gray-100 rounded-full"
    >
      <img src={logo}
      alt="document Logo"
    />
    </Link>
  );
};

export default Logo;