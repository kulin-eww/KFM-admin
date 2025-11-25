import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  DashbaoardPendingBookings,
  DashboardCancelBookings,
  DashboardSuccessfulBookings,
  DashboardUpcompingBookings,
  GraphIcon,
} from "../../components/common/icons";
import { useTranslation } from "react-i18next";

const TotalBookings: React.FC<{ data: any }> = ({ data }) => {
      const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="text-lg font-medium text-text-primary"> {t("dashboard.totalBookings")}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div
            className="rounded-xl p-4 mb-3 w-full col-span-2"
            style={{
              background: "linear-gradient(180deg, #EDEDED 0%, #00FF94 100%)",
              borderRadius: "13px",
              padding: "2px",
            }}
          >
            <div
              className="rounded-lg bg-white p-4 h-full"
              style={{
                borderRadius: "12px",
              }}
            >
              <div>
                <div className="text-sm flex items-center gap-2 font-semibold">
                  <span>
                    <DashboardSuccessfulBookings  />
                  </span>
                 <span className="">{t("dashboard.successful")}</span>
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{data?.successBookings}</div>
                <div
                  className="text-sm text-secondary flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/past-booking")}
                >
                 {t("dashboard.seeDetails")}
                  <span>
                    <ChevronRight className="text-secondary rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="rounded-xl p-4 mb-3 w-full col-span-2 md:col-span-1"
            style={{
              background: "linear-gradient(180deg, #EDEDED 0%, #00FF94 100%)",
              borderRadius: "13px",
              padding: "2px",
            }}
          >
            <div
              className="rounded-lg bg-white p-4 h-full"
              style={{
                borderRadius: "12px",
              }}
            >
              <div>
                <div className="text-sm flex items-center gap-2 font-semibold">
                  <span>
                    <DashbaoardPendingBookings  />
                  </span>
                  {t("dashboard.pending")}
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{data?.pendingBookings}</div>
                <div
                  className="text-sm text-secondary flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/all-booking")}
                >
                  {t("dashboard.seeDetails")}
                  <span>
                    <ChevronRight className="text-secondary rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="rounded-xl p-4 mb-3 w-full col-span-2 md:col-span-1"
            style={{
              background: "linear-gradient(180deg, #EDEDED 0%, #00FF94 100%)",
              borderRadius: "13px",
              padding: "2px",
            }}
          >
            <div
              className="rounded-lg bg-white p-4 h-full"
              style={{
                borderRadius: "12px",
              }}
            >
              <div>
                <div className="text-sm flex items-center gap-2 font-semibold">
                  <span>
                    <DashboardCancelBookings  />
                  </span>
                  {t("dashboard.cancelled")}
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{data?.cancelledBookings}</div>
                <div
                  className="text-sm text-secondary flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/cancelled-booking")}
                >
                {t("dashboard.seeDetails")}
                  <span>
                    <ChevronRight className="text-secondary rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="rounded-xl p-4 mb-3 w-full col-span-2"
            style={{
              background: "linear-gradient(180deg, #EDEDED 0%, #00FF94 100%)",
              borderRadius: "13px",
              padding: "2px",
            }}
          >
            <div
              className="rounded-lg bg-white p-4 h-full"
              style={{
                borderRadius: "12px",
              }}
            >
              <div>
                <div className="text-sm flex items-center gap-2 font-semibold">
                  <span>
                    <DashboardUpcompingBookings  />
                  </span>
                  {t("dashboard.upcoming")}
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{data?.upcomingBookings}</div>
                <div
                  className="text-sm text-secondary flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/upcoming-booking")}
                >
                {t("dashboard.seeDetails")}
                  <span>
                    <ChevronRight className="text-secondary rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalBookings;
