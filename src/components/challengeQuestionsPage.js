import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import useAppStore from "../store/useAppStore";
import QuestionAttemptPopup from "./questionAttemptPopup";

const ChallengeQuestionsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const markChallengeCompleted = useAppStore((state) => state.markChallengeCompleted); // Zustand function
    const [questions, setQuestions] = useState([]);
    const [challenges, setChallenges] = useState('');
    const [completedQuestions, setCompletedQuestions] = useState(() => {
        const savedState = localStorage.getItem(`completedQuestions-${id}`);
        return savedState ? JSON.parse(savedState) : [];
    });
    const [timeTaken, setTimeTaken] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(
                    `https://2hol1zaqsj.execute-api.us-east-1.amazonaws.com/dev/challenges?id=${id}`
                );
                setQuestions(response.data.data[0]?.questions || []);
                setChallenges(response.data.data[0]?.challenge);
                console.log(response.data, "data in challenge questions");
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            }
        };

        fetchQuestions();
    }, [id]);

    const markQuestionCompleted = (questionId, timeSpent) => {
        const updatedCompletedQuestions = [...completedQuestions, questionId];
        setCompletedQuestions(updatedCompletedQuestions);
        localStorage.setItem(
            `completedQuestions-${id}`,
            JSON.stringify(updatedCompletedQuestions)
        );

        // Store the time spent for the specific question
        setTimeTaken((prev) => ({
            ...prev,
            [questionId]: timeSpent,
        }));
    };

    // When all questions are completed, mark the challenge as completed
    useEffect(() => {
        if (questions.length > 0 && completedQuestions.length === questions.length) {
            const totalTimeTaken = Object.values(timeTaken).reduce(
                (total, curr) => total + curr,
                0
            ); // Calculate total time taken for the challenge

            markChallengeCompleted(parseInt(id), totalTimeTaken); // Mark challenge as completed in Zustand
        }
    }, [completedQuestions, questions, timeTaken, id, markChallengeCompleted]);

    const progress = questions.length
        ? (completedQuestions.length / questions.length) * 100
        : 0;

    return (
        <div style={{ padding: "20px" }}>
            <h2>{challenges}</h2>
            <p>Progress: {Math.round(progress)}%</p>
            <progress value={progress} max="100"></progress>

            <div style={{ marginTop: "20px" }}>
                {questions.map((question) => (
                    <div
                        key={question.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <h3>{question.question}</h3>
                        {/* Show time taken to complete the question */}
                        {timeTaken[question.id] && (
                            <p style={{ color: "green", fontWeight: "bold" }}>
                                Time Taken: {timeTaken[question.id]} seconds
                            </p>
                        )}
                        <button
                            onClick={() => {
                                if (!completedQuestions.includes(question.id)) {
                                    setSelectedQuestion(question);
                                    setIsPopupOpen(true);
                                }
                            }}
                            style={{
                                padding: "8px 12px",
                                backgroundColor: completedQuestions.includes(question.id)
                                    ? "#28a745" // Green for "Completed"
                                    : "#007bff", // Blue for "Start"
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            {completedQuestions.includes(question.id) ? "Completed" : "Start"}
                        </button>
                    </div>
                ))}
            </div>

            {isPopupOpen && selectedQuestion && (
                <QuestionAttemptPopup
                    question={selectedQuestion}
                    closePopup={() => setIsPopupOpen(false)}
                    onComplete={markQuestionCompleted} // Pass markQuestionCompleted to Popup
                />
            )}
            {/* Button to navigate to Tracking */}
            <button
                onClick={() => navigate("/tracking")}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                View Tracking
            </button>
        </div>
    );
};

export default ChallengeQuestionsPage;
