import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm z-20 flex justify-center items-center text-sm shadow-md">
      <ReactLoading type={"spin"} color={"#03fc4e"} height={100} width={100} />
    </div>
  );
};

export default Loading;
