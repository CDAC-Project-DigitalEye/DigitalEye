import "./App.css";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./page/AboutUs";
import ContactUs from "./page/ContactUs";
import Header from "./NavbarComponent/Header";
import HomePage from "./page/HomePage";
import AddLocation from "./LocationComponent/AddLocation";
import AddFacility from "./FacilityComponent/AddFacility";
import AddStudioForm from "./StudioComponent/AddStudioForm";
import UserRegister from "./UserComponent/UserRegister";
import Studio from "./StudioComponent/Studio";
import AddStudioFacilities from "./FacilityComponent/AddStudioFacilities";
import AddStudioReview from "./StudioReviewComponent/AddStudioReview";
import UserLoginForm from "./UserComponent/UserLoginForm";
import ViewAllBooking from "./BookingComponent/ViewAllBooking";
import ViewMyBooking from "./BookingComponent/ViewMyBooking";
import ViewMyStudioBookings from "./BookingComponent/ViewMyStudioBookings";
import VerifyBooking from "./BookingComponent/VerifyBooking";
import MyWallet from "./UserComponent/MyWallet";
import UserProfilePage from "./UserComponent/UserProfilePage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/all/studio/location" element={<HomePage />} />
        <Route
          path="/home/studio/location/:locationId/:locationName"
          element={<HomePage />}
        />
        <Route path="contact" element={<ContactUs />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="admin/add-location" element={<AddLocation />} />
        <Route path="admin/add-facility" element={<AddFacility />} />
        <Route path="admin/studio/register" element={<AddStudioForm />} />
        <Route path="user/studio/register" element={<UserRegister />} />
        <Route path="user/customer/register" element={<UserRegister />} />
        <Route path="user/admin/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route
          path="/home/studio/location/:locationId/:locationName"
          element={<HomePage />}
        />
        <Route
          path="studio/:studioId/add/facility"
          element={<AddStudioFacilities />}
        />
        <Route
          path="studio/:studioId/location/:locationId/add/review"
          element={<AddStudioReview />}
        />
        <Route
          path="/studio/:studioId/location/:locationId"
          element={<Studio />}
        />
        <Route path="user/admin/booking/all" element={<ViewAllBooking />} />
        <Route path="user/studio/bookings" element={<ViewMyBooking />} />
        <Route
          path="user/studio/bookings/all"
          element={<ViewMyStudioBookings />}
        />
        <Route
          path="/studio/verify/booking/:bookingId"
          element={<VerifyBooking />}
        />
        <Route path="/customer/wallet" element={<MyWallet />} />
        <Route
          path="/user/:userId/profile/detail"
          element={<UserProfilePage />}
        />
      </Routes>
    </div>
  );
}

export default App;
