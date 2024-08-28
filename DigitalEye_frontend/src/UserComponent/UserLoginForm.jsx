import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserLoginForm = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!loginRequest.emailId) {
      newErrors.emailId = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginRequest.emailId)) {
      newErrors.emailId = "Email is invalid";
      isValid = false;
    }

    if (!loginRequest.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!loginRequest.role || loginRequest.role === "0") {
      newErrors.role = "User role is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const loginAction = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    fetch("http://13.60.230.109:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);

        if (res.role === "Admin") {
          sessionStorage.setItem("active-admin", JSON.stringify(res));
        } else if (res.role === "Customer") {
          sessionStorage.setItem("active-customer", JSON.stringify(res));
        } else if (res.role === "Photographer") {
          sessionStorage.setItem("active-studio", JSON.stringify(res));
        }

        toast.success("Logged in successfully!!!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        navigate("/home");
        window.location.reload(true);
      });
    });
  };

  return (
    <div>
      <div className="mt-2 d-flex align-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color text-center custom-bg-text">
            <h4 className="card-title">User Login</h4>
          </div>
          <div className="card-body">
            <form onSubmit={loginAction}>
              <div className="mb-3 text-color">
                <label htmlFor="role" className="form-label">
                  <b>User Role</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="role"
                  value={loginRequest.role}
                >
                  <option value="0">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Customer">Customer</option>
                  <option value="Photographer">Studio</option>
                </select>
                {errors.role && <div className="text-danger">{errors.role}</div>}
              </div>

              <div className="mb-3 text-color">
                <label htmlFor="emailId" className="form-label">
                  <b>Email Id</b>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={loginRequest.emailId}
                  placeholder="Enter your email"
                />
                {errors.emailId && <div className="text-danger">{errors.emailId}</div>}
              </div>
              
              <div className="mb-3 text-color">
                <label htmlFor="password" className="form-label">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={loginRequest.password}
                  placeholder="Enter your password"
                  autoComplete="on"
                />
                {errors.password && <div className="text-danger">{errors.password}</div>}
              </div>
              
              <button
                type="submit"
                className="btn bg-color custom-bg-text"
              >
                Login
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;
