import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  DashboardTotalContainers,
  DashboardTotalDrivers,
  DashboardTotalExpiredLicense,
  DashboardViolationIcon,
  GraphIcon,
} from "../../components/common/icons";
import { useTranslation } from "react-i18next";

const Driver: React.FC<{ data: any }> = ({ data }) => {
  const navigate = useNavigate();
  const {t} = useTranslation()
  return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="text-lg font-medium text-text-primary">{t("dashboard.driver")}</div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
          <div
            className="rounded-xl p-4 mb-3 w-full"
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
              <div className="flex flex-col justify-between h-full">
                <div className="text-sm flex items-center gap-2 font-semibold">
                  <span>
                    <DashboardTotalExpiredLicense />
                  </span>
                  {t("dashboard.completed")}
                </div>
                <div>
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
          </div>
          <div
            className="rounded-xl p-4 mb-3 w-full"
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
                    <DashboardTotalContainers />
                  </span>
                  {t("dashboard.totalContainers")}
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{data?.totalContainers}</div>
                <div
                  className="text-sm text-secondary flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/container")}
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
            className="rounded-xl p-4 mb-3 w-full"
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
              <div className="flex flex-col justify-between h-full">
                <div className="text-sm flex items-center gap-2 font-semibold">
                  <span>
                    <DashboardViolationIcon />
                  </span>
                  {t("dashboard.violations")}
                </div>
                <div>
                  <div className="text-lg font-extrabold text-[#159B62] mt-3">{data?.driverViolations}</div>
                  {/* <div className="text-sm text-secondary flex items-center gap-2">
                    See Details
                    <span>
                      <ChevronRight className="text-secondary rtl:rotate-180" />
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
          <div
            className="rounded-xl p-4 mb-3 w-full"
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
                    <DashboardTotalDrivers />
                  </span>
                  {t("dashboard.total")}
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{data?.totalDriver}</div>
                <div
                  className="text-sm text-secondary flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/driver")}
                >
                 {t("dashboard.seeDetails")}
                  <span>
                    <ChevronRight className="text-secondary rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div
            className="rounded-xl p-4 mb-3 w-full"
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
                    <DashboardTotalExpiredLicense />
                  </span>
                  {t("dashboard.licenseExpired")}
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">1 Month</div>
                <div className="text-sm text-secondary flex items-center gap-2">
                  {t("dashboard.seeDetails")}
                  <span>
                    <ChevronRight className="text-secondary rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
  );
};

export default Driver;
