import React from "react";
import useCountUp from "../../hooks/useCountUp";

interface StatsCardProps {
  title: string;
  value: string | number;
  bottomIcons?: React.ReactNode[];
  className?: string;
  isLoading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, bottomIcons, className = "", isLoading = false }) => {
  const animatedValue = useCountUp(isLoading ? null : value, { duration: 1000 });

  return (
    <div className={`rounded-xl bg-[#E8E8F0] p-0 overflow-hidden shadow-lg ${className}`}>
      {/* Purple Banner */}
      <div className="bg-gradient-to-r from-[#453C99] to-[#7364FF] px-4 py-3 rounded-t-xl">
        <h3
          className="text-white font-bold text-base text-center"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
        >
          {title}
        </h3>
      </div>

      {/* Main Content Area with Large Number */}
      <div className="bg-[#E8E8F0] px-4 py-8 flex items-center justify-center min-h-[120px]">
        <div
          className="text-5xl font-extrabold text-white"
          style={{
            textShadow: "2px 2px 4px rgba(0,0,0,0.3), 0 0 8px rgba(0,0,0,0.1)",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
          }}
        >
          {animatedValue}
        </div>
      </div>

      {/* Bottom Icons Bar */}
      {bottomIcons && bottomIcons.length > 0 && (
        <div className="bg-[#D8D8E8] px-4 py-3 rounded-b-xl flex items-center justify-around">
          {bottomIcons.map((icon, index) => (
            <div key={index} className="flex items-center justify-center">
              {icon}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
