import { useTranslation } from "react-i18next";
import StatsCard from "../../components/common/StatsCard";

const TotalStats: React.FC<{ data: any; isLoading?: boolean }> = ({ data, isLoading = false }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="text-2xl font-bold text-[#7364FF] mb-4">Stats</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <StatsCard title="Total Revenue" value="10,000" className="col-span-2" isLoading={isLoading} />
          <StatsCard title="Total Categories" value={15} className="col-span-2" isLoading={isLoading} />
          <StatsCard title="Total Players" value={999} className="col-span-2 md:col-span-1" isLoading={isLoading} />
          <StatsCard title="Total Games Played" value={5} className="col-span-2 md:col-span-1" isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default TotalStats;
