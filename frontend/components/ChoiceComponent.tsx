import React, { useState } from "react";
import styles from "./TextQuestion.module.css";

export const ChoiceComponent = ({
  id,
  question,
  name,
  handleChange,
  description,
  description2,
  choiceText,
}) => {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    handleChange({ target: { name, value, question: description } });
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
          <br />
          <p className={`${styles.description} text-xl mb-4`}>{choiceText}</p>
          <br />
          {/* <p className={`${styles.description} text-xl mb-4`}>{description2}</p> */}

          <div className="flex items-center gap-5">
            {[1, 2, 3, 4, 5].map((circle) => (
              <div>
                <div
                  key={circle}
                  className={`cursor-pointer w-12 h-12 rounded-full border transition-opacity duration-300 ${
                    selectedOption >= circle
                      ? "bg-blue-100 border-blue-500 animate-fadeIn"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleOptionChange(circle)}
                ></div>
                <p className="text-center text-sm mt-3">{circle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
