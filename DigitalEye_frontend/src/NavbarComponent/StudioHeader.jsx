import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../page/Styles/navbar.css'
const StudioHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-studio"));
  console.log(user);

  const studioLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-studio");
    window.location.reload(true);
    navigate("home");
  };

  
  const viewProfile = (e) => {
    navigate(`/user/${user.id}/profile/detail`);
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link
          to="user/studio/bookings/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className="nh navbar1">All Booked Studio</b>
        </Link>
      </li>

      <li class="nav-item">
        <div class="nav-link active" aria-current="page">
          <b className="nh navbar1" onClick={viewProfile}>
            View Profile
          </b>
        </div>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={studioLogout}
        >
          <button class="btn btn-primary ">Logout</button>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default StudioHeader;
