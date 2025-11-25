import rightSectionBg from "../../assets/images/auth/auth-right-section-bg.png";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import kfmNamedLogo from "../../assets/icons/common/kfm-nammed-logo.svg";
import { useEffect } from "react";
import leftSectionBg from "../../assets/images/auth/auth-left.png";

const AuthLayout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      !location.pathname.startsWith("/setup") &&
      token &&
      token !== undefined &&
      token !== null &&
      token !== "undefined" &&
      token !== "null"
    ) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="flex h-screen">
      <div
        className="hidden lg:flex lg:w-[60%] h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${leftSectionBg})` }}
      />
      <div
        className="flex w-full  lg:w-[40%] justify-center items-start bg-center overflow-y-auto sidebar-scroll"
        style={{ backgroundImage: `url(${rightSectionBg})` }}
      >
        <div className="bg-white sm:shadow-sm py-10 px-10 rounded-2xl flex flex-col align-center justify-center h-full">
          <div className="flex justify-center mb-6">
            <img src={kfmNamedLogo} style={{ height: "80px", width: "120px", marginBottom: 11 }} />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
