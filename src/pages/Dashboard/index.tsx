import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { getDashboardDetailsAPI } from "../../api/dashboard";
import TotalStats from "./TotalStats";
import TotalQuestions from "./TotalQuestions";
import DateRangeInput from "../../components/input/DateRangeInput";
import { useState } from "react";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const handleGetDashboardDetails = useQuery({
    queryKey: ["getDashboardDetails"],
    queryFn: () => {
      return getDashboardDetailsAPI();
    },
  });
  const [containerDateRange, setContainerDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-end">
          <DateRangeInput
            range={containerDateRange}
            setRange={setContainerDateRange}
            disablePastDates={false}
            disabled={false}
          />
        </div>
        <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          <TotalStats data={handleGetDashboardDetails?.data?.data?.overView} />
          <TotalQuestions data={handleGetDashboardDetails?.data?.data?.overView} />
        </div>

        {/* <div className="gap-4">
          <BookingOverview />
        </div> */}
      </div>
    </>
  );
};

export default Dashboard;
