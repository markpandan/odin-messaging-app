import React from "react";

const InputField = ({
  type = "text",
  label,
  fieldName,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <div>
      <label htmlFor={fieldName}>{label}</label>
      <div className="mt-2">
        <input
          type={type}
          name={fieldName}
          id={fieldName}
          autoComplete="off"
          placeholder={placeholder || ""}
          onChange={onChange}
          value={value}
          className={`
            block w-full rounded-md bg-[var(--primary-color)] px-3 py-1.5 text-sm/6
            text-[var(--text-color)] shadow-md outline-1 -outline-offset-1 outline-gray-300
            placeholder:text-gray-400
            focus:bg-white focus:text-gray-900 focus:outline-2 focus:-outline-offset-2
            focus:outline-[var(--accent-color)]
          `}
        />
      </div>
    </div>
  );
};

export default InputField;
