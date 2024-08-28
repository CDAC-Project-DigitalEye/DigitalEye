import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const UserRegister = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    age: "",
    sex: "",
  });

  const [genders, setGenders] = useState([]);
  const [errors, setErrors] = useState({});

  // Determine user role based on URL
  if (document.URL.indexOf("admin") !== -1) {
    user.role = "Admin";
  } else if (document.URL.indexOf("studio") !== -1) {
    user.role = "Photographer";
  } else if (document.URL.indexOf("customer") !== -1) {
    user.role = "Customer";
  }

  console.log("ROLE FETCHED : " + user.role);

  // Handle user input
  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Fetch gender options
  const retrieveAllGenders = async () => {
    try {
      const response = await axios.get("http://13.60.230.109:8080/api/user/gender");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch genders:", error);
    }
  };

  useEffect(() => {
    const getAllGenders = async () => {
      const allGenders = await retrieveAllGenders();
      if (allGenders) {
        setGenders(allGenders.genders || []);
      }
    };

    getAllGenders();
  }, []);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Validate first name
    if (!user.firstName) {
      newErrors.firstName = "First name is required";
    } else if (/\d/.test(user.firstName)) {
      newErrors.firstName = "Numbers are not allowed in the first name";
    }
    

    // Validate last name
    if (!user.lastName) {
      newErrors.lastName = "Last name is required";
    } else if (/\d/.test(user.lastName)) {
      newErrors.lastName = "Numbers are not allowed in the Last name";
    }

    // Validate email
    if (!user.emailId) {
      newErrors.emailId = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.emailId)) {
      newErrors.emailId = "Email format is invalid";
    }

    // Validate password
    if (!user.password) newErrors.password = "Password is required";

    // Validate contact
    if (!user.contact) {
      newErrors.contact = "Contact number is required";
    } else if (user.contact.length !== 10) {
      newErrors.contact = "Contact number must be 10 digits";
    } else if (user.contact === "0000000000") {
      newErrors.contact = "Contact number cannot be all zeros";
    } else if (!/^[6-9]/.test(user.contact)) {
      newErrors.contact = "Contact number must start with 6, 7, 8, or 9";
    }
    else if (/[^0-9]/.test(user.contact)) {
      newErrors.contact = "Contact number must contain only digits";
    }

    // Validate age
    if (!user.age) {
      newErrors.age = "Age is required";
    } else if (user.age < 18) {
      newErrors.age = " Not allowed";
    }

    // Validate street
    if (!user.street) newErrors.street = "Street is required";

    // Validate city
    if (!user.city) {
      newErrors.city = "City is required";
  } else if (!isNaN(user.city)) {
      newErrors.city = "City cannot be a number";
  }

    // Validate pincode
    if (!user.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (user.pincode.length !== 6) {
      newErrors.pincode = "Pincode must be 6 digits";
    } else if (!/^\d+$/.test(user.pincode)) {
      newErrors.pincode = "Pincode must only contain digits";
    } else {
      const pincodeNumber = parseInt(user.pincode, 10);
      if (pincodeNumber < 200000 || pincodeNumber > 999999) {
        newErrors.pincode = "Pincode must be between 200000 and 999999";
      }
    }
  

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save user data
  const saveUser = async (event) => {
    event.preventDefault();

    if (!validateForm()) return; // Prevent submission if validation fails

    try {
      const response = await fetch("http://13.60.230.109:8080/api/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        toast.success("Registered Successfully!!!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        const result = await response.json();
        console.log("response", result);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Failed to register user:", error);
      toast.error("Registration failed. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <div className="mt-2 d-flex align-items-center justify-content-center ms-2 me-2 mb-2">
        <div className="card form-card border-color text-color custom-bg" style={{ width: "50rem" }}>
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Register {user.role}</h5>
          </div>
          <div className="card-body">
            <form className="row g-3" onSubmit={saveUser}>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="firstName" className="form-label"><b>First Name</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  onChange={handleUserInput}
                  value={user.firstName}
                  required
                />
                {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="lastName" className="form-label"><b>Last Name</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  onChange={handleUserInput}
                  value={user.lastName}
                  required
                />
                {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="emailId" className="form-label"><b>Email Id</b></label>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  placeholder="Enter your email address"
                  onChange={handleUserInput}
                  value={user.emailId}
                  required
                />
                {errors.emailId && <div className="text-danger">{errors.emailId}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="form-label"><b>Password</b></label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleUserInput}
                  value={user.password}
                  required
                />
                {errors.password && <div className="text-danger">{errors.password}</div>}
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="sex" className="form-label"><b>User Gender</b></label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="sex"
                  required
                >
                  <option value="">Select Gender</option>
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
                {errors.sex && <div className="text-danger">{errors.sex}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="contact" className="form-label"><b>Contact No</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  name="contact"
                  placeholder="Enter your contact number"
                  onChange={handleUserInput}
                  value={user.contact}
                  required
                />
                {errors.contact && <div className="text-danger">{errors.contact}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="age" className="form-label"><b>Age</b></label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  placeholder="Enter your age"
                  onChange={handleUserInput}
                  value={user.age}
                  required
                />
                {errors.age && <div className="text-danger">{errors.age}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="street" className="form-label"><b>Street</b></label>
                <textarea
                  className="form-control"
                  id="street"
                  name="street"
                  rows="3"
                  placeholder="Enter your street address"
                  onChange={handleUserInput}
                  value={user.street}
                  required
                />
                {errors.street && <div className="text-danger">{errors.street}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="city" className="form-label"><b>City</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder="Enter your city"
                  onChange={handleUserInput}
                  value={user.city}
                  required
                />
                {errors.city && <div className="text-danger">{errors.city}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="pincode" className="form-label"><b>Pincode</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  placeholder="Enter your pincode"
                  onChange={handleUserInput}
                  value={user.pincode}
                  required
                />
                {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
              </div>

              <div className="d-flex align-items-center justify-content-center">
                <input
                  type="submit"
                  className="btn bg-color custom-bg-text col-md-3"
                  value="Register User"
                />
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
