import React from "react";

const StepIndicator = ({ completedSteps }) => {
  return (
    <div className="steps">
      <p className={completedSteps.includes(1) ? "completed" : "uncompleted"}>
        1
      </p>
      <span
        style={{
          background: completedSteps.includes(2) ? "#4A3AFF" : "#EFF0F6",
        }}
      ></span>
      <p className={completedSteps.includes(2) ? "completed" : "uncompleted"}>
        2
      </p>
      <span
        style={{
          background: completedSteps.includes(3) ? "#4A3AFF" : "#EFF0F6",
        }}
      ></span>
      <p className={completedSteps.includes(3) ? "completed" : "uncompleted"}>
        3
      </p>
      <span
        style={{
          background: completedSteps.includes(4) ? "#4A3AFF" : "#EFF0F6",
        }}
      ></span>
      <p className={completedSteps.includes(4) ? "completed" : "uncompleted"}>
        4
      </p>
    </div>
  );
};

export default StepIndicator;
