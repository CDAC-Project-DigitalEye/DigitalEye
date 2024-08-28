import { motion } from "framer-motion";
import Carousel from "./Carousel";
import GetAllLocations from "../LocationComponent/GetAllLocations";
import GetAllFacility from "../FacilityComponent/GetAllFacility";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StudioCard from "../StudioComponent/StudioCard";
import Footer from "./Footer";
import VideoSlider from './VideoSlider';
import './Styles/Home.css';

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
};

const HomePage = () => {
  const [studios, setStudios] = useState([]);
  const { locationId } = useParams();

  useEffect(() => {
    const getAllStudios = async () => {
      const allStudios = await retrieveAllStudios();
      if (allStudios) {
        setStudios(allStudios.studios);
      }
    };

    const getProductsByLocation = async () => {
      const allStudios = await retrieveProductsByLocation();
      if (allStudios) {
        setStudios(allStudios.studios);
      }
    };

    if (locationId == null) {
      console.log("Location Id is null");
      getAllStudios();
    } else {
      console.log("Location Id is NOT null");
      getProductsByLocation();
    }
  }, [locationId]);

  const retrieveAllStudios = async () => {
    const response = await axios.get("http://13.60.230.109:8080/api/studio/fetch");
    return response.data;
  };

  const retrieveProductsByLocation = async () => {
    const response = await axios.get(
      "http://13.60.230.109:8080/api/studio/location?locationId=" + locationId
    );
    return response.data;
  };

  return (
    <div className="container-fluid mb-2">
      {/* <Carousel /> */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h1 className="text-center hed1 mt-3">Hire a professional photographer with us</h1>
        <h4 className="text-center  minh mt-3">We capture your memories forever</h4>
        <VideoSlider />
        <h5 className="std text-center hed1 mt-3 mb-3">Studios</h5>
      </motion.div>

      <motion.div
        className="mt-2 mb-5"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="row">
          <div className="col-md-2">
            <GetAllLocations />
          </div>
          <div className="col-md-8">
            <div className="row row-cols-1 row-cols-md-3 g-3">
              {studios.map((studio) => (
                <motion.div
                  key={studio.id}  // Assuming 'studio' has an 'id' property
                  variants={itemVariants}
                >
                  <StudioCard item={studio} />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="col-md-2">
            <GetAllFacility />
          </div>
        </div>
      </motion.div>
      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;

