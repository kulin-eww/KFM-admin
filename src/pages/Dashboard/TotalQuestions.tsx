import { useNavigate } from "react-router-dom";
import { ChevronRight } from "../../components/common/icons";
import { useTranslation } from "react-i18next";
import { SlQuestion } from "react-icons/sl";
import { TbCircleNumber1 } from "react-icons/tb";
import { LiaUserSecretSolid } from "react-icons/lia";

const TotalQuestions: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="text-lg font-medium text-text-primary">Questions</div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
          <div
            className="rounded-xl p-4 mb-3 w-full"
            style={{
              background: "linear-gradient(0deg, #91A459 0%, #C3DC78 100%)",
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
                  <span className="flex items-center justify-center rounded-lg bg-[#e4f7ec] w-8 h-8">
                    <SlQuestion className="text-xl text-[#159B62]" />
                  </span>
                  <span>Total</span>
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{96}</div>
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
              background: "linear-gradient(0deg, #91A459 0%, #C3DC78 100%)",
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
                  <span className="flex items-center justify-center rounded-lg bg-[#e4f7ec] w-8 h-8">
                    <TbCircleNumber1 className="text-xl text-[#159B62]" />
                  </span>
                  <span>1000-point</span>
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{50}</div>
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
              background: "linear-gradient(0deg, #91A459 0%, #C3DC78 100%)",
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
                  <span className="flex items-center justify-center rounded-lg bg-[#e4f7ec] w-8 h-8">
                    <LiaUserSecretSolid className="text-xl text-[#159B62]" />
                  </span>
                  <span>Mystery wildcard</span>
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{47}</div>
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
        </div>
      </div>
    </>
  );
};

export default TotalQuestions;
