import { useTranslation } from "react-i18next";
import StateCard from "../../components/common/StateCard";

const TotalQuestions: React.FC<{ data: any; isLoading?: boolean }> = ({ data, isLoading = false }) => {
  const { t } = useTranslation();
  return (
    <div className="w-[40%]">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="text-2xl font-bold text-[#7364FF] mb-4">Questions</div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
          <StateCard title="Total" value={96} type="green" isLoading={isLoading} />
          <StateCard
            title="1000-point"
            value={50}
            type="purple"
            className="col-span-2 md:col-span-1"
            isLoading={isLoading}
          />
          <StateCard
            title="Mystery wildcard"
            value={47}
            type="coral"
            className="col-span-2 md:col-span-1"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default TotalQuestions;
