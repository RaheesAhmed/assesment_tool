"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RenderQuestions = ({ classification }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userResponses, setUserResponses] = useState({});

    // Function to fetch questions based on classification
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/assessment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ classification })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }
                const data = await response.json();
                setQuestions(data.questions);  // Assuming the API returns an array of questions
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        if (classification) {
            fetchQuestions();
        }
    }, [classification]);

    // Handlers for question navigation
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Possibly handle the end of the questionnaire
            console.log('End of questions');
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Handling response changes
    const handleResponseChange = (id, value) => {
        setUserResponses(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const currentQuestion = questions[currentQuestionIndex] || {};

    return (
        <div>
            {currentQuestion && (
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: "-100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>{currentQuestion.question}</h2>
                    <p>{currentQuestion.description}</p>
                    {/* Add your input component here based on the question type */}
                    <input
                        type="text"
                        value={userResponses[currentQuestion.id] || ''}
                        onChange={(e) => handleResponseChange(currentQuestion.id, e.target.value)}
                    />
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </motion.div>
            )}
        </div>
    );
};

export default RenderQuestions;
