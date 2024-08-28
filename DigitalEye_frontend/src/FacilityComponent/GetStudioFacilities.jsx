import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const GetStudioFacilities = (studio) => {
  const { studioId } = useParams();

  console.log("FETCHED HOTEL ID : " + studioId);

  const [facilities, setFacilities] = useState([]);

  const retrieveAllFacilities = async () => {
    const response = await axios.get(
      "http://13.60.230.109:8080/api/facility/studio?studioId=" + studioId
    );
    return response.data;
  };

  useEffect(() => {
    const getAllFacilities = async () => {
      const allFacilities = await retrieveAllFacilities();
      if (allFacilities) {
        setFacilities(allFacilities.facilities);
      }
    };

    getAllFacilities();
  }, []);

  return (
    <div
      class="list-group form-card border-color"
      style={{
        height: "25rem",
      }}
    >
      <Link
        to="#"
        class="list-group-item list-group-item-action bg-color custom-bg-text"
      >
        <b>Studio Facilities</b>
      </Link>

      <div
        style={{
          overflowY: "auto",
        }}
      >
        {facilities.map((f) => {
          return (
            <Link
              to="#"
              class="list-group-item list-group-item-action text-color custom-bg"
            >
              <b>{f.name}</b>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default GetStudioFacilities;
