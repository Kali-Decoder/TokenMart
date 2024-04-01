import "./App.css";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import BackGradients from "./components/BackGradients";
import Faq from "./components/Faq";
import Features from "./components/Features";
import Solutions from "./components/Solutions";
import Info from "./components/Info";
import Top from "./components/Top";
import About from "./components/About";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RoadMap from "./components/RoadMap";
import { Routes, Route } from "react-router-dom";
import Authscreen from "./components/Authscreen";

import MarketPlace from "./components/MarketPlace";

import ProductDetails from "./components/ProductDetails";
import CheckoutModal from "./components/CheckoutModal";
import Payment from "./components/Payment";
import AdminDashboard from "./components/AdminDashboard";

import RegisterUser from "./components/RegisterUser";
import DashBoard from "./components/UserDash/DashBoard";
import { useUserDataContext } from "./contexts/UserContextProvider";
import NotFound from "./components/404/NotFound";

import RegisterBrand from "./components/RegisterBrand/RegisterBrand";

import BrandsDashboard from "./components/BrandsDashboard/BrandsDashboard";


function App() {
  const { verified, owner } = useUserDataContext();
  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        draggablePercent={60}
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route exact path="/auth" element={<Authscreen />} />
        <Route
          path="/"
          exact
          element={
            <>
              <div className="-z-30 back-light transition-all">
                <Top />
                <NavBar />
                <Home />
                <Features />
                <About />
                <Solutions />
                <RoadMap />
                <Faq />
            
                <Footer />
                <BackGradients page="home" />
              </div>
            </>
          }
        />

        <Route exact path="/marketplace" element={<MarketPlace />} />
        {verified ? (
          <>
            <Route exact path="/user-dashboard" element={<DashBoard />} />
            <Route exact path="/checkout" element={<CheckoutModal />} />
          </>
        ) : null}
        <Route path="/marketplace/:productId" element={<ProductDetails />} />
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/register-user" element={<RegisterUser />} />
        {owner ? (
          <>
            <Route exact path="/register-brand" element={<RegisterBrand />} />
            <Route exact path="/adminpage" element={<AdminDashboard />} />
          </>
        ) : null}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
