import React from "react";

const Loading = () => {
  let circleCommonClasses = "h-2.5 w-2.5 bg-current rounded-full";

  return (
    <div className="flex justify-center items-center mt-10">
      <div className={`${circleCommonClasses} mr-1`}></div>
      <div className={`${circleCommonClasses} mr-1`}></div>
      <div className={`${circleCommonClasses}`}></div>
    </div>
  );
};

export default Loading;
