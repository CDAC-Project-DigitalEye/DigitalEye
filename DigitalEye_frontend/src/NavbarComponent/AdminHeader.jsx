import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../page/Styles/navbar.css'
const AdminHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  console.log(user);

  const adminLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    window.location.reload(true);
    navigate("/home");
  };

  return (
     <div>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5" >
      <li className="nav-item">
        <Link
          to="/admin/add-location"
          className="nav-link active"
          aria-current="page"
        >
          <b className="nh navbar1">Add Location</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/admin/add-facility"
          className="nav-link active"
          aria-current="page"
        >
          <b className="nh navbar1">Add Facility</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/user/studio/register"
          className="nav-link active"
          aria-current="page"
        >
          <b className="nh navbar1">Register Studio User</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/admin/studio/register"
          className="nav-link active"
          aria-current="page"
        >
          <b className="nh navbar1">Add Studio</b>
        </Link>
      </li>

  

      <li className="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={adminLogout}
        >
         <button class="btn btn-primary ">Logout</button>
        </Link>
        <ToastContainer />
      </li>
      
    </ul>
     </div>
  );
};

export default AdminHeader;
