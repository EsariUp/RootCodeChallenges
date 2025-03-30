import React from "react";

const CompletedChallengesModal = ({ completedChallenges, closeModal }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Completed Challenges</h2>
                <ul>
                    {completedChallenges.map((challenge) => (
                        <li key={challenge.id}>
                            Challenge ID: {challenge.id} - Time Taken: {challenge.timeTaken} seconds
                        </li>
                    ))}
                </ul>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default CompletedChallengesModal;
