import React from "react";

const SectionTitle = ({ text }) => {
  return (
    <div className="border-b border-base-300 pb-5 dark:border-zinc-800">
      <h2 className="text-3xl font-medium tracking-wide capitalize dark:text-zinc-300">
        {text}
      </h2>
    </div>
  );
};

export default SectionTitle;
