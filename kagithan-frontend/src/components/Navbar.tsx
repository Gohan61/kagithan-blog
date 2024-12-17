import logo from "../assets/kagithan-log-small.png";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/blogs"}>Blog</Link>
    </nav>
  );
}
