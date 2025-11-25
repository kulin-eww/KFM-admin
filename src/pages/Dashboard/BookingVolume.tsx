import { Line } from "react-chartjs-2";

const bookingsVolumeData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Volume 1",
      data: [25, 40, 50, 35, 60, 45, 65, 55, 75, 50, 85, 70],
      borderColor: "#f97316",
      backgroundColor: "rgba(249, 115, 22, 0.1)",
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 6,
    },
    {
      label: "Volume 2",
      data: [30, 45, 55, 40, 65, 50, 70, 60, 80, 55, 90, 75],
      borderColor: "#ef4444",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 6,
    },
    {
      label: "Volume 3",
      data: [20, 35, 45, 30, 55, 40, 60, 50, 70, 45, 80, 65],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 6,
    },
  ],
};

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
        title: () => "15 Dec 2024",
        label: () => "SAR 59,492.10",
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

const BookingVolume = () => {
  return (
    <>
      <div className=" bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Bookings Volume</h2>
          <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Daily</option>
          </select>
        </div>
        <div className="h-64">
          <Line data={bookingsVolumeData} options={chartOptions} />
        </div>
      </div>
    </>
  );
};

export default BookingVolume;
