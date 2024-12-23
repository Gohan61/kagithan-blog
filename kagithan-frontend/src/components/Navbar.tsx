import logo from "../assets/kagithan-log-small.png";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-slate-700">
      <div className="flex justify-between items-center gap-2 md:w-[600px] ml-auto mr-auto">
        <Link to={"/"}>
          <img src={logo} alt="" className="w-[100px] object-contain" />
        </Link>
        <div className="text-white text-lg font-bold">
          <Link to={"/about"}>Contact</Link>
          <Link to={"/blogs"} className="ml-10 mr-3 md:mr-0">
            Blogs
          </Link>
        </div>
      </div>
    </nav>
  );
}
