import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/Movie">Movie</Link>
          </li>
          <li>
            <Link to="/Favourite">Favourite Movie</Link>
          </li>
        </ul>
      </nav>

      <Movie />
    </>
  )
};

export default Layout;