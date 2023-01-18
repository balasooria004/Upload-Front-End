import { Link } from "react-router-dom";
import "./Navbar.css";
function NavBar({Received}) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><h1 className="Brand">UPLOAD</h1></Link>
          <div >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {
                (Received === null )?
                <li className="nav-item">
                  <Link className="nav-link" to="/Login">Login<i className="fi fi-ss-user end-icons" ></i></Link>
                </li>
                :
                <li className="nav-item">
                  <Link className="nav-link" to="/" >
                    Hi, {Received.name}<i className="fi fi-ss-user end-icons" ></i>
                  </Link>
                </li>
              }

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;