import React from "react";

const MessageList = () => {
  return (
    <div
      className={`
        h-30 cursor-pointer rounded-2xl border-[var(--secondary-color)] p-4 select-none
        hover:bg-[var(--primary-hover-color)]
        focus:bg-[var(--accent-color)]
      `}
      tabIndex={1}
    >
      <h1 className="mb-2 text-xl font-bold">Name</h1>
      <p className="line-clamp-2 text-sm">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit ab
        natus iure placeat voluptas aliquid tempora nesciunt, omnis possimus
        distinctio illum sit beatae atque aut sequi enim dolorem expedita ut?
      </p>
    </div>
  );
};

export default MessageList;
