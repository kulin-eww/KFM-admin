import { GraphIcon, InfoIcon } from "../../components/common/icons";
import { useTranslation } from "react-i18next";

const CardPenalty: React.FC<{ penaltyStats: any }> = ({ penaltyStats }) => {
  const { t } = useTranslation();
  return (
    <>
      <div
        className="rounded-xl p-4 mb-3 mx-2"
        style={{
          background: "linear-gradient(180deg, #EDEDED 0%, #00FF94 100%)",
          borderRadius: "22px",
          padding: "2px",
        }}
      >
        <div
          className="rounded-lg bg-white p-4"
          style={{
            borderRadius: "20px",
          }}
        >
          <div className="flex items-center gap-2 text-[13px] text-[#6B6F76] mb-3">
            <span>
              <InfoIcon className="h-5" />
            </span>
            {t("penaltyPayment.card.note")}
          </div>
          <div>
            <div className="text-[13px] flex items-center gap-2 font-semibold">
              <span>
                <GraphIcon />
              </span>
              {t("penaltyPayment.card.totalPenalties")}
            </div>
            <div className="text-[22px] sm:text-[24px] font-extrabold text-[#159B62] mt-1">
              SAR {penaltyStats?.total_penalty_amount}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPenalty;
