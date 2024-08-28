import { Link } from "react-router-dom";
import logo from "../images/e_logo.png";
import RoleNav from "./RoleNav";
import { IoCameraOutline } from 'react-icons/io5';
import '../page/Styles/navbar.css'
import digital from '../photes/d1.png'


const Header = () => {
  return (
    <div>
      <nav className="navbar  navbar-expand-lg custom-bg bg-color">
        <div className="container-fluid text-color">
        
          <Link to="/" className="navbar-brand">
            <div style={{display:'flex'}}>
            <img src={digital} className="dimg"/>
            <h6 style={{verticalAlign:'sub',paddingTop:'10px',fontSize: '20px'}}>DigitalEye</h6>
            </div>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                >
                  <b className="nh navbar1">Home</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link active"
                  aria-current="page"
                >
                  <b className="nh navbar1">About Us</b>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link active"
                  aria-current="page"
                >
                  <b className="nh navbar1">Contact Us</b>
                </Link>
              </li>
             
            </ul>

            <RoleNav />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
