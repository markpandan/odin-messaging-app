import React from "react";

const MessageBalloon = ({ origin, children }) => {
  const messageOrigin = {
    self: `float-right max-w-2xl rounded-2xl bg-[var(--accent-color)] p-4
           selection:bg-[var(--accent-hover-color)]`,
    others: "float-left max-w-2xl rounded-2xl bg-[var(--tertiary-color)] p-4",
  };

  return (
    <div>
      <div className={messageOrigin[origin]}>{children}</div>
    </div>
  );
};

export default MessageBalloon;
