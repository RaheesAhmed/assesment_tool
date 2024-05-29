"use clinet";
import React from "react";
import styles from "./TextQuestion.module.css";

export const IntegerQuestion = ({
  id,
  question,
  name,
  placeholder,
  handleChange,
  description,
}) => (
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
        <input
          type="number"
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={(e) =>
            handleChange({
              target: {
                name,
                value: parseInt(e.target.value),
                question: description,
              },
            })
          }
          className={`w-full px-4 py-3 border-b rounded-lg focus:outline-none focus:border-b-2 focus:border-b-[#0545AF] placeholder-gray-400 text-lg font-sans mb-7`}
        />
      </div>
    </div>
  </div>
);
