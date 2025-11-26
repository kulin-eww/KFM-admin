import { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setAdminDetails } from "../../redux/slices/adminSlice";
import { getAdminDetailsAPI } from "../../api/admin";
import BreadcrumbsNav from "../../components/navigation/BreadcrumbsNav";
import Loader from "../../components/Loader/Loader";
import { useTranslation } from "react-i18next";

const Main = () => {
  const token = localStorage.getItem("token");
  const storedLang = localStorage.getItem("locale") || "en";
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const isUserDetailsFetched = useAppSelector((state) => state.user.isVendorDetailsFetched);

  const { data, isSuccess, isError, isFetched, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getAdminDetailsAPI,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAdminDetails(data?.data));
    }
  }, [data, isSuccess, isFetched]);

  useEffect(() => {
    if (!token || token === undefined || token === null || token === "undefined" || token === "null") {
      navigate("/signin");
    }
    if (isError) {
      localStorage.removeItem("token");
      navigate("/signin");
    }
  }, [isSuccess, isError, data]);

  useEffect(() => {
    i18n.changeLanguage(storedLang);
    document.documentElement.dir = storedLang === "ar" ? "rtl" : "ltr";
  }, [i18n, storedLang]);

  return (
    <>
      {!isLoading && isSuccess ? (
        <main className="flex h-screen bg-bg-secondary overflow-hidden">
          <Sidebar />
          <section className="flex-1 flex flex-col h-full overflow-hidden">
            <Header />
            <div className="overflow-auto bg-[#F7F7F7] xl:p-5 p-5 h-full sidebar-scroll">
              <BreadcrumbsNav />
              <Outlet />
            </div>

            {/* <div className="flex justify-center items-center bg-white py-1 sticky bottom-0 z-10 text-sm text-text-primary">
              © KHOSH JEEM 2025
            </div> */}
          </section>
        </main>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Main;
