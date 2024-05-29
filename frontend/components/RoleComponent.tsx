import React from "react";
import styles from "./TextQuestion.module.css";

export const RoleComponent = ({ id, description, question }) => (
  <div className={`${styles.container} `}>
    <div className={`${styles.card} w-full rounded-lg `}>
      <div className="mb-6">
        <label
          htmlFor={id}
          className={`${styles.label} block text-xl font-medium mb-2 font-sans`}
        >
          {question}
        </label>
        <p className={`${styles.description} text-md mb-4 font-sans`}>
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default RoleComponent;
