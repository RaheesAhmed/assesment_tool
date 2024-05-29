import React, { useState } from "react";
import styles from "./TextQuestion.module.css";

export const ThresHoldQuestion = ({
  id,
  question,
  name,
  handleChange,
  description,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    handleChange({ target: { name, value } });
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.card} w-full rounded-lg`}>
        <div className="mb-6">
          <label
            htmlFor={id}
            className={`${styles.label} block text-2xl font-medium mb-2`}
          >
            {question}
          </label>
          <p className={`${styles.description} text-xl mb-4`}>{description}</p>
          <div className="flex items-start flex-col">
            <div
              className={`cursor-pointer p-4 border rounded-md transition-opacity duration-300 mb-2 ${
                selectedOption === true
                  ? "bg-blue-100 border-blue-500 animate-fadeIn"
                  : "border-gray-300"
              }`}
              onClick={() => handleOptionChange(true)}
            >
              <span>
                Jump right in{" "}
                <em>(I don't care how it works as long as it helps me)</em>
              </span>
            </div>
            <div
              className={`cursor-pointer p-4 border rounded-md transition-opacity duration-1000 ${
                selectedOption === false
                  ? "bg-blue-100 border-blue-500 animate-fadeIn"
                  : "border-gray-300"
              }`}
              onClick={() => handleOptionChange(false)}
            >
              <span>
                I wanna know a bit more <em>(I like to know what to expect)</em>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
