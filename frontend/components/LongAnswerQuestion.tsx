import React from "react";
import { motion } from "framer-motion";
import styles from "./TextQuestion.module.css";

const textareaVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const LongAnswerQuestion = ({
  id,
  question,
  name,
  placeholder,
  handleChange,
  description,
}) => (
  <motion.div
    className={`${styles.container}`}
    initial="hidden"
    animate="visible"
    variants={textareaVariants}
    transition={{ duration: 0.3 }}
  >
    <div className={`${styles.card} w-full rounded-lg`}>
      <div className="mb-6">
        <label
          htmlFor={id}
          className={`${styles.label} block text-xl font-medium mb-2`}
        >
          {question}
        </label>
        <p className={`${styles.description} text-sm mb-4`}>{description}</p>
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={(e) =>
            handleChange({
              target: {
                name,
                value: e.target.value,
                question: description,
              },
            })
          }
          className={`${styles.textarea} w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder-gray-400 text-lg h-28 max-h-32`}
        />
      </div>
    </div>
  </motion.div>
);
