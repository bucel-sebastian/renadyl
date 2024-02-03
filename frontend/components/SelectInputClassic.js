"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaTimes, FaAngleDown } from "react-icons/fa";

function SelectInputClassic({
  data,
  value,
  name,
  placeholder,
  onChange,
  // onClear,
  disabled = false,
  required = false,
}) {
  const dataArray = Object.entries(data);

  const componentRef = useRef(null);

  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value); // Update the local state when the 'value' prop changes
  }, [value]);

  const [isFocused, setIsFocused] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const handleInputChange = (event) => {
    // console.log(event.target.value);
    setInputValue(event.target.value);
  };

  const handleSelectFromOptions = (event) => {
    setInputValue(event.currentTarget.dataset.value);
    setIsFocused(false);
    onChange(
      event.currentTarget.dataset.key,
      event.currentTarget.dataset.value
    );
  };

  const handleResetInput = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // onClear;
    setInputValue("");
    onChange("", "");
  };

  const handleFocus = (event) => {
    if (!isFocused && !disabled) {
      setIsFocused(true);
    }
  };

  const handleInputFocus = (event) => {
    if (!inputFocused) {
      setInputFocused(true);
    }
  };

  const handleInputBlur = (event) => {
    if (inputFocused) {
      setInputFocused(false);
    }
  };

  const checkIfInData = (input) => {
    for (const value of Object.values(data)) {
      if (String(value).toLowerCase().includes(String(input).toLowerCase())) {
        return 1;
      }
    }
    return 0;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        if (!inputFocused) {
          setIsFocused(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <div className="w-full relative" onClick={handleFocus} ref={componentRef}>
      <div className="w-full relative flex flex-row items-center content-center">
        <input
          className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 w-full "
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          disabled={disabled}
          name={name}
          autoComplete="new-password"
          required={required}
          readOnly={true}
          // onClick={handlSelectInputClassicFocus}
        />
        {inputValue !== "" ? (
          <button
            className="absolute right-8 text-foregroundPrimary"
            onClick={handleResetInput}
          >
            <FaTimes />
          </button>
        ) : (
          ""
        )}

        <FaAngleDown className="absolute right-2" />
      </div>
      <div
        className={`absolute z-50 bg-backgroundPrimary flex-col w-full items-start mt-2 border-[1px] rounded-md border-foregroundPrimary40 shadow-md overflow-auto max-h-[220px] ${
          isFocused ? "flex" : "hidden"
        }`}
      >
        {dataArray.map(([key, value]) => (
          <button
            key={key}
            data-value={value}
            data-key={key}
            type="button"
            onClick={handleSelectFromOptions}
            className="w-full text-left px-4 py-1 hover:bg-gradientPurple hover:text-backgroundPrimary hover:rounded-md border-b-[1px] border-foregroundSecondary20"
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectInputClassic;
