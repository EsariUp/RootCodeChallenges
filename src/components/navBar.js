import React, { useState } from "react";
import useAppStore from "../store/useAppStore";
import CompletedChallengesModal from "./CompletedChallengesModal";

const Navbar = () => {
    const completedChallenges = useAppStore((state) => state.completedChallenges);
    const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility

    return (
        <nav style={{ padding: "10px", backgroundColor: "#007bff", color: "white" }}>
            <h1>Rootcode Challenges</h1>
            <p
                style={{ float: "right", cursor: "pointer" }}
                onClick={() => setIsModalOpen(true)}
            >
                Completed Challenges: <strong>{completedChallenges.length}</strong>
            </p>
            {isModalOpen && (
                <CompletedChallengesModal
                    completedChallenges={completedChallenges}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;
