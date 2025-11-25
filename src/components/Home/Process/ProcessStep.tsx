import React from "react";
import BoxShadow from "../../../assets/images/home/box-shadow.svg";

interface ProcessStepProps {
  icon: React.ReactNode;
  iconAlt: string;
  title: string;
  description: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ icon, iconAlt, title, description }) => {
  return (
    <div className="relative overflow-hidden border border-border-primary hover:!border-transparent rounded-2xl p-4 hover:bg-primary group cursor-pointer transition-colors duration-300 ease-in-out">
      <div className="border border-border-primary transform scale-110 rounded-2xl overflow-hidden absolute z-10 inset-0 top-0 start-0 bottom-0 end-0 opacity-0 w-full h-full block group-hover:opacity-100">
        <img src={BoxShadow} alt="box-shadow" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-20">
      <div className="w-12 h-12 xl:mb-20 md:mb-6 mb-4 bg-primary rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white">
        <div 
          className="transition-all duration-300 brightness-0 invert group-hover:text-primary group-hover:brightness-100 group-hover:invert-0" aria-label={iconAlt}>
            {icon}
          </div>
      </div>
      <h3 className="text-[22px]/tight font-bold text-primary xl:mb-4 md:mb-3 mb-2 transition-all duration-300 group-hover:text-white line-clamp-1">
        {title}
      </h3>
      <p className="text-[#363636] text-sm/normal leading-relaxed transition-all duration-300 group-hover:text-white line-clamp-4">{description}</p>
    </div></div>
  );
};

export default ProcessStep;
