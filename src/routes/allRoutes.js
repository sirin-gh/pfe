import React from "react"
import { Navigate } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

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
import PagesTimeline from "../pages/Extra Pages/pages-timeline"
import PagesInvoice from "../pages/Extra Pages/pages-invoice"
import PagesDirectory from "../pages/Extra Pages/pages-directory"
import PagesBlank from "../pages/Extra Pages/pages-blank"
import Pages404 from "../pages/Extra Pages/pages-404"
import Pages500 from "../pages/Extra Pages/pages-500"
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
import Chat from "pages/Chat/Chat"
import Planing from "pages/Staff/Planing"
import Rapport from "pages/rapport/rapport"
import ListDonneurDocteur from "pages/DocteurPages/list-donneur-docteur"
import ContactezDonneurDocteur from "pages/DocteurPages/contactez-donneur-docteur"
import VoirStaffDocteur from "pages/DocteurPages/voir-staff-docteur"
import ContactezStaffDocteur from "pages/DocteurPages/contactez-staff-docteur"
import VoirStockDeSangDocteur from "pages/DocteurPages/voir-stockDeSang-docteur"
import RapportDocteur from "pages/DocteurPages/rapport-docteur"
import ConsulterRapport from "pages/rapport/consulter-rapport"
import VoirDonneurStaff from "pages/StaffPages/voir-donneur-staff"
import AjouterDonneurStaff from "pages/StaffPages/ajouter-donneur-staff"
import ContactezDonneurStaff from "pages/StaffPages/contactez-donneur-staff"
import VoirStaffStaff from "pages/StaffPages/voir-staff-staff"
import AjouterStaffStaff from "pages/StaffPages/ajouter-staff-staff"
import PlaningStaff from "pages/StaffPages/planing-staff"
import VoirCollectesStaff from "pages/StaffPages/voir-collectes-staff"
import VoirEvenementDocteur from "pages/DocteurPages/voir-evenement-docteur"
import AjouterCollectes from "pages/Collectes/ajouter-collectes"
import VoirCollectes from "pages/Collectes/voir-collectes"
import EvenementDonneur from "pages/DonneurPages/Evenement-Donneur"
import ReservationDonneur from "pages/DonneurPages/reservation-donneur"
import VoirStockDeSangDonneur from "pages/DonneurPages/voir-StockDeSang-Donneur"
import RapportDonneur from "pages/DonneurPages/rapport-donneur"
import ContactezNousDonneur from "pages/DonneurPages/Contactez-Nous-Donneur"
import AjouterDonneurDocteur from "pages/DocteurPages/ajouter-donneur-docteur"
import VoirDocteurStaff from "pages/StaffPages/voir-docteur-staff"
import ContactezDocteurStaff from "pages/StaffPages/contactez-docteur-staff"
import EvenementStaff from "pages/StaffPages/evenement-staff"
import VoirLeStockDeSangStaff from "pages/StaffPages/voir-leStockDeSang-staff"
import AjouterLeStockDeSangStaff from "pages/StaffPages/ajouter-LeStockDeSang-staff"
import ReservationStaff from "pages/StaffPages/reservation-staff"
import RapportStaff from "pages/StaffPages/rapport-staff"
import Ajouterplaning from "pages/ajouterplaning"
import AjouterReservation from "pages/Réservations.js/ajouter-reservation"
import AjouterRapport from "pages/rapport/ajouter-rapport"
import AjouterRapportDocteur from "pages/DocteurPages/ajouter-rapport-docteur-"
import AjouterStockDeSangDocteur from "pages/DocteurPages/ajouter-stockDeSang-docteur"
import AjouterStockDeSangDonneur from "pages/DonneurPages/ajouter-StockDeSang-Donneur"
import DocteurConsulter from "pages/DocteurPages/docteur-consulter"
import EmailCompse from "pages/Email/email-compse"

const userRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/Rapports", component: <Rapport /> },
  { path: "/consulter", component: <ConsulterRapport /> },

  // // //profile
  { path: "/profile", component: <UserProfile /> },

  // //Email

  { path: "/VoirDocteur", component: <Docteurs /> },
  { path: "/VoirDonneurs", component: <VoireDonateur /> },
  { path: "/Evenement", component: <Evenement /> },
  { path: "/VoirStaff", component: <Staff /> },
  { path: "/AjouterDonneurs", component: <AjouterDonateur /> },
  { path: "/AjouterStaff", component: <AjouterStaff /> },
  { path: "/AjouterDocteurs", component: <AjouterLesDocteurs /> },
  { path: "/Réservations", component: <Réservations /> },
  { path: "/VoirLeStockDeSang", component: <VoirLeStock /> },
  { path: "/AjouterLeStockDeSang", component: <AjouterLeStock /> },
  { path: "/chat", component: <Chat /> },
  { path: "/ContacterDocteur", component: <Chat /> },
  { path: "/send-email", component: <EmailCompse /> },

  { path: "/ContacterDonneur", component: <Chat /> },
  { path: "/ContacterStaff", component: <Chat /> },
  { path: "/ContacterStaff", component: <Chat /> },
  { path: "/planing", component: <Planing /> },
  { path: "/ajouter-collectes", component: <AjouterCollectes /> },
  { path: "/voir-Collectes", component: <VoirCollectes /> },
  { path: "/ajouter-planning", component: <Ajouterplaning /> },
  { path: "/ajouter-reservation", component: <AjouterReservation /> },
  { path: "/ajouter-rapport", component: <AjouterRapport /> },

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
const docteurRoutes = [
  { path: "/docteur-dashboard", component: <Docteurs /> },
  { path: "/VoirDonneur-Docteur", component: <ListDonneurDocteur /> },
  { path: "/ContactezDonneur-Docteur", component: <ContactezDonneurDocteur /> },
  { path: "/VoirStaff-Docteur", component: <VoirStaffDocteur /> },
  { path: "/ContactezStaff-Docteur", component: <ContactezStaffDocteur /> },
  { path: "/ContactezStaff-Docteur", component: <ContactezStaffDocteur /> },
  { path: "/Evénement-Docteur", component: <VoirEvenementDocteur /> },
  { path: "/VoireStockDeSang-Docteur", component: <VoirStockDeSangDocteur /> },
  { path: "/Rapport-Docteur", component: <RapportDocteur /> },
  { path: "/AjouterDonneur-Docteur", component: <AjouterDonneurDocteur /> },
  { path: "/ajouter-rapport-docteur", component: <AjouterRapportDocteur /> },
  {
    path: "/ajouter-stockDeSang-docteur",
    component: <AjouterStockDeSangDocteur />,
  },
  { path: "/docteur-consulter", component: <DocteurConsulter /> },
]
const donateurRoutes = [
  { path: "/donateur-dashboard", component: <VoireDonateur /> },
  { path: "/Evenement-Donneur", component: <EvenementDonneur /> },
  { path: "/Réservations-Donneur", component: <ReservationDonneur /> },
  { path: "/voir-StockDeSang-Donneur", component: <VoirStockDeSangDonneur /> },
  { path: "/Rapport-Donneur", component: <RapportDonneur /> },
  { path: "/Contactez-Nous-Donneur", component: <ContactezNousDonneur /> },
  {
    path: "/ajouter-StockDeSang-Donneur",
    component: <AjouterStockDeSangDonneur />,
  },
]
const staffRoutes = [
  { path: "/staff-dashboard", component: <VoireDonateur /> },
  { path: "/VoirDonneur-Staff", component: <VoirDonneurStaff /> },
  { path: "/AjouterDonneur-Staff", component: <AjouterDonneurStaff /> },
  { path: "/ContactezDonneur-Staff", component: <ContactezDonneurStaff /> },
  { path: "/AjouterStaff-Staff", component: <AjouterStaffStaff /> },
  { path: "/VoirStaff-Staff", component: <VoirStaffStaff /> },
  { path: "/Planing-Staff", component: <PlaningStaff /> },
  { path: "/VoirDocteur-Staff", component: <VoirDocteurStaff /> },
  { path: "/ContactezDocteur-Staff", component: <ContactezDocteurStaff /> },
  { path: "/Evenement-Staff", component: <EvenementStaff /> },
  { path: "/Voir-LeStockDeSang-Staff", component: <VoirLeStockDeSangStaff /> },
  {
    path: "/Ajouter-LeStockDeSang-Staff",
    component: <AjouterLeStockDeSangStaff />,
  },
  { path: "/Réservation-Staff", component: <ReservationStaff /> },
  { path: "/VoirCollectesStaff", component: <VoirCollectesStaff /> },
  { path: "/Rapport-Staff", component: <RapportStaff /> },
]

export { userRoutes, authRoutes, docteurRoutes, donateurRoutes, staffRoutes }
