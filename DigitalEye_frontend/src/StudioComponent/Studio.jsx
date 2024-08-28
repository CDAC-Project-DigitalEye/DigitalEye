
import GetAllLocations from "../LocationComponent/GetAllLocations";
import LocationNavigator from "../LocationComponent/LocationNavigator";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import StudioCard from "./StudioCard";
import StudioCarousel from "./StudioCarousel";
import GetStudioFacilities from "../FacilityComponent/GetStudioFacilities";
import GetStudioReviews from "../StudioReviewComponent/GetStudioReviews";
import { useNavigate } from "react-router-dom";
import Footer from "../page/Footer";

import "react-toastify/dist/ReactToastify.css";


const Studio = () => {
  const { studioId, locationId } = useParams();

  let user = JSON.parse(sessionStorage.getItem("active-customer"));
  let admin = JSON.parse(sessionStorage.getItem("active-admin"));

  const [quantity, setQuantity] = useState("");

  const [studios, setStudios] = useState([]);

  let navigate = useNavigate();

  const [facilitiesToPass, setFacilitiesToPass] = useState([]);

  const [studio, setStudio] = useState({
    id: "",
    name: "",
    description: "",
    street: "",
    pincode: "",
    emailId: "",
    pricePerDay: "",
    image1: "",
    image2: "",
    image3: "",
    userId: "",
    location: { id: "", city: "", description: "" },
    facility: [{ id: "", name: "", description: "" }],
  });

  const [booking, setBooking] = useState({
    userId: "",
    studioId: "",
    bookedDate: "",
    bookedTime: "",
  });


  // Validate date
  
  const handleBookingInput = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const retrieveStudio = async () => {
    const response = await axios.get(
      "http://13.60.230.109:8080/api/studio/id?studioId=" + studioId
    );

    return response.data;
  };

  useEffect(() => {
    const getStudio = async () => {
      const retrievedStudio = await retrieveStudio();

      setStudio(retrievedStudio.studio);
    };

    const getStudiosByLocation = async () => {
      const allStudios = await retrieveStudiosByLocation();
      if (allStudios) {
        setStudios(allStudios.studios);
      }
    };

    getStudio();
    getStudiosByLocation();

    console.log("Print studio");
    console.log(studio.json);

    setFacilitiesToPass(studio.facility);
  }, [studioId]);

  const retrieveStudiosByLocation = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/studio/location?locationId=" + locationId
    );
    console.log(response.data);
    return response.data;
  };

  const saveProductToCart = (userId) => {
    fetch("http://localhost:8080/api/user/cart/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantity,
        userId: userId,
        studioId: studioId,
      }),
    }).then((result) => {
      console.log("result", result);

      toast.success("Products added to Cart Successfully!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      result.json().then((res) => {
        console.log("response", res);
      });
    });
  };

  const bookStudio = (e) => {
    if (user == null) {
      alert("Please login to book the studios!!!");
      e.preventDefault();
    } else {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("studioId", studioId);
      formData.append("bookedDate", booking.bookedDate);
      formData.append("bookedTime", booking.bookedTime);

      console.log(formData);

      axios
        .post("http://localhost:8080/api/book/studio/", formData)
        .then((result) => {
          result.json().then((res) => {
            console.log(res);
            console.log(res.responseMessage);
            alert("Studio Booked Successfully!!!");
          });
        });
    }
  };

  const navigateToAddStudioFacility = () => {
    navigate("/studio/" + studioId + "/add/facility");
  };

  const navigateToAddReviewPage = () => {
    navigate("/studio/" + studioId + "/location/" + locationId + "/add/review");
  };

  function validateDate() {
    const today = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(today.getMonth() + 1);
  
    const bookedDateInput = document.getElementById('bookedDate');
    const bookedDate = new Date(bookedDateInput.value);
  
    if (bookedDate < today || bookedDate > oneMonthFromNow) {
      toast.error("Please select a date between today and one month from now.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      bookedDateInput.value = ''; // Clear the input
    }
  }
  return (
    <div className="container-fluid mb-5">
      <div class="row">
        <div class="col-sm-3 mt-2">
          <div class="card form-card border-color custom-bg">
            <StudioCarousel
              item={{
                image1: studio.image1,
                image2: studio.image2,
                image3: studio.image3,
              }}
            />
          </div>
        </div>
        <div class="col-sm-5 mt-2">
          <div class="card form-card border-color custom-bg">
            <div class="card-header bg-color">
              <div className="d-flex justify-content-between">
                <h1 className="custom-bg-text">{studio.name}</h1>
              </div>
            </div>

            <div class="card-body text-left text-color">
              <div class="text-left mt-3">
                <h3>Description :</h3>
              </div>
              <h4 class="card-text">{studio.description}</h4>
            </div>

            <div class="card-footer custom-bg">
              <div className="d-flex justify-content-between">
                <p>
                  <span>
                    <h4>Price : &#8377;{studio.pricePerDay}</h4>
                  </span>
                </p>
              </div>

              <div>
                <form class="row g-3" onSubmit={bookStudio}>
                  <div class="col-auto">
                    <label for="checkin">Booking Date</label>
                    <input
                      type="date"
                      class="form-control"
                      id="bookedDate"
                      name="bookedDate"
                      onChange={(e) => {
                       handleBookingInput(e);
                        validateDate();
                          }}
                      value={booking.bookedDate}
                      required
                    />
                  </div>
                  <div class="col-auto">
                    <label for="checkout">Booking Slot </label>
                    <select
                      name="bookedTime"
                      onChange={handleBookingInput}
                      className="form-control"
                      required
                    >
                      <option value="">Select Booking Slot</option>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                      <option value="Night">Night</option>
                    </select>
                  </div>

                  <div className="d-flex justify-content-center">
                    <div>
                      <input
                        type="submit"
                        class="btn custom-bg bg-color mb-3"
                        value="Book Studio"
                      />
                    </div>
                  </div>
                  <ToastContainer />
                </form>
              </div>

              {(() => {
                if (admin) {
                  console.log(admin);
                  return (
                    <div>
                      <input
                        type="submit"
                        className="btn custom-bg bg-color mb-3"
                        value="Add Facilities"
                        onClick={navigateToAddStudioFacility}
                      />
                    </div>
                  );
                }
              })()}

              {(() => {
                if (user) {
                  console.log(user);
                  return (
                    <div>
                      <input
                        type="submit"
                        className="btn custom-bg bg-color mb-3"
                        value="Add Review"
                        onClick={navigateToAddReviewPage}
                      />
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>
        <div class="col-sm-2 mt-2">
          <GetStudioFacilities item={studio} />
        </div>

        <div class="col-sm-2 mt-2">
          <GetStudioReviews item={studio} />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-sm-12">
          <h2>Other Studios in {studio.location.city} Location:</h2>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {studios.map((h) => {
              return <StudioCard item={h} />;
            })}
          </div>
        </div>
      </div>
      <br />
      <hr />
      <Footer />
    </div>
  );
};

export default Studio;