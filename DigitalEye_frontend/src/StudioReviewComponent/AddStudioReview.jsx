import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import StudioCarousel from "../StudioComponent/StudioCarousel";
import { useParams } from "react-router-dom";
import axios from "axios";
import StudioCard from "../StudioComponent/StudioCard";
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const AddStudioReview = () => {
  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  const [userId, setUserId] = useState(user.id);
  let { studioId, locationId } = useParams();
  const [star, setStar] = useState("");
  const [review, setReview] = useState("");
  const [studios, setStudios] = useState([]);
  const [studio, setStudio] = useState({
    id: "",
    name: "",
    description: "",
    street: "",
    pincode: "",
    emailId: "",
    pricePerDay: "",
    totalRoom: "",
    image1: "",
    image2: "",
    image3: "",
    userId: "",
    location: { id: "", city: "", description: "" },
    facility: [{ id: "", name: "", description: "" }],
  });
  const [loading, setLoading] = useState(true); // Loading state

  let navigate = useNavigate();

  const retrieveStudio = async () => {
    const response = await axios.get(
      "http://13.60.230.109:8080/api/studio/id?studioId=" + studioId
    );
    return response.data;
  };

  useEffect(() => {
    const getStudio = async () => {
      setLoading(true); // Start loading
      try {
        const retrievedStudio = await retrieveStudio();
        setStudio(retrievedStudio.studio);
      } finally {
        setLoading(false); // End loading
      }
    };

    const getStudiosByLocation = async () => {
      setLoading(true); // Start loading
      try {
        const allStudios = await retrieveStudiosByLocation();
        if (allStudios) {
          setStudios(allStudios.studios);
        }
      } finally {
        setLoading(false); // End loading
      }
    };

    getStudio();
    getStudiosByLocation();
  }, [studioId]);

  const retrieveStudiosByLocation = async () => {
    console.log("Lets print location id here " + studio.location.id);
    const response = await axios.get(
      "http://localhost:8080/api/studio/location?locationId=" + locationId
    );
    console.log(response.data);
    return response.data;
  };

  const saveStudioReview = (e) => {
    e.preventDefault();

    if (user == null) {
      alert("Please login as Customer for adding your review!!!");
      return;
    }

    if (!star || !review) {
      toast.warn("Please provide both star rating and review before submitting.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setUserId(user.id);
    let data = { userId, studioId, star, review };

    fetch("http://localhost:8080/api/studio/review/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((res) => {
        navigate("/studio/" + studio.id + "/location/" + studio.location.id);
        toast.success(res.responseMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mb-5">
      <div className="row">
        <div className="col-sm-2 mt-2"></div>
        <div className="col-sm-3 mt-2">
          <div className="card form-card border-color custom-bg">
            <StudioCarousel
              item={{
                image1: studio.image1,
                image2: studio.image2,
                image3: studio.image3,
              }}
            />
          </div>
        </div>

        <div className="col-sm-5 mt-2">
          <div className="card form-card border-color custom-bg" style={{ width: "30rem" }}>
            <div className="card-header bg-color text-center custom-bg-text">
              <h5 className="card-title">Add Studio Review</h5>
            </div>
            <div className="card-body text-color">
              <form onSubmit={saveStudioReview}>
                <div className="mb-3">
                  <label className="form-label"><b>Star</b></label>
                  <select
                    name="star"
                    onChange={(e) => setStar(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select Star</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="review" className="form-label"><b>Studio Review</b></label>
                  <textarea
                    className="form-control"
                    id="review"
                    rows="3"
                    placeholder="Enter review.."
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                  />
                </div>
                <input
                  type="submit"
                  className="btn bg-color custom-bg-text"
                  value="Add Review"
                />
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-sm-12">
          <h2>Other Studios in {studio.location.city} Location:</h2>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {studios.map((h) => (
              <StudioCard key={h.id} item={h} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudioReview;

