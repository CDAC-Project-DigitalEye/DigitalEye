import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../page/Styles/navbar.css'

const CustomerHeader = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-customer"));

  const userLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-customer");

    navigate("/home");
    window.location.reload(true);
  };

  const viewProfile = (e) => {
    navigate(`/user/${user.id}/profile/detail`);
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link
          to="user/studio/bookings"
          className="nav-link active"
          aria-current="page"
        >
          <b className="nh navbar1">Booked Studio</b>
        </Link>
      </li>

      <li class="nav-item navbar1">
        <div class="nav-link active" aria-current="page">
          <b className="nh" onClick={viewProfile}>
            View Profile
          </b>
        </div>
      </li>

      <li>
        <Link to="/customer/wallet" class="nav-link active" aria-current="page">
          <b className="nh navbar1"> Wallet Amount</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={userLogout}
        >
          <button class="btn btn-primary ">Logout</button>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default CustomerHeader;
