import React, { useEffect, useState } from "react";
import axios from "axios";
import useAppStore from "../store/useAppStore";
import "../styles/challengesListPage.css";

const ChallengeListPage = () => {
    const [challenges, setChallenges] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Zustand Store for state management
    const languageFilter = useAppStore((state) => state.filters.language);
    const setLanguageFilter = useAppStore((state) => state.setLanguageFilter);
    const difficultyFilter = useAppStore((state) => state.filters.difficulty);
    const setDifficultyFilter = useAppStore((state) => state.setDifficultyFilter);
    const currentPage = useAppStore((state) => state.currentPage);
    const setCurrentPage = useAppStore((state) => state.setCurrentPage);
    const markChallengeCompleted = useAppStore((state) => state.markChallengeCompleted);
    const isChallengeCompleted = useAppStore((state) => state.isChallengeCompleted);

    // Combined Filters
    const getCombinedFilters = useAppStore((state) => state.getCombinedFilters);

    useEffect(() => {
        const fetchChallenges = async () => {
            setIsLoading(true);
            setErrorMessage("");

            const combinedFilters = getCombinedFilters();
            const url = `https://2hol1zaqsj.execute-api.us-east-1.amazonaws.com/dev/challenges?page=${currentPage}&limit=6${
                combinedFilters ? `&${combinedFilters}` : ""
            }`;

            console.log("Constructed URL:", url); // Log the generated URL for debugging

            try {
                const response = await axios.get(url);
                console.log("API Response:", response.data); // Log the raw API response

                if (response.data && Array.isArray(response.data.data)) {
                    setChallenges(response.data.data);
                } else {
                    setChallenges([]);
                    setErrorMessage("No challenges found for the selected filters.");
                }
            } catch (error) {
                console.error("API Error:", error); // Log the error for debugging
                setErrorMessage("Failed to fetch challenges. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchChallenges();
    }, [currentPage, languageFilter, difficultyFilter]);

    return (
        <div className="challenge-list-page">
            <h1>Programming Challenges</h1>

            {/* Filters */}
            <div className="filters">
                <select
                    onChange={(e) => setLanguageFilter(e.target.value)}
                    value={languageFilter}
                >
                    <option value="">All Languages</option>
                    <option value="101">TypeScript</option>
                    <option value="102">Python</option>
                    <option value="103">C</option>
                    <option value="104">Java</option>
                    <option value="105">SQL</option>
                </select>

                <select
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    value={difficultyFilter}
                >
                    <option value="">All Difficulty Levels</option>
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                </select>
            </div>

            {/* Challenge Cards */}
            <div className="challenge-cards">
                {isLoading ? (
                    <p>Loading challenges...</p>
                ) : challenges.length > 0 ? (
                    challenges.map((challenge) => (
                        <div key={challenge.id} className="challenge-card">
                            <h3>{challenge.challenge}</h3>
                            <p>{challenge.level}</p>
                            {isChallengeCompleted(challenge.id) ? (
                                <p style={{ color: "green", fontWeight: "bold" }}>Completed</p>
                            ) : (
                                <button
                                    onClick={() => {
                                        markChallengeCompleted(challenge.id, 0); // Mark challenge as completed with default time
                                        window.location.href = `/challenges/${challenge.id}/questions`;
                                    }}
                                >
                                    Get Started
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>{errorMessage || "No challenges found."}</p>
                )}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={challenges.length === 0}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ChallengeListPage;
