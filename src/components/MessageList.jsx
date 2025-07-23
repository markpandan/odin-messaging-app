import React from "react";

const MessageItem = ({ fullname, message, onClick }) => {
  const [firstname, lastname] = fullname;
  return (
    <div
      className={`
        h-max cursor-pointer rounded-2xl border-[var(--secondary-color)] p-4 select-none
        hover:bg-[var(--primary-hover-color)]
        focus:bg-[var(--accent-color)]
      `}
      tabIndex={1}
      onClick={onClick}
    >
      <h1 className="mb-2 text-xl font-bold">{`${firstname} ${lastname}`}</h1>
      {message ? (
        <p className="line-clamp-1 text-sm">{message}</p>
      ) : (
        <p className="line-clamp-1 text-sm text-zinc-600 italic">
          {"< Empty >"}
        </p>
      )}
    </div>
  );
};

export default MessageItem;
