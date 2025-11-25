import { useNavigate } from "react-router-dom";
import {
  DashboardTotalContainers,
  DashbaoardPendingBookings,
  DashboardTotalExpiredLicense,
} from "../../components/common/icons";
import { useTranslation } from "react-i18next";

const Container: React.FC<{ data: any }> = ({ data }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm col-span-2">
      <div className="text-lg font-medium text-text-primary">{t("dashboard.container")}</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
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
                  <DashboardTotalContainers />
                </span>
                {t("dashboard.total")}
              </div>
              <div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{data?.totalContainers}</div>
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
                  <DashboardTotalExpiredLicense />
                </span>
                {t("dashboard.rented")}
              </div>
              <div className="text-lg font-extrabold text-[#159B62] mt-3">{data?.rentedContainers}</div>
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
                  <DashbaoardPendingBookings />
                </span>
                {t("dashboard.empty")}
              </div>
              <div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{data?.emptyContainers}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
