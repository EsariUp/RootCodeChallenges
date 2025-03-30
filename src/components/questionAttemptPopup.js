import React, { useEffect, useState } from "react";

const QuestionAttemptPopup = ({ question, closePopup, onComplete }) => {
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [timeSpent, setTimeSpent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setTimeSpent((prev) => prev + 1), 1000); // Increment timer every second
        return () => clearInterval(timer); // Clear timer when popup closes
    }, []);

    const handleSubmit = () => {
        onComplete(question.id, timeSpent); // Mark question completed
        alert(`Question completed! Time spent: ${timeSpent} seconds`);
        closePopup(); // Close the popup
    };

    return (
        <div style={popupStyles.overlay}>
            <div style={popupStyles.container}>
                <h2>{question.question}</h2>
                {question.options.map((option, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={`option-${index}`}
                            name="answer"
                            value={option}
                            onChange={(e) => setSelectedAnswer(e.target.value)}
                        />
                        <label htmlFor={`option-${index}`}>{option}</label>
                    </div>
                ))}
                <p>Time Spent: {timeSpent} seconds</p>
                <button
                    onClick={handleSubmit}
                    disabled={!selectedAnswer} // Only enable if an answer is selected
                    style={{
                        padding: "10px",
                        backgroundColor: selectedAnswer ? "#007bff" : "#ddd",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: selectedAnswer ? "pointer" : "not-allowed",
                    }}
                >
                    Submit
                </button>
                <button
                    onClick={closePopup}
                    style={{
                        marginLeft: "10px",
                        padding: "10px",
                        backgroundColor: "#ccc",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

// Simple inline styles for the popup
const popupStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "400px",
        textAlign: "center",
    },
};

export default QuestionAttemptPopup;
