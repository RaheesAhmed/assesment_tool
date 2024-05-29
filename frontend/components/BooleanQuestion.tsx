import React from "react";
import styles from "./TextQuestion.module.css";

export const BooleanQuestion = ({
  id,
  question,
  name,
  handleChange,
  description,
}) => (
  <div className={`${styles.container} `}>
    <div className={`${styles.card} w-full rounded-lg`}>
      <div className="mb-6">
        <label
          htmlFor={id}
          className={`${styles.label} block text-2xl font-medium mb-2`}
        >
          {question}
        </label>
        <p className={`${styles.description} text-xl mb-4`}>{description}</p>
        <div className="flex items-center">
          <label className="mr-2 cursor-pointer">
            <input
              type="radio"
              id={`${id}-yes`}
              name={name}
              value="true"
              onChange={() => handleChange({ target: { name, value: true } })}
              className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <span className="ml-1">Yes</span>
          </label>
          <label className="ml-6 mr-2 cursor-pointer">
            <input
              type="radio"
              id={`${id}-no`}
              name={name}
              value="false"
              onChange={() =>
                handleChange({
                  target: { name, value: false, question: description },
                })
              }
              className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <span className="ml-1">No</span>
          </label>
        </div>
      </div>
    </div>
  </div>
);
