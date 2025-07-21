const FloatingContainer = ({ children, width = "lg", align = "center" }) => {
  const containerWidth = {
    lg: "w-lg",
    "2xl": "w-2xl",
    "4xl": "w-4xl",
  };

  const horizontalAlignment = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  };

  return (
    <div
      className={`
        flex grow flex-col items-center py-8
        ${horizontalAlignment[align]}
      `}
    >
      <div
        className={`
          ${containerWidth[width]}
          rounded-2xl border-1 border-[var(--secondary-color)] p-4 text-center shadow-md
          shadow-(color:--accent-color)/50
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default FloatingContainer;
