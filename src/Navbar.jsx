import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Feed</Link>
          </li>
          <li>
            <Link to="/Post">Friends</Link>
          </li>
          <li>
            <Link to="/Post">profile</Link>
          </li>
          <li>
            <Link to="/Post">Notification</Link>
          </li>
          <li>
            <Link to="/Post">Reel</Link>
          </li>
          <li>
            <Link to="/Post">Setting</Link>
          </li>
          <li>
            <Link to="/Post">Messages</Link>
          </li>
          <li>
            <Link to="/Post">Likes</Link>
          </li>
        </ul>
      </nav>

    </>
  )
};

export default Navbar;