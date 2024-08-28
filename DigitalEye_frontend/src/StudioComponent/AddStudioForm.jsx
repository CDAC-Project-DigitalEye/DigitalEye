import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudioForm = () => {
  const [locations, setLocations] = useState([]);
  const [studioUsers, setStudioUsers] = useState([]);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [studio, setStudio] = useState({
    name: "",
    description: "",
    locationId: "",
    street: "",
    pincode: "",
    emailId: "",
    pricePerDay: "",
    totalRoom: "",
    userId: "",
  });
  const [errors, setErrors] = useState({});
  
  let navigate = useNavigate();

  const retrieveAllLocations = async () => {
    try {
      const response = await axios.get("http://13.60.230.109:8080/api/location/fetch");
      return response.data;
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    const getAllLocations = async () => {
      const allLocations = await retrieveAllLocations();
      if (allLocations) {
        setLocations(allLocations.locations);
      }
    };
    getAllLocations();
  }, []);

  const retrieveAllStudioUsers = async () => {
    try {
      const response = await axios.get("http://13.60.230.109:8080/api/user/studio");
      return response.data;
    } catch (error) {
      console.error("Error fetching studio users:", error);
    }
  };

  useEffect(() => {
    const getAllStudioUsers = async () => {
      const allStudioUsers = await retrieveAllStudioUsers();
      if (allStudioUsers) {
        setStudioUsers(allStudioUsers.users);
      }
    };
    getAllStudioUsers();
  }, []);

  const handleInput = (e) => {
    setStudio({ ...studio, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!studio.name) newErrors.name = "Studio name is required.";
    if (!studio.description) newErrors.description = "Description is required.";
    if (!studio.locationId) newErrors.locationId = "Location is required.";
    if (!studio.userId) newErrors.userId = "Studio admin is required.";
    if (!studio.emailId || !/\S+@\S+\.\S+/.test(studio.emailId)) newErrors.emailId = "Valid email is required.";
    if (!studio.pricePerDay || studio.pricePerDay <= 1000 || studio.pricePerDay >= 3000) newErrors.pricePerDay = "Price per day must be a positive number.";
    if (!studio.street) newErrors.street = "Street address is required.";
    if (!studio.pincode || studio.pincode.length !== 6) newErrors.pincode = "Pin code must be 6 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveStudio = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!validateForm()) return; // Validate form before submission

    const formData = new FormData();
    formData.append("image1", selectedImage1);
    formData.append("image2", selectedImage2);
    formData.append("image3", selectedImage3);
    formData.append("name", studio.name);
    formData.append("locationId", studio.locationId);
    formData.append("description", studio.description);
    formData.append("street", studio.street);
    formData.append("pincode", studio.pincode);
    formData.append("emailId", studio.emailId);
    formData.append("pricePerDay", studio.pricePerDay);
    formData.append("userId", studio.userId);

    try {
      await axios.post("http://13.60.230.109:8080/api/studio/add", formData);
      navigate("/home");
    } catch (error) {
      console.error("Error saving studio:", error);
    }
  };

  return (
    <div>
      <div className="mt-2 d-flex align-items-center justify-content-center">
        <div className="card form-card border-color custom-bg" style={{ width: "50rem" }}>
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Add Studio</h5>
          </div>
          <div className="card-body text-color">
            <form className="row g-3" onSubmit={saveStudio}>
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label"><b>Studio Name</b></label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  name="name"
                  placeholder="Enter studio name"
                  onChange={handleInput}
                  value={studio.name}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label"><b>Location</b></label>
                <select
                  name="locationId"
                  onChange={handleInput}
                  className={`form-control ${errors.locationId ? 'is-invalid' : ''}`}
                  value={studio.locationId}
                >
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.city}
                    </option>
                  ))}
                </select>
                {errors.locationId && <div className="invalid-feedback">{errors.locationId}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="description" className="form-label"><b>Studio Description</b></label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  id="description"
                  name="description"
                  rows="3"
                  placeholder="Enter studio description"
                  onChange={handleInput}
                  value={studio.description}
                />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label"><b>Studio Admin</b></label>
                <select
                  name="userId"
                  onChange={handleInput}
                  className={`form-control ${errors.userId ? 'is-invalid' : ''}`}
                  value={studio.userId}
                >
                  <option value="">Select Studio Admin</option>
                  {studioUsers.map((studioUser) => (
                    <option key={studioUser.id} value={studioUser.id}>
                      {studioUser.firstName} {studioUser.lastName}
                    </option>
                  ))}
                </select>
                {errors.userId && <div className="invalid-feedback">{errors.userId}</div>}
              </div>

              <div className="col-md-6 mb-3 mt-1">
                <label htmlFor="emailId" className="form-label"><b>Studio Email</b></label>
                <input
                  type="email"
                  className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
                  id="emailId"
                  name="emailId"
                  placeholder="Enter studio email"
                  onChange={handleInput}
                  value={studio.emailId}
                />
                {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
              </div>

              <div className="col-md-6 mb-3 mt-1">
                <label htmlFor="pricePerDay" className="form-label"><b>Price Per Day</b></label>
                <input
                  type="number"
                  className={`form-control ${errors.pricePerDay ? 'is-invalid' : ''}`}
                  id="pricePerDay"
                  name="pricePerDay"
                  placeholder="Enter price per day"
                  onChange={handleInput}
                  value={studio.pricePerDay}
                />
                {errors.pricePerDay && <div className="invalid-feedback">{errors.pricePerDay}</div>}
              </div>

              <div className="col-md-6 mb-3 mt-1">
                <label htmlFor="street" className="form-label"><b>Street</b></label>
                <input
                  type="text"
                  className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                  id="street"
                  name="street"
                  placeholder="Enter street address"
                  onChange={handleInput}
                  value={studio.street}
                />
                {errors.street && <div className="invalid-feedback">{errors.street}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="pincode" className="form-label"><b>Pin Code</b></label>
                <input
                  type="number"
                  className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                  id="pincode"
                  name="pincode"
                  placeholder="Enter pin code"
                  onChange={handleInput}
                  value={studio.pincode}
                />
                {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="image1" className="form-label"><b>Select Studio Image 1</b></label>
                <input
                  className="form-control"
                  type="file"
                  id="image1"
                  name="image1"
                  onChange={(e) => setSelectedImage1(e.target.files[0])}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="image2" className="form-label"><b>Select Studio Image 2</b></label>
                <input
                  className="form-control"
                  type="file"
                  id="image2"
                  name="image2"
                  onChange={(e) => setSelectedImage2(e.target.files[0])}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="image3" className="form-label"><b>Select Studio Image 3</b></label>
                <input
                  className="form-control"
                  type="file"
                  id="image3"
                  name="image3"
                  onChange={(e) => setSelectedImage3(e.target.files[0])}
                />
              </div>

              <div className="d-flex align-items-center justify-content-center">
                <button
                  type="submit"
                  className="btn bg-color custom-bg-text col-md-4"
                >
                  Add Studio
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudioForm;

