import { CalendarIcon, GraphIcon, PendingIcon } from "../../components/common/icons";
import { useTranslation } from "react-i18next";

const CardEarning: React.FC<{ earningStats: any }> = ({ earningStats }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-3 mx-2 mt-4">
        <div
          className="rounded-xl p-4 mb-3 w-full"
          style={{
            background: "linear-gradient(180deg, #EDEDED 0%, #00FF94 100%)",
            borderRadius: "22px",
            padding: "2px",
          }}
        >
          <div
            className="rounded-lg bg-white p-4 h-full"
            style={{
              borderRadius: "20px",
            }}
          >
            <div>
              <div className="text-md flex items-center gap-2 font-semibold">
                <span>
                  <GraphIcon />
                </span>
                {t("earnings.cards.totalEarnings")}
              </div>
              <div className="text-2xl font-extrabold text-[#159B62] mt-3">SAR {earningStats?.total?.net_earning || 0}</div>
            </div>
          </div>
        </div>

        <div
          className="rounded-xl p-4 mb-3 w-full"
          style={{
            background: "linear-gradient(180deg, #EDEDED 0%, #00FF94 100%)",
            borderRadius: "22px",
            padding: "2px",
          }}
        >
          <div
            className="rounded-lg bg-white p-4 h-full"
            style={{
              borderRadius: "20px",
            }}
          >
            <div>
              <div className="text-md flex items-center gap-2 font-semibold">
                <span>
                  <CalendarIcon />
                </span>
                {t("earnings.cards.thisMonth")}
              </div>
              <div className="text-2xl font-extrabold text-[#159B62] mt-3">
                SAR {earningStats?.this_month?.net_earning || 0}
              </div>
            </div>
          </div>
        </div>

        <div
          className="rounded-xl p-4 mb-3 w-full"
          style={{
            background: "linear-gradient(180deg, #EDEDED 0%, #00FF94 100%)",
            borderRadius: "22px",
            padding: "2px",
          }}
        >
          <div
            className="rounded-lg bg-white p-4 h-full"
            style={{
              borderRadius: "20px",
            }}
          >
            <div>
              <div className="text-md flex items-center gap-2 font-semibold">
                <span>
                  <PendingIcon />
                </span>
                {t("earnings.cards.pendingPaymentsToCollect")}
              </div>
              <div className="text-2xl font-extrabold text-[#159B62] mt-3">
                SAR {earningStats?.pending?.net_earning || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardEarning;
