const MessageItem = ({ fullname, message, onClick, selected }) => {
  const [firstname, lastname] = fullname;
  const selectStyle = selected
    ? `h-max cursor-pointer rounded-2xl p-4 select-none border-[var(--secondary-color)]
        bg-[var(--accent-color)] hover:bg-[var(--accent-hover-color)]`
    : `h-max cursor-pointer rounded-2xl border-[var(--secondary-color)] p-4 select-none
        hover:bg-[var(--primary-hover-color)]`;

  return (
    <div className={selectStyle} onClick={onClick}>
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
