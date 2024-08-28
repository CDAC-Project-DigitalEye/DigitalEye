import AdminHeader from "./AdminHeader";
import CustomerHeader from "./CustomerHeader";
import StudioHeader from "./StudioHeader";
import NormalHeader from "./NormalHeader";

const RoleNav = () => {
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const studio = JSON.parse(sessionStorage.getItem("active-studio"));

  if (user != null) {
    return <CustomerHeader />;
  } else if (admin != null) {
    return <AdminHeader />;
  } else if (studio != null) {
    return <StudioHeader />;
  } else {
    return <NormalHeader />;
  }
};

export default RoleNav;
