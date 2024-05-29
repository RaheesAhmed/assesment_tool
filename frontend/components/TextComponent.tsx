import React from "react";
import styles from "./TextQuestion.module.css";

export const TextComponent = ({ id, description }) => (
  <div className={`${styles.container} `}>
    <div className={`${styles.card} w-full rounded-lg `}>
      <div className="mb-6">
        <label
          htmlFor={id}
          className={`${styles.label} block text-xl font-medium mb-2 font-sans`}
        >
          Welcome to the <b> Strategic Mastery of Management Assessment</b>
        </label>
        <p className={`${styles.description} text-md mb-4 font-sans`}>
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default TextComponent;
