import React from "react";
import useCountUp from "../../hooks/useCountUp";

export type StateCardType = "green" | "purple" | "orange" | "coral" | "maroon";

interface StateCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  type?: StateCardType;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  isLoading?: boolean;
}

const StateCard: React.FC<StateCardProps> = ({
  title,
  value,
  icon,
  type = "green",
  buttonText,
  onButtonClick,
  className = "",
  isLoading = false,
}) => {
  const numberGradientClass = `state-card-${type}-number`;

  const gradientClass = `state-card-${type}`;

  const animatedValue = useCountUp(isLoading ? null : value, { duration: 1000 });

  return (
    <div
      className={`rounded-xl bg-[#F5F5E8] p-4 h-full flex flex-col shadow-sm ${className} flex items-center justify-center`}
    >
      {/* Number Display Section with Gradient Border */}
      <div className={`rounded-lg p-[2px]  w-[70%]  ${gradientClass} mb-3`}>
        <div className={`rounded-lg ${numberGradientClass} p-6 flex items-center justify-center min-h-[100px]`}>
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
      </div>

      {/* Title Section in Small Gradient Border Square */}
      <div
        className={`px-10 py-4 rounded-full text-white font-semibold text-xl bg-gradient-to-b from-indigo-400 to-indigo-600
        ${numberGradientClass}
          border-3 border-${type}-500
         shadow-[inset_0_8px_20px_rgba(0,0,0,0.35)]
         transition-all duration-300
         hover:shadow-none hover:brightness-110
         w-full
         text-center
         `}
      >
        <div className="text-2xl font-bold text-white">{title}</div>
      </div>

      {/* Optional Button */}
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="w-full py-3 px-4 purple-gradient-btn text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-sm mt-auto"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default StateCard;
