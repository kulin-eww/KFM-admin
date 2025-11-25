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
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { getDashboardDetailsAPI } from "../../api/dashboard";
import Reminder from "./Reminder";
import Earnings from "./Earnings";
import TotalBookings from "./TotalBookings";
import BookingOverview from "./BookingOverview";
import BookingVolume from "./BookingVolume";
import Driver from "./Driver";
import { useState } from "react";
import ReminderDialog from "./ReminderDialog";
import ViolationDialog from "./ViolationDialog";
import Container from "./Container";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [showViolationDialog, setShowViolationDialog] = useState(false);
  const handleGetDashboardDetails = useQuery({
    queryKey: ["getDashboardDetails"],
    queryFn: () => {
      return getDashboardDetailsAPI();
    },
  });

  return (
    <>
      <div className="space-y-6 min-h-screen">
        {/* Demo Notification Button - Remove this in production */}
        {/* <div className="flex justify-end">
        <button
          onClick={testNotifications}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
        >
          Test Notifications
        </button>
      </div> */}
        {/* Top Section: Bookings Overview + Earnings */}
        <Reminder data={handleGetDashboardDetails?.data?.data?.notifications} />
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          <Earnings data={handleGetDashboardDetails?.data?.data?.overView} />
          <TotalBookings data={handleGetDashboardDetails?.data?.data?.overView} />
          <Driver data={handleGetDashboardDetails?.data?.data?.overView} />
          <Container data={handleGetDashboardDetails?.data?.data?.overView} />
        </div>

        <div className="gap-4">
          <BookingOverview />
          {/* <BookingVolume /> */}
        </div>
      </div>
      <ReminderDialog showReminderDialog={showReminderDialog} setShowReminderDialog={setShowReminderDialog} />
      <ViolationDialog showViolationDialog={showViolationDialog} setShowViolationDialog={setShowViolationDialog} />
    </>
  );
};

export default Dashboard;
