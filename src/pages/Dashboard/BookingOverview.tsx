import { Line } from "react-chartjs-2";
import { getDashboardDetailsChartsAPI } from "../../api/dashboard";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// const bookingsOverviewData = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//   datasets: [
//     {
//       label: "Bookings",
//       data: [20, 35, 45, 30, 55, 40, 60, 50, 70, 45, 80, 65],
//       borderColor: "#16a34a",
//       backgroundColor: "rgba(22, 163, 74, 0.1)",
//       tension: 0.4,
//       pointRadius: 0,
//       pointHoverRadius: 6,
//     },
//     {
//       label: "Previous Period",
//       data: [15, 25, 35, 25, 40, 30, 45, 35, 55, 35, 60, 50],
//       borderColor: "#22c55e",
//       backgroundColor: "rgba(34, 197, 94, 0.1)",
//       tension: 0.4,
//       pointRadius: 0,
//       pointHoverRadius: 6,
//     },
//   ],
// };

// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: { display: false },
//     tooltip: {
//       backgroundColor: "rgba(0, 0, 0, 0.8)",
//       titleColor: "white",
//       bodyColor: "white",
//       borderColor: "#16a34a",
//       borderWidth: 1,
//       callbacks: {
//         title: () => "15 Dec 2024",
//         label: () => "SAR 59,492.10",
//       },
//     },
//   },
//   scales: {
//     x: {
//       grid: { display: false },
//       ticks: { color: "#6b7280" },
//     },
//     y: {
//       grid: { color: "#f3f4f6" },
//       ticks: {
//         color: "#6b7280",
//         stepSize: 20,
//         max: 100,
//       },
//     },
//   },
//   interaction: {
//     intersect: false,
//     mode: "index" as const,
//   },
// };

const BookingOverview = () => {
  const {t} = useTranslation()
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const handleGetDashboardDetailsCharts = useQuery({
    queryKey: ["getDashboardDetailsCharts", selectedYear],
    queryFn: () => {
      return getDashboardDetailsChartsAPI({ year: selectedYear.toString() });
    },
  });

  const bookingsOverviewData = {
    labels: handleGetDashboardDetailsCharts?.data?.data?.map((item) => item.month),
    datasets: [
      {
        label: "Matches",
        data: handleGetDashboardDetailsCharts?.data?.data?.map((item) => item.total_booking),
        borderColor: "#16a34a",
        backgroundColor: "rgba(22, 163, 74, 0.1)",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "#16a34a",
        borderWidth: 1,
        callbacks: {
          title: (tooltipItems: any) => {
            const index = tooltipItems[0].dataIndex;
            return handleGetDashboardDetailsCharts?.data?.data?.[index]?.month; // show month
          },
          label: (tooltipItem: any) => {
            const index = tooltipItem.dataIndex;
            return `${handleGetDashboardDetailsCharts?.data?.data?.[index]?.total_amount.toLocaleString()}`; // show amount
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280" },
      },
      y: {
        grid: { color: "#f3f4f6" },
        ticks: {
          color: "#6b7280",
          stepSize: 20,
          max: 100,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  const currentYear = dayjs().year(); // current year from dayjs
  const startYear = 2020;
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-text-primary">{t("dashboard.bookingsOverview")}</h2>
          <select
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="h-132 overflow-x-auto">
          <div className="min-w-[600px] h-full">
            <Line data={bookingsOverviewData} options={chartOptions} />
          </div>
        </div>
      </div>
  );
};

export default BookingOverview;
