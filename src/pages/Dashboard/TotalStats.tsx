import { useNavigate } from "react-router-dom";
import { ChevronRight } from "../../components/common/icons";
import { useTranslation } from "react-i18next";
import { GiMoneyStack } from "react-icons/gi";
import { TbCategory } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { CgGames } from "react-icons/cg";

const TotalStats: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="text-lg font-medium text-text-primary">Stats</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div
            className="rounded-xl p-4 mb-3 w-full col-span-2"
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
                    <GiMoneyStack className="text-xl text-[#159B62]" />
                  </span>
                  <span>Total Revenue</span>
                </div>
                <div className="text-lg  font-extrabold text-[#159B62] mt-3">{"10,000"}</div>
                <div
                  className="text-sm text-ts flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/past-booking")}
                >
                  See Details
                  <span>
                    <ChevronRight className="text-ts rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="rounded-xl p-4 mb-3 w-full col-span-2"
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
                    <TbCategory className="text-xl text-[#159B62]" />
                  </span>
                  <span>Total Categories</span>
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{15}</div>
                <div
                  className="text-sm text-ts flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/past-booking")}
                >
                  See Details
                  <span>
                    <ChevronRight className="text-ts rtl:rotate-180" />
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
                    <FiUsers className="text-xl text-[#159B62]" />
                  </span>
                  <span>Total Players</span>
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{999}</div>
                <div
                  className="text-sm text-ts flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/all-booking")}
                >
                  See Details
                  <span>
                    <ChevronRight className="text-ts rtl:rotate-180" />
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
                    <CgGames className="text-xl text-[#159B62]" />
                  </span>
                  <span>Total Games Played</span>
                </div>
                <div className="text-lg font-extrabold text-[#159B62] mt-3">{5}</div>
                <div
                  className="text-sm text-ts flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/cancelled-booking")}
                >
                  See Details
                  <span>
                    <ChevronRight className="text-ts rtl:rotate-180" />
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

export default TotalStats;
