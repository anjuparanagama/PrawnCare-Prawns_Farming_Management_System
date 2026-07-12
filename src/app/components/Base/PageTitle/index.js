"use client";

import { FaRegCalendarAlt, FaDownload } from "react-icons/fa";

export const Header = ({
  title = "Default Title",
  Download,
  ButtonTitle,
  ButtonText = "Download PDF",
  DateRange,
}) => {
  return (
    <div className="flex justify-between sm:mb-3">
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold text-blue-900">
          {title}
        </h1>
      </div>
      {Download && (
        <div>
          <button
            onClick={Download}
            className="border border-gray-300 px-3 py-2 rounded-md text-xs sm:text-sm flex items-center gap-2 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
          >
            <FaDownload className="text-gray-600 text-xs sm:text-sm" />
            <span className="font-medium">{ButtonText}</span>
          </button>
        </div>
      )}
      {/*       {DateRange && (
        <div className="flex flex-row gap-2 sm:gap-3 lg:gap-2 items-center">
          <button
            onClick={DateRangeCalender}
            className="border border-gray-300 px-3 py-2 rounded-md text-xs sm:text-sm flex items-center gap-2 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
          >
            <FaRegCalendarAlt className="text-gray-600 text-xs sm:text-sm" />
            <span className="font-medium">{formattedRange}</span>
          </button>
        </div>
      )} */}
    </div>
  );
};
