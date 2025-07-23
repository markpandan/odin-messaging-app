const ButtonElement = ({ disabled, onClick, children }) => {
  return (
    <button
      className={`
        cursor-pointer rounded-2xl bg-[var(--accent-color)] px-4 py-2
        hover:not-disabled:bg-[var(--accent-hover-color)]
        disabled:opacity-50
      `}
      onClick={onClick}
      disabled={disabled || false}
    >
      {children}
    </button>
  );
};

export default ButtonElement;
