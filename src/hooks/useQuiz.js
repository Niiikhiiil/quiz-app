import { useState, useEffect } from "react";

const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [violations, setViolations] = useState([]);

  // FETCH ALL QUESTIONS AND OPTIONS FROM JSON FILE THAT I HAVE CREATED
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await import("../data/questions.json");
        const data = response.default || response;

        if (!data || data.length === 0) {
          throw new Error("No questions available");
        }
        setQuestions(data);
        setStatus("ready");
      } catch (err) {
        setError(err);
        setStatus("error");
      }
    };

    fetchQuestions();
  }, []);

  // AFTER CLICKING ON START EXAM BUTTON
  const startQuiz = () => {
    setAnswers({});
    setCurrentIndex(0);
    setScore(0);
    setStatus("active");
  };

  // STORING SELECTED OPTION(ANSWER) IN ANSWERS STATE
  const selectAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  // NEXT BUTTON FUNCTIONALITY
  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // PREVIOUS BUTTON FUNCTIONALITY
  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // ADD VIOLATION ON SWITING TAB OR WINDOW OR FULLSCREEN REMOVED
  const addViolation = (reason) => {
    setViolations((prev) => [...prev, reason]);
    console.warn("Exam violation:", reason);
  };

  // SUBMIT EXAM BUTTON FUNCTIONALITY
  const submitQuiz = () => {
    let calculatedScore = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setStatus("finished");
  };

  return {
    questions,
    answers,
    currentIndex,
    status,
    error,
    score,
    startQuiz,
    selectAnswer,
    goNext,
    goPrev,
    submitQuiz,
    violations,
    addViolation,
  };
};

export default useQuiz;
