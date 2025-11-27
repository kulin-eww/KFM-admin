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
    <div className={`rounded-xl bg-[#F5F5E8] p-4 h-full flex flex-col shadow-sm ${className}`}>
      {/* Number Display Section with Gradient Border */}
      <div className={`rounded-lg p-[2px] ${gradientClass} mb-3`}>
        <div className={`rounded-lg ${numberGradientClass} p-6 flex items-center justify-center min-h-[100px]`}>
          <div className="text-5xl font-extrabold text-[#4A4A4A]">{animatedValue}</div>
        </div>
      </div>

      {/* Title Section in Small Gradient Border Square */}
      <div className={`rounded-lg p-[2px] ${gradientClass} mb-3`}>
        <div className="rounded-lg bg-white p-3 flex items-center justify-center">
          <div className="text-sm font-semibold text-[#7364FF]">{title}</div>
        </div>
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
