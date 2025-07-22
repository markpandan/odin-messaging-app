import React from "react";

const MessageList = ({ fullname, message, onClick }) => {
  const [firstname, lastname] = fullname;
  return (
    <div
      className={`
        h-30 cursor-pointer rounded-2xl border-[var(--secondary-color)] p-4 select-none
        hover:bg-[var(--primary-hover-color)]
        focus:bg-[var(--accent-color)]
      `}
      tabIndex={1}
      onClick={onClick}
    >
      <h1 className="mb-2 text-xl font-bold">{`${firstname} ${lastname}`}</h1>
      <p className="line-clamp-2 text-sm">{message}</p>
    </div>
  );
};

export default MessageList;
