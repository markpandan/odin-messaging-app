const FloatingContainer = ({ children }) => {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div
        className={`
          w-lg rounded-2xl p-4 text-center shadow-md
          shadow-(color:--accent-color)/50
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default FloatingContainer;
