import React from "react"
import { Navigate } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

//Email


// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"

// Dashboard
import Dashboard from "../pages/Dashboard/index"



// Maps

//Icons


//Tables




// Forms


//Ui
import UiAlert from "../pages/Ui/UiAlert"
import UiButtons from "../pages/Ui/UiButtons"
import UiBadge from "../pages/Ui/UiBadge"
import UiCards from "../pages/Ui/UiCards"
import UiCarousel from "../pages/Ui/UiCarousel"
import UiDropdown from "../pages/Ui/UiDropdown"
import UiGrid from "../pages/Ui/UiGrid"
import UiImages from "../pages/Ui/UiImages"
import UiLightbox from "../pages/Ui/UiLightbox"
import UiModal from "../pages/Ui/UiModal"
import UiPagination from "../pages/Ui/UiPagination"
import UiPopoverTooltips from "../pages/Ui/UiPopoverTooltips"
import UiProgressbar from "../pages/Ui/UiProgressbar"
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions"
import UiTypography from "../pages/Ui/UiTypography"
import UiVideo from "../pages/Ui/UiVideo"
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout"
import UiRangeSlider from "../pages/Ui/UiRangeSlider"

//Extra Pages
import PagesTimeline from "../pages/Extra Pages/pages-timeline";
import PagesInvoice from "../pages/Extra Pages/pages-invoice";
import PagesDirectory from "../pages/Extra Pages/pages-directory";
import PagesBlank from "../pages/Extra Pages/pages-blank";
import Pages404 from "../pages/Extra Pages/pages-404";
import Pages500 from "../pages/Extra Pages/pages-500";
import UiUtilities from "pages/Ui/UiUtilities"
import UiColors from "pages/Ui/UiColors"
import UiOffcanvas from "pages/Ui/UiOffcanvas"
import Docteurs from "../pages/Docteur/Docteurs"
import Evenement from "pages/Evenement/Evenement"
import VoireDonateur from "pages/Donateur/VoireDonateur"
import Staff from "pages/Staff/Staff"
import AjouterDonateur from "pages/Donateur/AjouterDonateur"
import AjouterStaff from "pages/Staff/AjouterStaff"
import AjouterLesDocteurs from "pages/Docteur/AjouterLesDocteurs"
import Réservations from "pages/Réservations.js/Réservations"
import VoirLeStock from "pages/GérerLeSang/VoirLeStock"
import AjouterLeStock from "pages/GérerLeSang/AjouterLeStock"

const userRoutes = [
  { path: "/dashboard", component: <Dashboard /> },



 

  // // //profile
  { path: "/profile", component: <UserProfile /> },

  // //Email
  
  { path: "/Docteur", component: <Docteurs /> },
  { path: "/VoireDonateur", component: <VoireDonateur /> },
  { path: "/Evenement", component: <Evenement /> },
  { path: "/Staff", component: <Staff /> },
  { path: "/AjouterDonateur", component: <AjouterDonateur /> },
  { path: "/AjouterStaff", component: <AjouterStaff /> },
  { path: "/AjouterLesDocteurs", component: <AjouterLesDocteurs /> },
  { path: "/Réservations", component: <Réservations /> },
  { path: "/VoirLeStockDeSang", component: <VoirLeStock/> },
  { path: "/AjouterLeStockDeSang", component: <AjouterLeStock/> },




  // //Charts


  // // Icons
 
  
  

  // // Maps
  

  // // Forms
  
  // // Ui
  { path: "/ui-alerts", component: <UiAlert /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-badge", component: <UiBadge /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-dropdowns", component: <UiDropdown /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-lightbox", component: <UiLightbox /> },
  { path: "/ui-modals", component: <UiModal /> },
  { path: "/ui-pagination", component: <UiPagination /> },
  { path: "/ui-popover-tooltip", component: <UiPopoverTooltips /> },
  { path: "/ui-progressbars", component: <UiProgressbar /> },
  { path: "/ui-tabs-accordions", component: <UiTabsAccordions /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-video", component: <UiVideo /> },
  { path: "/ui-session-timeout", component: <UiSessionTimeout /> },
  { path: "/ui-rangeslider", component: <UiRangeSlider /> },
  { path: "/ui-utilities", component: <UiUtilities /> },
  { path: "/ui-colors", component: <UiColors /> },
  { path: "/ui-offcanvas", component: <UiOffcanvas /> },

  // //Extra Pages
  { path: "/pages-timeline", component: <PagesTimeline /> },
  { path: "/pages-invoice", component: <PagesInvoice /> },
  { path: "/pages-directory", component: <PagesDirectory /> },
  { path: "/pages-blank", component: <PagesBlank /> },

  // this route should be at the end of all other routes
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
]

const authRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },

  { path: "/pages-404", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },

  // Authentication Inner
  { path: "/pages-login", component: <Login1 /> },
  { path: "/pages-register", component: <Register1 /> },
  { path: "/page-recoverpw", component: <Recoverpw /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },
]
const docteurRoutes=[
  { path: "/docteur-dashboard", component: <Docteurs /> },
]
const donateurRoutes=[
  { path: "/donateur-dashboard", component: <VoireDonateur /> },
]
const staffRoutes=[
  { path: "/staff-dashboard", component: <VoireDonateur /> },
]

export { userRoutes, authRoutes,docteurRoutes,donateurRoutes,staffRoutes}