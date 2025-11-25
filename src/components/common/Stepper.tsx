import React from "react";
import Checked from "../../assets/icons/common/checked.svg?react";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full
                ${index < currentStep ? <Checked className="" /> : "bg-gray-300"}`}
            >
              {index < currentStep && <Checked className="w-6 h-6" />}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-2 self-center -ml-px -mr-px bg-gray-300 overflow-hidden">
              <div
                className="h-2 bg-primary transition-[width] duration-500 ease-in-out"
                style={{ width: index < currentStep - 1 ? "100%" : "0%" }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
