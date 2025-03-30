import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QuestionAttemptPopup from "./questionAttemptPopup";

const ChallengeQuestionsPage = () => {
    const { id } = useParams(); // Get challenge ID from the URL
    const [questions, setQuestions] = useState([]);
    const [challenges, setChallenges] = useState('');
    const [completedQuestions, setCompletedQuestions] = useState(() => {
        const savedState = localStorage.getItem(`completedQuestions-${id}`);
        return savedState ? JSON.parse(savedState) : [];
    });
    const [timeTaken, setTimeTaken] = useState({}); // Track time taken for each question
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Manage popup visibility
    const [selectedQuestion, setSelectedQuestion] = useState(null); // Selected question for popup

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(
                    `https://2hol1zaqsj.execute-api.us-east-1.amazonaws.com/dev/challenges?id=${id}`
                );
                setQuestions(response.data.data[0]?.questions || []);
                setChallenges(response.data.data[0]?.challenge);
                console.log(response.data, 'data in challenge questions');
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

        // Add time taken for the completed question
        setTimeTaken((prev) => ({
            ...prev,
            [questionId]: timeSpent, // Store the time spent for the specific question
        }));
    };

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
                        <p>
                            {completedQuestions.includes(question.id)
                                ? `Completed`
                                : `Start`}
                        </p>
                        <button
                            onClick={() => {
                                setSelectedQuestion(question);
                                setIsPopupOpen(true);
                            }}
                            style={{
                                padding: "8px 12px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Attempt Question
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
        </div>
    );
};

export default ChallengeQuestionsPage;
