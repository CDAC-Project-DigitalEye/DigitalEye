import { Link } from "react-router-dom";
import LocationNavigator from "../LocationComponent/LocationNavigator";
import StudioCarousel from "./StudioCarousel";


const StudioCard = (studio) => {
  return (
    <div className="col">
      <div class="card border-color rounded-card card-hover product-card custom-bg h-50">
        <img
          src={"http://13.60.230.109:8080/api/studio/" + studio.item.image2}
          class="card-img-top rounded mx-auto d-block m-2"
          alt="img"
          height={'200px'}
          
          style={{
            maxHeight: "270px",
            maxWidth: "100%",
            width: "auto",
          }}
        />

        {/* <StudioCarousel
      item={{
        carouselId : studio.item.image1, 
        image1 : studio.item.image1,
        image2 : studio.item.image2,
        image3 : studio.item.image3,
      }}
      /> */}

        <div class="card-body text-color">
          <h5 class="card-title d-flex justify-content-between">
            <div>
              <b className="t-color">{studio.item.name}</b>
            </div>
            <LocationNavigator
              item={{
                id: studio.item.location.id,
                city: studio.item.location.city,
              }}
            />
          </h5>
          <p className="card-text">{studio.item.description}</p>
          <p class="text-color">
            <b>
              <i>Contact:</i> {studio.item.emailId}
            </b>
          </p>
        </div>
        <div class="card-footer">
          <div className="text-center text-color">
            <p>
              <span>
                <h4>Price : &#8377;{studio.item.pricePerDay}</h4>
              </span>
            </p>
          </div>
          <div className="d-flex justify-content-center
          
          
          ">
            <Link
              to={`/studio/${studio.item.id}/location/${studio.item.location.id}`}
              className="btn bg-color custom-bg-text"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioCard;
