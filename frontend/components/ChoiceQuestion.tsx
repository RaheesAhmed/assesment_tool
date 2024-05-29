import React from "react";
import styles from "./TextQuestion.module.css";

export const ChoiceQuestion = ({
  id,
  question,
  name,
  options,
  handleChange,
  description,
}) => (
  <>
    <div className={`${styles.container} `}>
      <div className={`${styles.card} w-full  rounded-lg `}>
        <div className="mb-6">
          <label
            htmlFor={id}
            className={`${styles.label} block text-2xl font-medium mb-2`}
          >
            {question}
          </label>
          <p className={`${styles.description} text-xl mb-4`}>{description}</p>
          <select
            id={id}
            name={name}
            onChange={(e) =>
              handleChange({
                target: { name, value: e.target.value, question: description },
              })
            }
            className={`${styles.input} w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder-gray-400 text-lg`}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  </>
);
