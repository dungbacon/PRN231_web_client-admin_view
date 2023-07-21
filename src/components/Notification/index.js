import React from "react";
import { useContext } from "react";
import NotificationContext from "../../context/NotificationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function Notification() {
  const { showNotification, type, message } = useContext(NotificationContext);

  return (
    <>
      {showNotification && (
        <div className="fixed top-0 right-4 p-2 m-4 z-30">
          <div className="flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rounded-lg shadow ">
            {type === "success" && (
              <FontAwesomeIcon
                className="w-[20px] h-[20px]"
                color="green"
                icon={icon({ name: "check-circle" })}
              />
            )}
            {type === "error" && (
              <FontAwesomeIcon
                className="w-[20px] h-[20px]"
                color="red"
                icon={icon({ name: "xmark-circle" })}
              />
            )}
            {type === "warning" && (
              <FontAwesomeIcon
                className="w-[20px] h-[20px]"
                color="orange"
                icon={icon({ name: "warning" })}
              />
            )}
            <div className="pl-4 text-sm font-normal">{message}</div>
          </div>
          {/* {type === "success" && <p className="text-green-500">{message}</p>}
          {type === "error" && <p className="text-red-500">{message}</p>}
          {type === "warning" && <p className="text-yellow-500">{message}</p>} */}
        </div>
      )}
    </>
  );
}

export default Notification;
