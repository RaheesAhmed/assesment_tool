"use client";

import React, { useState } from "react";
import { BooleanQuestion } from "@/components/BooleanQuestion";
import { ChoiceQuestion } from "@/components/ChoiceQuestion";
import { IntegerQuestion } from "@/components/IntegerQuestion";
import { LongAnswerQuestion } from "@/components/LongAnswerQuestion";
import { TextQuestion } from "@/components/TextQuestion";

import { motion } from "framer-motion";
import TextComponent from "@/components/TextComponent";
import { ThresHoldQuestion } from "@/components/ThresholdQuestion";
import axios from "axios";
import { ChoiceComponent } from "@/components/ChoiceComponent";
import RoleComponent from "@/components/RoleComponent";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const GeneratePlan = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    budgetDetails: "Operations department budget",
  });

  const [finalPayload, setPayload] = useState([]);
  const [classification, setClassification] = useState("");
  const [errors, setErrors] = useState({});
  const [finalData, setFinalData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState([
    {
      component: TextComponent,
      props: {
        question: "What is your Name?",
        id: "welcome",
        placeholder: "Enter your name",
        description:
          "You're at the beginning of a journey of self-discovery and empowerment that will help you take your career to the next level. This is more than an assessment; it's a gateway to strategically unlocking your management and leadership excellence (hello!?! it's in the name). ",
      },
      image: "https://images.typeform.com/images/S26kHmu9FLs4/background/large",
    },
    {
      component: TextQuestion,
      props: {
        question: "What is your Name?",
        id: "name",
        placeholder: "Enter your name",
        description: "Please enter what name you’d like to use in your report.",
        name: "name",
      },
      image: "https://images.typeform.com/images/S26kHmu9FLs4/background/large",
    },
    {
      component: TextQuestion,
      props: {
        question: "What is your Email?",
        id: "email",
        placeholder: "Enter your email",
        description: "Please enter your email address.",
        name: "email",
      },
      image: "https://images.typeform.com/images/S26kHmu9FLs4/background/large",
    },
    {
      component: TextQuestion,
      props: {
        question: "What industry is your business in?",
        id: "industry",
        placeholder: "Enter your industry, for example Healthcare",
        description:
          "Please specify the industry your organization operates within. Example: Healthcare, Technology.",
        name: "industry",
      },
      image: "https://images.typeform.com/images/S26kHmu9FLs4/background/large",
    },
    {
      component: IntegerQuestion,
      props: {
        question: "How many people work at your company?",
        id: "companySize",
        placeholder: "Enter the number of employees",
        description:
          "Please enter the total number of employees in your entire organization. Example: If your company has about 500 employees, just enter '500'.",
        name: "companySize",
      },
      image:
        "https://images.typeform.com/images/vXAbrveiQEt9/image/default-firstframe.png",
    },
    {
      component: TextQuestion,
      props: {
        question:
          "What department or division do you primarily work in within your organization?",
        id: "department",
        placeholder: "Enter your department",
        description:
          "Please specify your primary department or division. For those with broader responsibilities, such as overseeing multiple areas or the entire organization, indicate the most encompassing area. Example: 'Finance', 'Western Region Operations', or 'Company-wide' for broad leadership roles.",
        name: "department",
      },
      image:
        "https://images.typeform.com/images/vXAbrveiQEt9/image/default-firstframe.png",
    },
    {
      component: TextQuestion,
      props: {
        question: "What is your job title?",
        id: "jobTitle",
        placeholder: "Enter your job title",
        description:
          "Please enter the exact job title as used in your workplace.",
        name: "jobTitle",
      },
      image:
        "https://images.typeform.com/images/vXAbrveiQEt9/image/default-firstframe.png",
    },
    {
      component: IntegerQuestion,
      props: {
        question: "How many people report directly to you?",
        id: "directReports",
        placeholder: "Enter the number of direct reports",
        description:
          "Please enter the total number of employees who report directly to you. If none, enter '0'.",
        name: "directReports",
      },
      image:
        "https://images.typeform.com/images/vXAbrveiQEt9/image/default-firstframe.png",
    },
    {
      component: TextQuestion,
      props: {
        question:
          "What types of roles report directly to you? Please list them.",
        id: "rolesReportingToYou",
        placeholder: "Enter the roles",
        description:
          "Example: Manager of Engineering, Sales Coordinator. If none, please state 'None'.",
        name: "rolesReportingToYou",
      },
      image:
        "https://images.typeform.com/images/vXAbrveiQEt9/image/default-firstframe.png",
    },
    {
      component: ChoiceQuestion,
      props: {
        question: "What is your decision-making level?",
        id: "decisionLevel",
        options: ["Operational", "Tactical", "Strategic"],
        description:
          "Please select the level that best describes your decision-making authority.",
        name: "decisionLevel",
      },
      image:
        "https://images.typeform.com/images/vXAbrveiQEt9/image/default-firstframe.png",
    },
    {
      component: LongAnswerQuestion,
      props: {
        question: "Describe a typical project or task you are responsible for.",
        id: "typicalProject",
        placeholder: "Enter the description",
        description:
          "Please include details about what the task involves, any teams or departments you interact with, and its impact on your organization. Example: 'I develop IT security policies that align with company-wide risk management strategies and coordinate with the legal and tech departments to implement them.'",
        name: "typicalProject",
      },
      image:
        "https://images.typeform.com/images/vXAbrveiQEt9/image/default-firstframe.png",
    },
    {
      component: IntegerQuestion,
      props: {
        question:
          "How many levels are there between you and the highest-ranking executive in your organization?",
        id: "levelsToCEO",
        placeholder: "Enter the number of levels",
        description:
          "Please count the layers of management from you to the CEO or equivalent. Example: If you report to a Manager, who reports to a VP, who reports to the CEO, you would enter '3'.",
        name: "levelsToCEO",
      },
      image:
        "https://images.typeform.com/images/vXAbrveiQEt9/image/default-firstframe.png",
    },
    {
      component: BooleanQuestion,
      props: {
        question:
          "Does your role require you to manage a budget? If so, is it for your department or across multiple departments?",
        id: "managesBudget",
        description:
          "Yes/No. If Yes, please specify whether it is for your department only or if it spans multiple departments.",
        name: "managesBudget",
      },
      image:
        "https://images.typeform.com/images/vXAbrveiQEt9/image/default-firstframe.png",
    },
    {
      component: ThresHoldQuestion,
      props: {
        question: `Thank you, ${answers?.name || "name"}`,
        id: "thankYou",
        description:
          "So, everyone approaches these assessments differently...This question is required.*how do you want to start? Do you just want to jump into the assessment, or do you want to know a little more about the assessment?",
        name: "threshold",
        userName: answers?.name,
      },
      image: "https://images.typeform.com/images/S26kHmu9FLs4/background/large",
    },
  ]);

  const ProgressBar = ({ currentStep, totalSteps }) => {
    const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

    return (
      <div className="bg-gray-200 h-2 rounded-lg overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    );
  };

  const handleChange = (event) => {
    const { name, value, question } = event.target;
    setAnswers((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPayload((prev) => ({
      ...prev,
      [name]: {
        question: question,
        answer: value,
      },
    }));
  };

  const validateStep = () => {
    if (currentStep === 0 || currentStep === questions.length - 1) {
      return true;
    }
    const currentQuestion = questions[currentStep];
    const currentValue = answers[currentQuestion.props.id];

    if (!currentValue) {
      setErrors({ [currentQuestion.props.id]: "This field is required." });
      return false;
    }

    setErrors({});
    return true;
  };

  const submitAnswers = async () => {
    setLoading(true);
    try {
      if (currentQuestion?.image) {
        let payload = { ...answers };
        delete payload?.threshold;
        delete payload?.email;
        const response = await axios.post(
          "http://127.0.0.1:5000/api/assessment",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let { data } = response;
        setClassification(data.classification);
        let descriptionn = data.questions[" Description"];
        let dataCopy = { ...data };

        delete data.questions["Lvl"];
        delete data.questions[" Description"];

        const newQuestions = Object.entries(data.questions).map(
          ([key, value]) => {
            if (key === " Role Name") {
              return {
                component: RoleComponent,
                props: {
                  question: `Role Name : ${value}`,
                  id: key.replace(/\s+/g, "").toLowerCase(),
                  placeholder: `Enter your ${key}`,
                  description: descriptionn,
                  name: key.replace(/\s+/g, "").toLowerCase(),
                },
                image:
                  "https://images.typeform.com/images/S26kHmu9FLs4/background/large",
              };
            }

            const match = value.match(/(.*?\?)(.*?\.)\s*(.*)/s);
            const description = match ? match[1].trim() : value;
            const choiceText = match ? match[2].trim() : "Rate from 1 to 5";
            const description2 = match ? match[3].trim() : "";
            setLoading(false);

            return {
              component: ChoiceComponent,
              props: {
                question: key,
                id: key.replace(/\s+/g, "").toLowerCase(),
                placeholder: choiceText,
                description: description,
                description2: description2,
                choiceText: choiceText,
                name: key.replace(/\s+/g, "").toLowerCase(),
              },
            };
          }
        );

        setQuestions(newQuestions);
        setCurrentStep(0);
      } else {
        const response = await axios.post(
          "http://127.0.0.1:5000/api/generate",
          finalPayload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let { data } = response;
        setFinalData(data.assesment);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      setLoading(false);
    }
  };

  const handleNext = (event) => {
    event.preventDefault();
    if (validateStep()) {
      const nextStep = currentStep + 1;
      if (nextStep < questions.length) {
        setCurrentStep(nextStep);
      } else {
        submitAnswers();
      }
    }
  };

  const currentQuestion = questions[currentStep];

  // Function to split the assessment into sections and format them for display
const splitAssessment = (assessment) => {
  const sections = JSON.parse(assessment).developmentPlan;
  return Object.entries(sections).map(([key, value], index) => (
    <div key={index} className="p-4 bg-gray-100 rounded-md shadow-sm mb-4" id="pdfContent">
      <h3 className="text-xl font-semibold mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
      {value.actionPlan.map((plan, idx) => (
        <div key={idx} className="mb-4">
          <h4 className="text-lg font-semibold">{plan.action}</h4>
          <p>{plan.description}</p>
          <ul className="list-disc pl-5">
            {plan.resources.map((resource, resIdx) => (
              <li key={resIdx}>{resource}</li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <h4 className="text-lg font-semibold">Metrics:</h4>
        <ul className="list-disc pl-5">
          {value.metrics.map((metric, metIdx) => (
            <li key={metIdx}>{metric}</li>
          ))}
        </ul>
      </div>
    </div>
  ));
};
const downloadPdfDocument = () => {
  const input = document.getElementById('pdfContent'); // Ensure you have a reference to the div
  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
      });
      const imgProps= pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("development_plan.pdf");
    });
};

  return (
    <div className="border-2 border-black flex-1">
      <div className="w-full p-8 text-white font-sans h-4 bg-[#E8E8E8] border-2 font-sans text-black">
        To kick things off, let's get some of your details
      </div>
      <ProgressBar currentStep={currentStep} totalSteps={questions.length} />

      {finalData ? (
        <div className="p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Personalized Development Plan</h2>
        <div className="space-y-4" >{splitAssessment(finalData)}</div>
        <button onClick={downloadPdfDocument} className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">
            Download PDF
          </button>
      </div>
      ) : (
        <div className="flex flex-col md:flex-row bg-white">
          <div className="w-full bg-white overflow-hidden self-center flex-1">
            <div className="p-8 mb-5">
              <form onSubmit={handleNext}>
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: "-100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  transition={{ duration: 0.5 }}
                >
                  <currentQuestion.component
                    {...currentQuestion.props}
                    value={answers[currentQuestion.props.id] || ""}
                    handleChange={handleChange}
                  />
                  {errors[currentQuestion.props.id] && (
                    <div className="text-red-500 mt-[-30px]">
                      {errors[currentQuestion.props.id]}
                    </div>
                  )}
                </motion.div>

                <div className="mt-4 flex justify-between items-center">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors flex items-center"
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-6 w-6 text-white" // Adjust the size as needed
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : currentQuestion.props.id === "welcome" ? (
                      "Continue"
                    ) : currentStep === questions.length - 1 ? (
                      "Submit"
                    ) : (
                      "Next"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="py-4 px-10 flex justify-end md:w-1/2 flex-1 h-full">
            {!currentQuestion?.image ? (
              <div className="bg-[#f3f3f3] p-8 rounded-md self-center mt-7 ">
                <p className={` text-xl mb-4`}>
                  {currentQuestion?.props.description2}
                </p>
              </div>
            ) : (
              <img
                src={currentQuestion?.image}
                alt="Business Plan"
                className="hidden md:block object-fill min-w-[500px] min-h-[400px] max-w-full h-[47vh]"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratePlan;
