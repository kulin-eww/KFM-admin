import { Outlet } from "react-router-dom"
import Header from "../../components/Home/Header";
import Footer from "../../components/Home/Footer";

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default HomeLayout;