import React from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../store/useAppStore";

const TrackingPage = () => {
    const completedChallenges = useAppStore((state) => state.completedChallenges); // Fetch completed challenges from Zustand
    const navigate = useNavigate();
    console.log(completedChallenges, 'completedChallenges')

    return (
        <div style={{ padding: "20px" }}>
            <h1>Tracking Your Challenges</h1>


            {completedChallenges.length > 0 ? (
                <div>
                    <h2>Completed Challenges</h2>
                    <ul>
                        {completedChallenges.map((challenge) => (
                            <li key={challenge.id}>
                                <strong> Time Taken:</strong> {challenge.timeTaken} s
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No challenges completed yet.</p>
            )}

            <button
                onClick={() => navigate("/challenges")}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Back to Challenges
            </button>
        </div>
    );
};

export default TrackingPage;
