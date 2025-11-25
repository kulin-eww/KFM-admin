import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../../components/Home/Hero";
import WhoWeAre from "../../components/Home/WhoWeAre";
import OurVision from "../../components/Home/OurVision";
import OurMission from "../../components/Home/OurMission";
import ValueProposition from "../../components/Home/ValueProposition";
import Process from "../../components/Home/Process";
import CallToAction from "../../components/Home/CallToAction";
import Booking from "../../components/Home/Booking/Booking";
import ContactUs from "../../components/Home/ContactUs";
import DownloadApp from "./DownloadApp";
import FAQ from "./Faq";

const Home = () => {
  const location = useLocation();

  // Handle scroll to hash section when navigating from other pages
  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const sectionId = location.hash.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <main>
      <Hero />
      <WhoWeAre />
      <OurVision />
      <OurMission />
      <Booking />
      <DownloadApp />
      <ValueProposition />
      <Process />
      <CallToAction />
      <ContactUs />
      <FAQ />
    </main>
  );
};

export default Home;
