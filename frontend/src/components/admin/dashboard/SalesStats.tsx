import React from "react";

const SalesStats = () => {
  return (
    <div className="w-full px-8 pt-4 pb-8 flex gap-8 justify-center items-center my-8">
      <div className="bg-[#3b82f6] w-full p-6 rounded text-center text-2xl">
        <span className="block font-semibold dark:text-neutral-900">
          Orders
        </span>
        <span className="block font-semibold dark:text-neutral-900">169</span>
      </div>
      <div className="bg-[#10b981] w-full p-6 rounded text-center text-2xl">
        <span className="block font-semibold dark:text-neutral-900">Sales</span>
        <span className="block font-semibold dark:text-neutral-900">
          $16,645.50
        </span>
      </div>
    </div>
  );
};

export default SalesStats;
