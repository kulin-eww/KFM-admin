import { useNavigate } from "react-router-dom";
import {
  BookingRenewalIcon,
  ChevronRight,
  DashboardBookingRenewalRequestIcon,
  DashboardEarningIcon,
  DashboardGraceIcon,
  DashboardReplacementIcon,
  DashboardRequest,
  GraphIcon,
} from "../../components/common/icons";
import { useTranslation } from "react-i18next";

const Earnings: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="text-lg font-medium text-text-primary"> {t("dashboard.earnings")}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
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
                    <GraphIcon />
                  </span>
                  {t("dashboard.thisMonth")}
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{data?.thisMonthEarning}</div>
                <div
                  className="text-sm text-secondary flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/earnings")}
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
              <div>
                <div className="text-sm flex items-center gap-2 font-semibold">
                  <span>
                    <DashboardEarningIcon />
                  </span>
                  {t("dashboard.totalEarnings")}
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{data?.totalEarning}</div>
                <div
                  className="text-sm text-secondary flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/earnings")}
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
        <div className="text-lg font-medium text-text-primary">{t("dashboard.request")}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
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
                    <DashboardRequest />
                  </span>
                  <span>{t("dashboard.removal")}</span>
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{data?.totalEarlyPickupRequest}</div>
                <div
                  className="text-sm text-secondary flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/booking-request?active=removal")}
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
              <div>
                <div className="text-sm flex items-center gap-2 font-semibold">
                  <span>
                    <DashboardBookingRenewalRequestIcon />
                  </span>
                  <span>{t("dashboard.renewal")}</span>
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{data?.totalRenewalContractRequest}</div>
                <div
                  className="text-sm text-secondary flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/booking-request?active=booking_renewal")}
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
            className="rounded-xl py-4 px-2 mb-3 w-full"
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
                    <DashboardGraceIcon />
                  </span>
                  <span>{t("dashboard.grace")}</span>
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{data?.totalGracePeriodRequest}</div>
                <div
                  className="text-sm text-secondary flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/booking-request?active=grace_period")}
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
              className="rounded-lg bg-white py-4 px-2 h-full"
              style={{
                borderRadius: "12px",
              }}
            >
              <div>
                <div className="text-sm flex items-center gap-2 font-semibold">
                  <span>
                    <DashboardReplacementIcon />
                  </span>
                  <span>{t("dashboard.replacement")}</span>
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{data?.totalReplaceMentRequest}</div>
                <div
                  className="text-sm text-secondary flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/booking-request?active=replacement")}
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

export default Earnings;
