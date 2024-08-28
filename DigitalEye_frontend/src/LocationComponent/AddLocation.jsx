import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddLocation = () => {
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ city: "", description: "" });

  let navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    let errors = { city: "", description: "" };

    if (!city.trim()) {
      errors.city = "City is required.";
      valid = false;
    }

    if (!description.trim()) {
      errors.description = "Description is required.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const saveLocation = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let data = { city, description };

    fetch("http://13.60.230.109:8080/api/location/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
        console.log(res.responseMessage);

        navigate("/home");
        toast.warn(res.responseMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
            <h5 className="card-title">Add Location</h5>
          </div>
          <div className="card-body text-color">
            <form onSubmit={saveLocation}>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  <b>Location (City)</b>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                  id="city"
                  placeholder="Enter the city name..."
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (e.target.value.trim()) {
                      setErrors(prevErrors => ({ ...prevErrors, city: "" }));
                    }
                  }}
                  value={city}
                />
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  <b>Location Description</b>
                </label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  id="description"
                  rows="3"
                  placeholder="Enter a brief description of the location..."
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (e.target.value.trim()) {
                      setErrors(prevErrors => ({ ...prevErrors, description: "" }));
                    }
                  }}
                  value={description}
                />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>

              <input
                type="submit"
                className="btn bg-color custom-bg-text"
                value="Add Location"
              />

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocation;
